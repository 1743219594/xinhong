// pages/message/message.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeName: '1',
        nickname:'',
        phonenumber:0,
        avatorurl:'',
        studentid:0
      },
      onChange(event:any) {
        this.setData({
          activeName: event.detail,
        });
      },
      

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

        
      this.setData({
          
          
          studentid:wx.getStorageSync('userinfo').studentid,
          phonenumber:wx.getStorageSync('userinfo').phonenumber,
          nickname:wx.getStorageSync('userinfo').nickname,
          avatorurl:wx.getStorageSync('userinfo').avatarUrl
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