
// pages/check/check.ts
export{}
const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      studentid:'',
      content:'',
      results:[''],
      other_studentid:'',
      other_content:'',
      other_results:[''],
      tweet:''
    },
     getstudentid(event:any){
      this.setData({
          studentid:event.detail.value
      })
     },
     getcontent(event:any){
        this.setData({
            content:event.detail.value
        })
       },
       check(){
           if(this.data.content==''||this.data.studentid=='')
           {
               wx.showToast({
                   title:'请输入完整！',
                   icon:'error'
               })
           }
           else{
               wx.request({
                method:'POST',
                url:app.globalData.url+'api/check_message',
                header:{
                  'content-type':'application/x-www-form-urlencoded'
              },
              data:{
                  studentid:this.data.studentid,
                  content:this.data.content
              },
              success:(res:any)=>{
                  if(res.data.status==200)
                  {
                    if(res.data.data.length>0)
                    {
                        res.data.data.forEach((item:any) => {
                            this.setData({
                                results:[...this.data.results,item.from_id]
                            })
                        });
                    }
                    else{
                        wx.showToast({
                            title:'查无结果',
                            icon:'error'
                        })
                    }
                  }
                  else{
                    wx.showToast({
                        title:'获取失败！',
                        icon:'error'
                    })
                  }
              }
               })
           }
       },
       getothercontent(event:any){
        this.setData({
            other_content:event.detail.value
        })
       },
       getotherstudentid(event:any){
        this.setData({
            other_studentid:event.detail.value
        })
       },
       other_check(){
        if(this.data.other_content==''||this.data.other_studentid=='')
        {
            wx.showToast({
                title:'请输入完整！',
                icon:'error'
            })
        }
        else{
            wx.request({
             method:'POST',
             url:app.globalData.url+'api/check_reply',
             header:{
               'content-type':'application/x-www-form-urlencoded'
           },
           data:{
               studentid:this.data.other_studentid,
               content:this.data.other_content
           },
           success:(res:any)=>{
               if(res.data.status==200)
               {
                 if(res.data.data.length>0)
                 {
                     res.data.data.forEach((item:any) => {
                         this.setData({
                             other_results:[...this.data.other_results,item.from_id]
                         })
                     });
                 }
                 else{
                     wx.showToast({
                         title:'查无结果',
                         icon:'error'
                     })
                 }
               }
               else{
                 wx.showToast({
                     title:'获取失败！',
                     icon:'error'
                 })
               }
           }
            })
        }
       },
       gettweet(event:any){
         this.setData({
             tweet:event.detail.value
         })
       },
       delete_tweet(){
           if(this.data.tweet=='')
           {
               wx.showToast({
                   title:'请输入题目',
                   icon:'error'
               })
           }
           else{
               wx.request({
                method:'POST',
                url:app.globalData.url+'api/cancel_tweet',
                header:{
                  'content-type':'application/x-www-form-urlencoded'
              },
              data:{
                  title:this.data.tweet
              },
              success:(res:any)=>{
                  if(res.data.status==202)
                  {
                      wx.showToast({
                          title:'删除成功',
                          icon:'success'
                      })
                  }
                  else{
                    wx.showToast({
                        title:'出错了',
                        icon:'error'
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
         this.setData({
             results:[],
             other_results:[]
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