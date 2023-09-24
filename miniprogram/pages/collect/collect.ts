// pages/collect/collect.ts
export{}
 const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
         id:'',
         list:[],
         active: 0,
         
    },
  
      getlist(){
          wx.request({
            method:'POST',
            url:app.globalData.url+'api/collected_tweet',
            header:{
              'content-type':'application/x-www-form-urlencoded'
          },
          data:{
              id:wx.getStorageSync('userinfo').studentid
          },
          success:(res:any)=>{
              
              
              this.setData({
                  list:res.data.data
              })
              
          }
          })
      },
      
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(event) {
     this.setData({
       id:event.id
     })
     this.getlist()

     
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