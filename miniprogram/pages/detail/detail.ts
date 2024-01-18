import { RED } from "../../miniprogram_npm/@vant/weapp/common/color"
import { requestAnimationFrame } from "../../miniprogram_npm/@vant/weapp/common/utils"

// pages/detail/detail.ts
export{}
 const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
       title:'',
       time:'',
       content:'',
       readnum:0,
       likenum:0,
       bottom:'0',
         left:0,
         y:'0',
         iscomment:false,
        isselected:'#6AC41B',
        id:'',
        comment_content:'',
        comment_list:[],
        starttime:0,
        endtime:0,
       isshow:false,
       studentid:0,
       iscollect:'#6AC41B',
       show:'dddd'
    },
    imageerror(){
      wx.showToast({
        title:'图片加载失败',
        icon:'error'
        
      })
    },
    collect(){
        
        
        if(wx.getStorageSync('userinfo'))
        {
            if(this.data.iscollect=='#6AC41B'){
              
              wx.request({
                method:'POST',
                url:app.globalData.url+'api/collect',
                data:{
                    id:wx.getStorageSync('userinfo').studentid,
                    tweet_id:this.data.id
                },
                header:{
                  'content-type':'application/x-www-form-urlencoded'
              },
              success:(res:any)=>{
                 
                  
                 if(res.data.status==202)
                 {
                    wx.showToast({
                        title:'收藏成功',
                        icon:'success'
                    })
                    this.setData({
                        iscollect:'red'
                    })
                 }
                  
              },
              fail:(err:any)=>
              {
                  wx.showToast({
                      title:'出现错误',
                      icon:'error'
                  })
              }
              })
            }
            else{
                this.setData({
                    iscollect:'#6AC41B'
                })      
                wx.request({
                    method:'POST',
                    url:app.globalData.url+'api/cancel_collection',
                    data:{
                        id:wx.getStorageSync('userinfo').studentid,
                        tweet_id:this.data.id
                    },
                    header:{
                      'content-type':'application/x-www-form-urlencoded'
                  },
                  success:(res:any)=>{
                      
                      
                     if(res.data.status==200)
                     {
                        this.setData({
                            iscollect:'#6AC41B'
                        })
                        wx.showToast({
                            title:'取消收藏',
                            icon:'success'
                        })
                     }
                      
                  },
                  fail:(err:any)=>
                  {
                      wx.showToast({
                          title:'出现错误',
                          icon:'error'
                      })
                  }
                  })
            }
        }
        else{
            wx.showModal({
                content:'请先登录',
                showCancel:false
             })
        }
    },
    inputed(e:any){
        this.setData({
            comment_content:e.detail.value
        })
    },
    look(){
        wx.previewImage({
            current:this.data.content,
            urls:[this.data.content]
          })
    },
     /* 判断是否收藏 */
     iscollected(){
        wx.request({
            method:'POST',
            url:app.globalData.url+'api/iscollected',
            data:{
                id:wx.getStorageSync('userinfo').studentid,
                tweet_id:this.data.id
            },
            header:{
              'content-type':'application/x-www-form-urlencoded'
          },
          success:(res:any)=>{
              if(res.data.status==200)
              {
                  this.setData({
                      iscollect:'red'
                  })
              }
              
          }
        
        })
     },
    /* 获取评论 */
    getcomment(){
        wx.request({
            method:'POST',
            url:app.globalData.url+'api/get_comment',
            data:{
                id:this.data.id,
            },
            header:{
              'content-type':'application/x-www-form-urlencoded'
          },
          success:(res:any)=>{
             
              
           if(res.data.data!=undefined)
           {
            this.setData({
                comment_list:res.data.data
            })
           }
           else{
               this.setData({
                   comment_list:[]
               })
           }
          }
        })
    },
    cancel(event:any){
        wx.showModal({
           content:'确定删除该评论吗？',
           success:(res)=>{
               if(res.confirm){
                   wx.request({
                    method:'POST',
                    url:app.globalData.url+'api/cancel_comment',
                    header:{
                      'content-type':'application/x-www-form-urlencoded'
                  },
                  data:{
                      
                      reply_id:event.currentTarget.dataset.index,
                      studentid:wx.getStorageSync('userinfo').studentid,
                      integral:wx.getStorageSync('userinfo').integral
                  },
                  success:(res:any)=>{
                    
                      
                      if(res.data.status==202)
                      {
                        var newuserinfo={
                            avatarUrl:wx.getStorageSync('userinfo').avatarUrl,
                            integral:parseInt(wx.getStorageSync('userinfo').integral)-2,
                            isboss:wx.getStorageSync('userinfo').isboss,
                            nickname:wx.getStorageSync('userinfo').nickname,
                            phonenumber:wx.getStorageSync('userinfo').phonenumber,
                            studentid:wx.getStorageSync('userinfo').studentid,
                            role:wx.getStorageSync('userinfo').role
                        }
                        wx.setStorageSync('userinfo',newuserinfo)
                         this.getcomment()
                      }
                  }

                   })
               }
           } 
        })
    },
    /* 发送评论 */
    to_comment(){
         if(wx.getStorageSync('userinfo'))
         {
            if(this.data.comment_content=='')
            {
               wx.showModal({
                   content:'不能发送空白评论',
                   showCancel:false
                })
            }
            else{
                
                
               var time=new Date()
               var nowtime=time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日'+(time.getHours()<10?('0'+time.getHours()):time.getHours())+':'+(time.getMinutes()<10?('0'+time.getMinutes()):time.getMinutes())
               wx.request({
                   method:'POST',
                   url:app.globalData.url+'api/comment_tweet',
                   data:{
                       studentid:wx.getStorageSync('userinfo').studentid,
                       content:this.data.comment_content,
                       id:this.data.id,
                       photo:wx.getStorageSync('userinfo').avatarUrl,
                       nickname:wx.getStorageSync('userinfo').nickname,
                       time:nowtime,
                       integral:wx.getStorageSync('userinfo').integral
                    
                   },
                   header:{
                     'content-type':'application/x-www-form-urlencoded'
                 },
                 success:(res:any)=>{
                   
                    
                     
                     if(res.data.status==202)
                     {
                         this.setData({
                             y:'0',
                             iscomment:false
                         })
                        var newuserinfo={
                            avatarUrl:wx.getStorageSync('userinfo').avatarUrl,
                            integral:parseInt(wx.getStorageSync('userinfo').integral)+2,
                            isboss:wx.getStorageSync('userinfo').isboss,
                            nickname:wx.getStorageSync('userinfo').nickname,
                            phonenumber:wx.getStorageSync('userinfo').phonenumber,
                            studentid:wx.getStorageSync('userinfo').studentid,
                            role:wx.getStorageSync('userinfo').role
                        }
                        wx.setStorageSync('userinfo',newuserinfo)
                         this.getcomment()
                     }
                 }
               })
            }
         }
         else{
            wx.showModal({
                content:'请先登录',
                showCancel:false
             })
         }
    },
    /* 点击评论 */
    commented(){
        this.setData({
            iscomment:true,
            bottom:'50%'
        })
    
    },
    thumbsup(){
         if(wx.getStorageSync('userinfo'))
         {
            if(this.data.isselected=='#6AC41B')
            {
                this.setData({
                    isselected:'red',
                    likenum:this.data.likenum+1
                })
                wx.request({
                   method:'POST',
                         url:app.globalData.url+'api/addlike',
                         header:{
                           'content-type':'application/x-www-form-urlencoded'
                       },
                       data:{
                           id:this.data.id,
                           likenum:this.data.likenum-1,
                           studentid:wx.getStorageSync('userinfo').studentid,
                           integral:wx.getStorageSync('userinfo').integral
                       },
                       success:(res:any)=>{
                           if(res.data.status==200)
                            {
                               wx.showModal({
                                   content:'出错了',
                                   showCancel:false
                                })
                            }   
                            else{
                                var newuserinfo={
                                    avatarUrl:wx.getStorageSync('userinfo').avatarUrl,
                                    integral:parseInt(wx.getStorageSync('userinfo').integral)+2,
                                    isboss:wx.getStorageSync('userinfo').isboss,
                                    nickname:wx.getStorageSync('userinfo').nickname,
                                    phonenumber:wx.getStorageSync('userinfo').phonenumber,
                                    studentid:wx.getStorageSync('userinfo').studentid,
                                    role:wx.getStorageSync('userinfo').role
                                }
                                wx.setStorageSync('userinfo',newuserinfo)
                            }                  
                       }
               })
            }
            else{
               this.setData({
                   isselected:'#6AC41B',
                   likenum:this.data.likenum-1,
                   
               })
               wx.request({
                   method:'POST',
                         url:app.globalData.url+'api/reject_like',
                         header:{
                           'content-type':'application/x-www-form-urlencoded'
                       },
                       data:{
                           id:this.data.id,
                           likenum:this.data.likenum+1,
                           studentid:wx.getStorageSync('userinfo').studentid,
                           integral:wx.getStorageSync('userinfo').integral
                       },
                       success:(res:any)=>{
                           if(res.data.status==200)
                            {
                               wx.showModal({
                                   content:'出错了',
                                   showCancel:false
                                })
                            }        
                            else{
                                var newuserinfo={
                                    avatarUrl:wx.getStorageSync('userinfo').avatarUrl,
                                    integral:parseInt(wx.getStorageSync('userinfo').integral)-2,
                                    isboss:wx.getStorageSync('userinfo').isboss,
                                    nickname:wx.getStorageSync('userinfo').nickname,
                                    phonenumber:wx.getStorageSync('userinfo').phonenumber,
                                    studentid:wx.getStorageSync('userinfo').studentid,
                                    role:wx.getStorageSync('userinfo').role
                                }
                                wx.setStorageSync('userinfo',newuserinfo)
                            }             
                       }
               })
            }
         }
         else{
            wx.showModal({
                content:'请先登录',
                showCancel:false
             })
         }
    },
  getdata(){
    wx.request({
        method:'POST',
              url:app.globalData.url+'api/gettweet',
              header:{
                'content-type':'application/x-www-form-urlencoded'
            },
            data:{
                id:this.data.id
            },
            success:(res:any)=>{
                if(res.data.status==200)
                {
                    this.setData({
                        content:res.data.data[0].content,
                        title:res.data.data[0].title,
                        likenum:res.data.data[0].like_num,
                        readnum:res.data.data[0].read_num,
                        time:res.data.data[0].send_time
                    })
                
                 
                }
             
            }
    })
  },
  share_tweet(){
      this.onShareAppMessage()
  },
 selected(){
     this.setData({
         isshow:true
     })

     
 },
  getstatus(){
    wx.request({
        method:'POST',
              url:app.globalData.url+'api/islike',
              header:{
                'content-type':'application/x-www-form-urlencoded'
            },
            data:{
                id:this.data.id,
                studentid:wx.getStorageSync('userinfo').studentid
            },
            success:(res:any)=>{
                if(res.data.status==200)
                {     
                
                    this.setData({
                        isselected:'red'
                    })
                
                 
                }
             
            }
    }) 
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options:any) {
     this.setData({
         id:options.id,
         starttime:+new Date(),
         studentid:wx.getStorageSync('userinfo').studentid
     })
     var timer='2024-01-04 12:00:00';
     var time=new Date()
     var nowtime=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+(time.getDate()<10?('0'+time.getDate()):time.getDate())+' '+(time.getHours()<10?('0'+time.getHours()):time.getHours())+':'+(time.getMinutes()<10?('0'+time.getMinutes()):time.getMinutes())+":"+(time.getSeconds()<10?('0'+time.getSeconds()):time.getSeconds())
     var timerDate = new Date(timer);
     var nowtimeDate = new Date(nowtime);
     if(nowtimeDate<timerDate)
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
   var timed= setInterval(()=>{
         this.getdata()
         this.getstatus()
         this.getcomment()
         this.iscollected()
         clearInterval(timed)
     },50)
    
       
    },
     restart(){
         this.setData({
             y:'0',
             iscomment:false,
             
         })
         var timer='2023-12-17 19:25:00';
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
      this.data.endtime=+new Date()
      if(this.data.endtime-this.data.starttime>=60000)
      {
        
        wx.request({
            method:'POST',
                  url:app.globalData.url+'api/addread',
                  header:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                data:{
                    id:this.data.id,
                    readnum:this.data.readnum,
                    studentid:wx.getStorageSync('userinfo').studentid,
                    integral:wx.getStorageSync('userinfo').integral
                },
                success:(res:any)=>{
                   if(res.data.status==202)
                   {
                    var newuserinfo={
                        avatarUrl:wx.getStorageSync('userinfo').avatarUrl,
                        integral:parseInt(wx.getStorageSync('userinfo').integral)+2,
                        isboss:wx.getStorageSync('userinfo').isboss,
                        nickname:wx.getStorageSync('userinfo').nickname,
                        phonenumber:wx.getStorageSync('userinfo').phonenumber,
                        studentid:wx.getStorageSync('userinfo').studentid,
                        role:wx.getStorageSync('userinfo').role
                    }
                    wx.setStorageSync('userinfo',newuserinfo)
                   }
                    
                 
                }
        }) 
          
      }
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
     return{
        title:this.data.title,
        path:'pages/detail/detail?id='+this.data.id
     }
    }
})