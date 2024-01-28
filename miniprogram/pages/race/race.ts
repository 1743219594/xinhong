// pages/race/race.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
      class:"",
      content:"",
      id:"",
      loaction:"",
      matchid:"",
      name:"",
      number:"",
      racename:"",
      result:"",
      studentid:"",
      team:"",
      time:"",
      responseName:"",
      hasteam:false,
      hasresult:false
    },
    Register(){
      wx.navigateTo({
        url:'../register/register?matchid='+this.data.id
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
       this.setData({
         class:options.class,
         content:options.content,
         id:options.id,
         loaction:options.loaction,
         matchid:options.matchid,
         name:options.name,
         number:options.number,
         racename:options.racename,
         result:options.result,
         studentid:options.studentid,
         team:options.team,
         time:options.time,
         responseName:options.responsesName,
         hasteam:options.matchid=='null'?false:true,
         hasresult:options.result=='null'?false:true
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