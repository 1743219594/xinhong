// pages/post/post.ts
export{}
 const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
       content:'',
      to_id:''
    },
  
    getdata(e:any){
     this.setData({
         content:e.detail.value
     })
 },
 gettoid(e:any)
 {
    this.setData({
        to_id:e.detail.value
    })
 },
 /* 匿名发消息 */
  send(){
      if(this.data.content==''||this.data.to_id=='')
      {
          wx.showModal({
              showCancel:false,
              content:'请填写完整'
          })
      }
      else if(!wx.getStorageSync('userinfo'))
      {
        wx.showModal({
            showCancel:false,
            content:'请先登录'
        })
      }
      else{
          wx.request({
            method:'POST',
                url:app.globalData.url+'api/check',
                data:{
                   from_id:wx.getStorageSync('userinfo').studentid,
                   to_id:this.data.to_id
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
                    wx.request({
                        method:'POST',
                        url:app.globalData.url+'api/exist',
                        data:{
                            openid:this.data.to_id
                        },
                        header:{
                            'content-type':'application/x-www-form-urlencoded'
                        },
                        success:(res:any)=>{
                          if(res.data.status==200)
                          {
                            var time=new Date()
                            var nowtime=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+' '+(time.getHours()<10?('0'+time.getHours()):time.getHours())+':'+(time.getMinutes()<10?('0'+time.getMinutes()):time.getMinutes())
                              wx.request({
                                url:app.globalData.url+'api/send_message',
                                method:'POST',
                                header:{
                                   'content-type':'application/x-www-form-urlencoded'
                               },
                               data:{
                                   from_id:wx.getStorageSync('userinfo').studentid,
                                   to_id:this.data.to_id,
                                   content:this.data.content,
                                   time:nowtime
                               },
                               success:(res)=>{
                                  
                                   this.setData({
                                       content:'',
                                       to_id:''
                                   })
                                   wx.showToast({
                                       title:'发送成功',
                                       icon:'success'
                                   })
                               }
                              })
                          }
                          else if(res.data.status==202)
                          {
                             wx.showModal({
                                 showCancel:false,
                                 title:'该用户不存在'
                             })
                          }
                        }
                      })
                  }
                  
                }
              
          })
       
      }
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
       if(options.studentid)
       {
          this.setData({
              to_id:options.studentid
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