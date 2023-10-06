// pages/note/note.ts
export{}
 const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:'',
       title:'',
       content:'',
       time:'',
       
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
          wx.showModal({
              content:'确定保存吗？',
              success:(res)=>{
                  if(res.confirm){
                    var time=new Date()
                    var nowtime=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+' '+(time.getHours()<10?('0'+time.getHours()):time.getHours())+':'+(time.getMinutes()<10?('0'+time.getMinutes()):time.getMinutes())
                      wx.request({
                        method:'POST',
                        url:app.globalData.url+'api/updatenotes',
                        data:{
                           id:this.data.id,
                           title:this.data.title,
                           content:this.data.content,
                           time:nowtime
                        },
                        header:{
                            'content-type':'application/x-www-form-urlencoded'
                        },
                        success:(res:any)=>{
                           if(res.data.status==200)
                           {
                                wx.showToast({
                                    title:'保存成功',
                                    icon:'success'
                                })
                           }
                            
                        }
                      })
                  }
              }
          })
      },
      delete(){
          wx.showModal({
              title:'确定删除吗？',
              success:(res)=>{
                  if(res.confirm){
                      wx.request({
                        method:'POST',
                        url:app.globalData.url+'api/delete_bei',
                        data:{
                           id:this.data.id,
                        },
                        header:{
                            'content-type':'application/x-www-form-urlencoded'
                        },
                        success:(res:any)=>{
                            if(res.data.status==202)
                            {
                               wx.showToast({
                                   title:'删除成功',
                                   icon:'success'
                               })
                               var time=setInterval(()=>{
                                   clearInterval(time)
                                wx.navigateBack()

                               },500)
                            }
                        }
                      })
                  }
              }
          })
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(event:any) {
      this.setData({
          id:event.id,
          title:event.title,
          time:event.time,
          content:event.content
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