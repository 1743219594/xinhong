// pages/ranking/ranking.ts
export{}
 const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[{openid:'',studentid:0}],
        user:{},
        index:0,
        isload:false
    },
   getlist(){
    wx.request({
        method:'POST',
            url:app.globalData.url+'api/getranking',
            header:{
                'content-type':'application/x-www-form-urlencoded'
            },
            success:(res:any)=>{
             if(res.data.status==200)
             {
                this.setData({
                    list:res.data.data
                })
                var time=setInterval(()=>{
                    this.data.list.forEach((item,index)=>{
                        if(item.studentid==wx.getStorageSync('userinfo').studentid)
                        {
                            this.setData({
                                user:item,
                                index:index
                            })
                        }
                     
                    })
                     clearInterval(time)
                },50)
             }
            }
          
      })
   },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.getlist()
      if(wx.getStorageSync('userinfo'))
      {
          this.setData({
              isload:true
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