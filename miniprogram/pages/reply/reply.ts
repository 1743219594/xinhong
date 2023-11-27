// pages/reply/reply.ts
export{}
 const app=getApp()
Page({
  
    /**
     * 页面的初始数据
     */
    data: {
         content:'',
         time:'',
         id:'',
         from_id:'',
         to_id:'',
         bottom:'0',
         left:0,
         reply_content:"",
         list:[{from_id:'',isuser:''}],
         first_from:'',
         ws:{},
         windowheight:0,
         navHeight:0,
         menuBot:0,
    },
  
    inputClick(event:any){
        this.setData({
            reply_content:event.detail.value
        })
    },
    
    to_reply(){
        if(this.data.reply_content=='')
        {
            wx.showToast({
                title:'消息不能为空',
                icon:'error'
            })
        }
        else{
            var to_id=wx.getStorageSync('userinfo').studentid
            if(to_id==this.data.from_id)
            {
                to_id=this.data.to_id
            }
            else{
                to_id=this.data.from_id
            }
            wx.request({
                method:'POST',
                    url:app.globalData.url+'api/check',
                    data:{
                       from_id:wx.getStorageSync('userinfo').studentid,
                       to_id:to_id
                    },
                    header:{
                        'content-type':'application/x-www-form-urlencoded'
                    },
                    success:(res:any)=>{
                      if(res.data.status==200)
                      {
                        wx.showModal({
                            title:'你已被拉黑',
                            showCancel:false
                        })
                      }
                      else{
                     
                                var time=new Date()
            var nowtime=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+' '+(time.getHours()<10?('0'+time.getHours()):time.getHours())+':'+(time.getMinutes()<10?('0'+time.getMinutes()):time.getMinutes())
            var forid=this.data.from_id;
            if(forid==wx.getStorageSync('userinfo').studentid)
            {
                forid=this.data.to_id
            }
            wx.request({
                method:'POST',
                url:app.globalData.url+'api/add_replymessage',
                data:{
                    id:this.data.id,
                    content:this.data.reply_content,
                    from_id:wx.getStorageSync('userinfo').studentid,
                    to_id:forid,
                    time:nowtime
                },
                header:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                success:(res)=>{
                  
                    const messageObject = {
                        content: this.data.reply_content,
                         id:this.data.id
                       }; 
                  wx.sendSocketMessage({
                      data:JSON.stringify(messageObject)
                  })
                    this.setData({
                        reply_content:'',
                        bottom:'0'
                    })
                    
                }
            })
                             
                      }
                      
                    }
                  
              })
            
        }
    },
 
    getdatalist(){
        wx.showLoading({
            title:'加载中',
            mask:true
        })
        wx.request({
            method:'POST',
            url:app.globalData.url+'api/get_replymessage',
            header:{
                'content-type':'application/x-www-form-urlencoded'
            },
            data:{
                id:this.data.id
            },
            success:(res:any)=>{
             
                
             this.setData({
                 list:res.data.data
             })
            
          var user=wx.getStorageSync('userinfo').studentid
          if(this.data.list!=undefined)
          { wx.request({
            method:'POST',
                url:app.globalData.url+'api/change',
                data:{
                   id:this.data.id,
                   to_id:wx.getStorageSync('userinfo').studentid
                },
                header:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                success:()=>{

                }
              
          })
              var length=this.data.list.length
            for(var i=0;i<length;i++)
            {
              if (this.data.list[i].from_id == user) {
                
                this.setData({
                    ['list[' + i + '].isuser']: 'right'
                  });
                 
                } else {
                  this.setData({
                    ['list[' + i + '].isuser']: 'left'
                  });
                }
            }
      
          }
          
          
          
        },
        complete:()=>{
            wx.hideLoading()
        }
  })
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(e) {
       
         this.setData({
             content:e.content,
             time:e.time,
             id:e.id,
             from_id:e.from_id,
             to_id:e.to_id,
             windowheight:app.globalData.windowheight,
             navHeight:app.globalData.menuHeight,
             menuBot:app.globalData.menuBot,
         })
         var time=setTimeout(()=>{if(this.data.from_id==wx.getStorageSync('userinfo').studentid)
         {  
             this.setData({
                 first_from:'right',
            
             })
         }
         else{
       
            this.setData({
                first_from:'left',
            })
         }
        clearTimeout(time)},50)
        this.getdatalist()
         let timer=setInterval(()=>{
         
            wx.createSelectorQuery().select('.content').boundingClientRect(rect => {
              const pageHeight = rect.height;
              
                // 设置滚动位置
              wx.pageScrollTo({
                scrollTop: pageHeight,
                duration: 300,
              });
              
            }).exec();
          clearInterval(timer)
         },200)
      },
     
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
      
         
            
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
      
     
      
        this.data.ws=wx.connectSocket({
            url:'wss://www.xhmental.cn:443?id='+this.data.id,
            header: {
                'content-type': 'application/json'
              },
            
            
        })
        
        
        wx.onSocketMessage((res)=>{
            this.getdatalist()
       
            let timer=setInterval(()=>{
         
              wx.createSelectorQuery().select('.content').boundingClientRect(rect => {
                const pageHeight = rect.height;
                
                  // 设置滚动位置
                wx.pageScrollTo({
                  scrollTop: pageHeight,
                  duration: 300,
                });
                
              }).exec();
            clearInterval(timer)
           },200)
           
          
           
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
    
       
      
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
      wx.closeSocket({
        fail:()=>{
        }
    })
        
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
       this.getdatalist()
       wx.stopPullDownRefresh()
       
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})