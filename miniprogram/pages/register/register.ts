// pages/register/register.ts
export{}
const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      matchid:'',
      team:'',
      class:'',
      responsesName:'',
      studentid:''
    },
    Register(){
      if(this.data.matchid!=''&&this.data.responsesName!=''&&this.data.studentid!=''&&this.data.team!=''&&this.data.class!='')
      {
        wx.request({
          method:'POST',
          url:app.globalData.url+'api/responses',
          header:{
              'content-type':'application/x-www-form-urlencoded'
          },
          data:{
            matchid:this.data.matchid,
            team:this.data.team,
            responseName:this.data.responsesName,
            class:this.data.class,
            studentid:this.data.studentid
          },
          success:(res:any)=>{
            if(res.data.status==200)
            {
              wx.showToast({
                icon:'success',
                title:'报名成功'
              })
              wx.navigateBack(
                {
                  delta:2
                }
              )
            }
            else
            {
              wx.showToast({
                icon:'error',
                title:'报名失败'
              })
            }
          }
        })
      }
      else{
        wx.showToast({
          icon:'error',
          title:'信息填写不全'
        })
      }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.setData({
        matchid:options.matchid
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