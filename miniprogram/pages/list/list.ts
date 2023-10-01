// pages/list/list.ts
const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
     KeyWord:'',
     flag:true,
     status:true,
     navHeight:0,
     menuBot:0,
     isload:false,
     list:[{}],
     isboss:false,
     datalist:[],
  
      page:0,
      hasremain:true
    },
    
    getlist(){
        wx.showLoading({
            mask:true,
            title:'努力加载中'
        })
        wx.request({
            method:'POST',
                  url:app.globalData.url+'api/get_tweet',
                  header:{
                    'content-type':'application/x-www-form-urlencoded'
                },
              data:{
                  page:this.data.page
              },
                success:(res:any)=>{
                    wx.hideLoading()
                    if(res.data.status==200)
                    {
                         this.setData({
                             list:res.data.data,
                           page:this.data.page+4
                         })
                         
                    }
                    else if(res.data.status==201)
                {
                    if(res.data.data.length>0)
                    { 
                    
                        this.setData({
                            list:[...this.data.list,...res.data.data],
                        })
                    }
                    this.setData({
                        hasremain:false
                    })
                    
                }
                   
                 
                },
                complete:()=>{
                    wx.hideLoading()
                }
        })
    },
 
   
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
         this.setData({
             navHeight:app.globalData.menuHeight,
             menuBot:app.globalData.menuBot,
             list:[]
         })
          this.getlist()
          if(wx.getStorageSync('userinfo').isboss=="1")
          {
              this.setData({
                  isboss:true
              })
          }
       
        
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
        this.data.page=0;
        this.data.hasremain=true;
        this.data.list=[];
       this.getlist()
       
       wx.stopPullDownRefresh()
    }, 
    
   
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
     if(this.data.hasremain)
     {
         this.getlist()
     }
      
       
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})