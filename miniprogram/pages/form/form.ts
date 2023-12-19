export{}
 const app=getApp()
// pages/form/form.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        filelist:[
            {
            url:''
            }
        ],
        contentlist:[
            {
            url:''
            }
        ],
        cover:'',
        content:'',
        title:'',
        show:'eeee'
    },
    inputs:function(event:any){
        this.setData({
            title:event.detail.value
        })
    },
    input_cover(event:any){
        this.setData({
            cover:event.detail.value
        })
    },
    input_content(event:any){
        this.setData({
            content:event.detail.value
        })
    },
    /* 读取用户想要上传的图片信息并将其存在filelist数组中 */
    afterRead(event:any){
        const file=event.detail.file;
        
        
        this.setData({
            filelist:[...this.data.filelist,{url:file.url}]
        
     });
        
      
     },
     afterReaded(event:any){
         
        const file=event.detail.file;
      
        this.setData({
            contentlist:[...this.data.contentlist,{url:file.url}]
        
     });
        
      
     },
     /* 将用户输入的字存在content中 */
    inputed:function(event:any){
        this.setData({
            content:event.detail.value
        })
    },
 
     /* 发帖子功能 */
     send(){
         if(this.data.filelist.length==0||this.data.contentlist.length==0||this.data.title=='')
         {
            return wx.showModal({
                content:'请输入完整',
                showCancel:false
             })
         }
         else{
            var time=new Date()
            var nowtime=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+' '+(time.getHours()<10?('0'+time.getHours()):time.getHours())+':'+(time.getMinutes()<10?('0'+time.getMinutes()):time.getMinutes())
            wx.uploadFile({
                url:app.globalData.url+'api/contentphoto',
                name:'avator',
                filePath:this.data.contentlist[0].url,
                success:()=>{
                    wx.uploadFile({
                        url:app.globalData.url+'api/upload_tweet',
                        name:'avator',
                        filePath:this.data.filelist[0].url,
                        formData:{
                           
                            title:this.data.title,
                            time:nowtime
                        },
                        success:(res:any)=>{
                            if(res.data.status==200)
                            {
                                wx.showToast({
                                    icon:"success",
                                    title:'发布失败'
                                })
                            }
                            else{
                                wx.showToast({
                                    icon:"success",
                                    title:'发布成功'
                                })
                                this.setData({
                                    filelist:[],
                                    title:'',
                                    contentlist:[]
                                })
                               
                            }
                        }
                     })
                }
            })
            
            
           
             
         }
     },
     /* 用户若不想上传图片可将其删除 */
    delete(event:any){
        var index=event.detail.index-1
        if(index<0)
        {this.data.filelist.shift()
            this.setData({
                filelist: this.data.filelist
            })
            return
            
        }  
        this.data.filelist.splice(index,1)
       this.setData({
           filelist:this.data.filelist
       })
    
       
    },
    deleted(event:any){
        var index=event.detail.index-1
        if(index<0)
        {this.data.contentlist.shift()
            this.setData({
                contentlist: this.data.contentlist
            })
            return
            
        }  
        this.data.contentlist.splice(index,1)
       this.setData({
        contentlist:this.data.contentlist
       })
    
       
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
      var timer='2023-12-18 15:30:00';
      var time=new Date()
      var nowtime=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+(time.getDate()<10?('0'+time.getDate()):time.getDate())+' '+(time.getHours()<10?('0'+time.getHours()):time.getHours())+':'+(time.getMinutes()<10?('0'+time.getMinutes()):time.getMinutes())+":"+(time.getSeconds()<10?('0'+time.getSeconds()):time.getSeconds())
      if(nowtime<timer)
      {
        this.setData({
          show:'eeee'
        })
      }
      else{
        this.setData({
          show:'dddd'
        })
      }
        this.setData({
            filelist:[],
            contentlist:[]
        })
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