// pages/consulation/consulation.ts
export{}
 const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Recommend_font:"#8BC410",
        first_font:"#B3B3B3",
        seconde_font:"#B3B3B3",
        third_font:"#B3B3B3",
        Recommend_image:true,
        first_image:false,
        second_image:false,
        third_image:false,
        selected_flag:1,
        navHeight:0,
     menuBot:0,
     datalist:[],
     firstshowlist:[],
     secondlist:[],
     thirdlist:[],
     showlist:[],
     isboss:false,
    
    
    },
   
    //点击推荐按钮
    recommed_tap(){
     if(this.data.selected_flag==1)
     {
         return
     }
     else{
        this.setData({
            Recommend_font:"#8BC410",
           first_font:"#B3B3B3",
          seconde_font:"#B3B3B3",
           third_font:"#B3B3B3",
            selected_flag:1,
            Recommend_image:true,
            first_image:false,
            second_image:false,
            third_image:false,
            
        })
        this.setData({
            showlist:this.data.datalist
        })
     }
    },
    //一级点击事件
    first_tap(){
        if(this.data.selected_flag==2)
        {
            return
        }
        else{
           this.setData({
            Recommend_font:"#B3B3B3",
            first_font:"#8BC410",
            seconde_font:"#B3B3B3",
            third_font:"#B3B3B3",
               selected_flag:2,
               Recommend_image:false,
               first_image:true,
               second_image:false,
               third_image:false,
           })
           
           this.setData({
               showlist:this.data.firstshowlist
           })
        }
    },
    second_tap(){
        if(this.data.selected_flag==3)
        {
            return
        }
        else{
           this.setData({
            Recommend_font:"#B3B3B3",
            first_font:"#B3B3B3",
            seconde_font:"#8BC410",
            third_font:"#B3B3B3",
               selected_flag:3,
               Recommend_image:false,
               first_image:false,
               second_image:true,
               third_image:false,
           })
           this.setData({
            showlist:this.data.secondlist
        })
        }
    },
    third_tap(){
        if(this.data.selected_flag==4)
        {
            return
        }
        else{
           this.setData({
            Recommend_font:"#B3B3B3",
            first_font:"#B3B3B3",
            seconde_font:"#B3B3B3",
            third_font:"#8BC410",
               selected_flag:4,
               Recommend_image:false,
               first_image:false,
               second_image:false,
               third_image:true,
           })
           this.setData({
            showlist:this.data.thirdlist
        })
        }
    },
    look(event:any){
      wx.previewImage({
          urls:[event.target.dataset.index]
      })
    },
    getlistdata(){
        wx.request({
            url:app.globalData.url+'api/get_teacher_list',
            method:'POST',
            header:{
                'content-type':'application/x-www-form-urlencoded'
            },
            success:(res:any)=>{
                this.setData({
                    datalist:res.data.data,
                   showlist:res.data.data
                })
                var length=this.data.datalist.length
        for(var i=0;i<length;i++)
        {  
            this.data.firstshowlist=[]
            this.data.secondlist=[]
            this.data.thirdlist=[]
            if(res.data.data[i].level=='1')
                 {this.data.firstshowlist.push(this.data.datalist[i])}
            else if(res.data.data[i].level=='2')
            {this.data.secondlist.push(this.data.datalist[i])}
            else if(res.data.data[i].level=='3')
            {this.data.thirdlist.push(this.data.datalist[i])}
        }
        
      
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
       })
       this.getlistdata()
        if(wx.getStorageSync('userinfo').isboss=='1')
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