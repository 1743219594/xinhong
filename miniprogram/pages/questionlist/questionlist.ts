// pages/questionlist/questionlist.ts
export{}
 const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      datalist:[]
    },
    
    getdatalist(){
      wx.request({
            method:'POST',
            url:app.globalData.url+'api/getQuestion',
            header:{
                'content-type':'application/x-www-form-urlencoded'
            },
            success:(res:any)=>{
              if(res.data.status==200)
              {
                this.setData({
                  datalist:res.data.data
                })
              }
              else{
                wx.showToast({
                  icon:'none',
                  title:'获取失败'
                })
              }
            }
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
      this.getdatalist()
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