// pages/write/write.ts
export{}
 const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      title:'',
      content:''
    },
    gettitle(event:any){
      this.setData({
          title:event.detail.value
      })
    },
    getcontent(event:any){
        this.setData({
            content:event.detail.value
        })
    },
    serve(){
        if(this.data.content!=''&&this.data.title!='')
        {  
            var time=new Date()
            var nowtime=time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日'+(time.getHours()<10?('0'+time.getHours()):time.getHours())+':'+(time.getMinutes()<10?('0'+time.getMinutes()):time.getMinutes())
            wx.request({
                method:'POST',
                url:app.globalData.url+'api/addnote',
                data:{
                    title:this.data.title,
                    content:this.data.content,
                    studentid:wx.getStorageSync('userinfo').studentid,
                    time:nowtime
                },
                header:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                success:(res:any)=>{
                    if(res.data.status==202)
                    {
                        wx.showToast({
                            title:'保存成功',
                            icon:'success'
                        })
                        this.setData({
                            title:'',
                            content:''
                        })
                    }
                    
                }
            })
        }
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

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