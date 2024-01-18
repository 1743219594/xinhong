// pages/activity/activity.ts
export{}
 const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      navHeight:0,
      menuBot:0,
      currentIndex: 0,
      imagelist:['../../image/swiper1.png','../../image/swiper2.jpg','../../image/swiper3.jpg']
    },
    handleChange: function (e:any) {
      this.setData({
        currentIndex: e.detail.current
      })

    },
    router_act(){
      wx.navigateTo({
        url:'../acrivity/activity'
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
      this.setData({
        navHeight:app.globalData.menuHeight,
        menuBot:app.globalData.menuBot,
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