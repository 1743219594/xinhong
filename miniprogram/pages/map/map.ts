// pages/map/map.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
      message:"",
      photo:"",
      name:"",
      level:"",
      work_place:'',
      work_time:"",
      phone:"",
      jobid:"",
      show:true
    },
    turn(){
     if(wx.getStorageSync('userinfo'))
     {
      wx.navigateTo({
        url:'../contact/contact?jobid='+this.data.jobid
      })
     }
     else{
       wx.showToast({
         title:'请先登录',
         icon:'error'
       })
     }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(e:any) {
      this.setData({
          message:e.message,
          photo:e.photo,
          name:e.name,
          phone:e.reservation_phone,
          work_place:e.work_place,
          work_time:e.work_time,
          jobid:e.jobid
    })
    if(e.level==1)
    {
        this.setData({
            level:"书记"
        })
    }
    else if(e.level==2)
    {
        this.setData({
            level:"辅导员"
        })
    }
    else{
        this.setData({
            level:"咨询中心老师",
            show:false
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