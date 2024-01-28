// pages/activityDetail/activityDetail.ts
export{}
 const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      /* 活动福利 */
      benefit:'',
      content:'',
      description:'',
      group:'',
      id:'',
      loaction:'',
      movie:'',
      moviecover:'',
      numberlimit:'',
      object:'',
      time:'',
      timelimit:'',
      title:'',
      /* 是否超时 */
      Isovertime:false,
      /* 是否已经报名 */
      IsRegistration:false,
      /* 提示文字 */
      textmessage:'报名'
    },
    /* 进行报名 */
    Registration(){
      if(wx.getStorageSync('userinfo'))
      {
        wx.showLoading({
          mask:true,
          title:'努力加载中'
      })
      wx.request({
        method:'POST',
        url:app.globalData.url+'api/Registration',
        header:{
          'content-type':'application/x-www-form-urlencoded'
      },
      data:{
        studentid:wx.getStorageSync('userinfo').studentid,
        activityid:this.data.id,
        numberlimit:this.data.numberlimit
      },
      success:(res:any)=>{
        if(res.data.status==200)
        {
          wx.showToast({
            icon:'success',
            title:'报名成功'
          })
          this.setData({
            IsRegistration:true,
            textmessage:'已报名'
          })
        }
        else if(res.data.status==201){
          wx.showToast({
            icon:'none',
            title:'名额已满'
          })
        }
        else{
          wx.showToast({
            icon:'error',
            title:'报名失败'
          })
        }
      },
      complete:()=>{
        wx.hideLoading()
      }
      })
      }
      else{
        wx.showModal({
          showCancel:false,
          content:'请登录'
        })
      }
    },
    /* 判断该用户是否已经报名该活动 */
    check(){
      wx.request({
        method:'POST',
        url:app.globalData.url+'api/IsRegistration',
        header:{
          'content-type':'application/x-www-form-urlencoded'
      },
      data:{
        studentid:wx.getStorageSync('userinfo').studentid,
        activityid:this.data.id
      },
      success:(res:any)=>{
        if(res.data.status==200)
        {
          if(res.data.data.length>=1)
          {
            this.setData({
             IsRegistration:true,
             textmessage:'已报名'
            })
            
          }
          else{
            this.setData({
              IsRegistration:false
             })
          }
        }
      }
      })
    },
    previewGroup(){
      wx.previewImage({
        current:this.data.group,
        urls:[this.data.group]
      })
    },
    previewOffice(){
      wx.previewImage({
        current:'https://www.xhmental.cn/9e07959415263eadd0d991a38038229.jpg',
        urls:['https://www.xhmental.cn/9e07959415263eadd0d991a38038229.jpg']
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options:any) {
      const dateObject = new Date(options.timelimit)
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1; // 月份是从 0 开始的，所以需要加 1
      const day = dateObject.getDate();
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();
      const seconds = dateObject.getSeconds();
      const aftertime= year+'-'+month+'-'+(day<10?'0'+day:day)+' '+(hours<10?'0'+hours:hours)+':'+(minutes<10?'0'+minutes:minutes)+':'+(seconds<10?'0'+seconds:seconds);
      // 创建 Date 对象
      const targetDate = new Date(options.timelimit);

      // 获取当前本地时间
      const currentDate = new Date();
      if (targetDate < currentDate) {
        this.setData({
          Isovertime:true
        })
      } else {
       this.setData({
         Isovertime:false
       });
      }
      this.setData({
        benefit:options.benefit,
        content:options.content,
        description:options.description,
        group:options.group,
        id:options.id,
        loaction:options.loaction,
        movie:options.movie,
        moviecover:options.moviecover,
        numberlimit:options.numberlimit,
        object:options.object,
        time:options.time,
        timelimit:aftertime,
        title:options.title
      },()=>{
        this.check()
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