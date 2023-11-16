// pages/my_con/my_con.ts
export{}
 const app=getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
      list:[],
     my_id:'',
     show:false,
     remark:'',
     from_id:'',
     to_id:''
    },
    getlist(){
      if(wx.getStorageSync('userinfo').role=='s')
      {
        wx.request({
          url:app.globalData.url+'api/check_consulation',
        method:'POST',
        header:{
            'content-type':'application/x-www-form-urlencoded'
        },
        data:{
          from_id:wx.getStorageSync('userinfo').studentid,
        },
        success:(res:any)=>{
          if(res.data.status==200)
          {
            this.setData({
              list:res.data.data
            })
          }
          else{
            wx.showToast({
              title:'加载失败',
              icon:'error'
            })
          }
        }
        })
      }
      else{
        wx.request({
          url:app.globalData.url+'api/T_consulation',
        method:'POST',
        header:{
            'content-type':'application/x-www-form-urlencoded'
        },
        data:{
          to_id:wx.getStorageSync('userinfo').studentid,
        },
        success:(res:any)=>{
          if(res.data.status==200)
          {
            this.setData({
              list:res.data.data
            })
          }
          else{
            wx.showToast({
              title:'加载失败',
              icon:'error'
            })
          }
        }
        })
      }
    },
    getremark(e:any){
      this.setData({
        remark:e.detail.value
      })
    },
    reback(){
      this.setData({
        show:false,
        remark:'',
        from_id:'',
        to_id:''
      })
    },
    remarks(e:any){
     
      
      this.setData({
        show:true,
        from_id:e.target.dataset.from_id,
        to_id:e.target.dataset.to_id
      },()=>{
        wx.request({
          url:app.globalData.url+'api/getremark',
        method:'POST',
        header:{
            'content-type':'application/x-www-form-urlencoded'
        },
        data:{
          from_id:e.target.dataset.from_id,
          to_id:e.target.dataset.to_id
        },
        success:(res:any)=>{
          if(res.data.status==200)
          {
            this.setData({
              remark:res.data.data[0].remark
            })
           
          }
          
          
        }
        })
      })
    
    },
   serve(){
    if(this.data.remark.trim()=='')
    {
      wx.showToast({
        title:'备注不能为空',
        icon:'none'
      })
    }
    else{
      wx.request({
        url:app.globalData.url+'api/addremark',
        method:'POST',
        header:{
            'content-type':'application/x-www-form-urlencoded'
        },
        data:{
          from_id:this.data.from_id,
          to_id:this.data.to_id,
          remark:this.data.remark
        },
        success:(res:any)=>{
          if(res.data.status==202)
          {
            wx.showToast({
              title:'保存成功',
              icon:'none'
            })
          }
          else{
            wx.showToast({
              title:'保存失败',
              icon:'none'
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
        my_id:wx.getStorageSync('userinfo').studentid
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