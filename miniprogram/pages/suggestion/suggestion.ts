

// pages/suggestion/suggestion.ts
export{}
 const app=getApp()
Page({
    /**
     * 页面的初始数据
     */
    timer:0,
    data: {
      status:true,
      navHeight:0,
      menuBot:0,
      list:[{from_id:'',to_id:'',noread:false}],
      accept:[],
      send:[],
      windowheight:0,
      screenheight:0,
      tabbarheight:0,
      getshorter:"",
      getlonger:"",
      data:"消息",
      isload:false,
      my_id:0
    }, 
    reply(event:any){
     
        wx.request({
            method:'POST',
                url:app.globalData.url+'api/change',
                data:{
                   id:event.target.dataset.index,
                   to_id:wx.getStorageSync('userinfo').studentid
                },
                header:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                success:()=>{
                }
            })
    },
    getlist(){
      /* 获取发送的匿名消息 */
     wx.request({
        method:'POST',
        url:app.globalData.url+'api/suggestion',
        data:{
          openid:wx.getStorageSync('userinfo').studentid
        },header:{
            'content-type':'application/x-www-form-urlencoded'
        },
        success:(res:any)=>{
           
            
            if(res.data.status==202)
            {
                wx.showToast({
                    title:'获取失败',
                    icon:'error'
                })
            }
            if(res.data.status==200)
            {   
               
         
                if(res.data.data.length>0)
                {   
                
                    res.data.data.forEach((item:any)=>{ 
                        wx.request({
                          method:'POST',
                          url:app.globalData.url+'api/getnomessage',
                          data:{
                             com_id:item.id, 
                           id:wx.getStorageSync('userinfo').studentid
                          },header:{
                              'content-type':'application/x-www-form-urlencoded'
                          },
                          success:(res:any)=>{
                              
                          if(res.data.status==200)
                          {
                              item.noread=true  
                          } 
                          else{
                              item.noread=false
                          }
                          
                          }
                        })
                    })
                    this.setData({
                        send:res.data.data
                    })

                   
                    
                    
                }
              
            
            
            }
        },
        fail:()=>{
            wx.showToast({
                title:'获取失败',
                icon:'error'
            })
        },
       complete:()=>{
           this.setData({
               isload:false
           })
       }
     })
     /* 获取接受的消息 */
     wx.request({
        method:'POST',
        url:app.globalData.url+'api/accept_suggestion',
        data:{
          openid:wx.getStorageSync('userinfo').studentid
        },header:{
            'content-type':'application/x-www-form-urlencoded'
        },
        success:(res:any)=>{
           
            
            if(res.data.status==202)
            {
                wx.showToast({
                    title:'获取失败',
                    icon:'error'
                })
            }
            if(res.data.status==200)
            {   
                
                if(res.data.data.length>0)
                {
                    res.data.data.forEach((item:any)=>{
                       
                        wx.request({
                          method:'POST',
                          url:app.globalData.url+'api/getnomessage',
                          data:{
                            com_id:item.id, 
                           id:wx.getStorageSync('userinfo').studentid
                          },header:{
                              'content-type':'application/x-www-form-urlencoded'
                          },
                          success:(res:any)=>{
                          if(res.data.status==200)
                          {
                              item.noread=true
                          } 
                          else{
                            item.noread=false
                        }
                          }
                        })
                    })
                    
                }
                this.setData({
                    accept:res.data.data
                })
                
            }
        },
        fail:()=>{
            wx.showToast({
                title:'获取失败',
                icon:'error'
            })
        },
       complete:()=>{
           this.setData({
               isload:false
           })
       }
     })
    },   
    select(event:any){
        wx.showModal({
            title:'确定拉黑该用户吗？',
            success:(res:any)=>{
                if(res.confirm){
                    var to_id=wx.getStorageSync('userinfo').studentid
                if(to_id==this.data.list[event.currentTarget.dataset.index].from_id)
                {
                  to_id=this.data.list[event.currentTarget.dataset.index].to_id
                }
                else{
                    to_id=this.data.list[event.currentTarget.dataset.index].from_id
                }
                wx.request({
                    url:app.globalData.url+'api/reject',
                method:'POST',
                data:{
                    from_id:wx.getStorageSync('userinfo').studentid,
                    to_id:to_id
                },
                header:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                success:(res:any)=>{
                  if(res.data.status==200){
                      wx.showToast({
                          title:'拉黑成功',
                          icon:'success'
                      })
                  }
                  else{
                    wx.showToast({
                        title:'拉黑失败',
                        icon:'error'
                    })
                  }
                }
                })
                }
                
            }
        })
    },
    new(){
        this.setData({
            isload:true
        })
        this.getlist()
        var time=setTimeout(()=>{if(this.data.data=='消息')
        {
           this.setData({list:this.data.send
           })
        }
        else{
           this.setData({list:this.data.accept
           })
        }
        clearTimeout(time)
    },300)
    },
    messaged(){
      if(this.data.getshorter==""||this.data.getshorter=="back 0.5s linear forwards"){
        this.setData({
            getshorter:"tap 0.5s linear forwards",
            getlonger:"back 0.5s linear forwards",
            data:"接收",
            list:this.data.accept
            
        })
      }
      else{
        this.setData({
            getshorter:"back 0.5s linear forwards",
            getlonger:"tap 0.5s linear forwards",
            data:"消息",
            list:this.data.send
        })
      }
    },
    accepted(){
        if(this.data.getshorter=="tap 0.5s linear forwards"){
            this.setData({
                getshorter:"back 0.5s linear forwards",
                getlonger:"tap 0.5s linear forwards",
                data:"消息",
                list:this.data.send
            })
          }
          else{
            this.setData({
                
                getshorter:"tap 0.5s linear forwards",
                getlonger:"back 0.5s linear forwards",
                data:"接收",
                list:this.data.accept
            })
          }
    },
   
      
      
    /* 生命周期函数--监听页面加载
     */
    onLoad() {
      this.setData({
        navHeight:app.globalData.menuHeight,
        menuBot:app.globalData.menuBot,
        windowheight:app.globalData.windowheight,
        screenheight:app.globalData.screenheight,
        tabbarheight:app.globalData.tabbarheight,
      
    })
    this.getlist()
    var time=setTimeout(()=>{this.setData({list:this.data.send
    })
    clearTimeout(time)
},300)
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
     this.getlist()
     this.setData({
         my_id:wx.getStorageSync('userinfo').studentid
     })
     this.timer=setInterval(()=>{
         if(this.data.data=='消息')
         {
            this.setData({list:this.data.send
            })
         }
         else{
            this.setData({list:this.data.accept
            })
         }
     this.getlist()
     
    
 },1000)

 
     
      
      
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
      clearInterval(this.timer);
     
      
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
 
       
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