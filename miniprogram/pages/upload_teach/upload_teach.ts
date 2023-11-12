// pages/upload_teach/upload_teach.ts
export{}
 const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        filelist:[
            {
            url:''
            }
        ],
        location_filelist:[
            {
            url:''
            }
        ],
        nickname:'',
        work_place:'',
        work_time:'',
        phonenumber:'',
        message:'',
        jobid:'',
        columns:[
            '1',
            '2',
            '3'
          ],
          picker:false,
          select:'选择职务'
    },
    getmessage(event:any){
        this.setData({
            message:event.detail.value
        })
    },
    getjobid(event:any){
      this.setData({
          jobid:event.detail.value
      })
  },
    select(){
        this.setData({
            picker:true
        })
    },
    onConfirm(event:any){
        this.setData({
           picker:false,
           select:event.detail.value
       })
        
       },
       onCancel(){
        this.setData({
            picker:false
        })
       },
     /* 读取用户想要上传的图片信息并将其存在filelist数组中 */
     afterRead(event:any){
        const file=event.detail.file;
        this.setData({
            filelist:[...this.data.filelist,{url:file[0].url}]
        
     })},
    
       /* 用户若不想上传图片可将其删除 */
    delete(event:any){
        var index=event.detail.index-1
        if(index<0)
        {this.data.filelist.shift()
            this.setData({
                filelist: this.data.filelist
            })
            return
            
        }  
        this.data.filelist.splice(index,1)
       this.setData({
           filelist:this.data.filelist
       })
    },
  
    getphonenumber(event:any){
        this.setData({
            phonenumber:event.detail.value
        })
    },
    getnickname(event:any){
        this.setData({
            nickname:event.detail.value
        })
    },
    getworkplace(event:any){
        this.setData({
            work_place:event.detail.value
        })
    },
    getworktime(event:any){
        this.setData({
           work_time:event.detail.value
        })
    },
    insert(){
        if(this.data.filelist.length>0&&this.data.message!=''&&this.data.nickname!=''&&this.data.select!='选择级别'&&this.data.work_place!=''&&this.data.work_time!=''&&this.data.jobid!=''){
            wx.uploadFile({
                url:app.globalData.url+'api/teacher_avator',
                name:'teacher_avator',
                filePath:this.data.filelist[0].url
             })
             wx.request({
                url:app.globalData.url+'api/upload_teacher',
                method:'POST',
                data:{
                    name:this.data.nickname,
                    work_place:this.data.work_place,
                    work_time:this.data.work_time,
                    reservation_phone:this.data.phonenumber,
                    message:this.data.message,
                    level:this.data.select,
                    jobid:this.data.jobid
                },
                header:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                success:(res:any)=>{
                    if(res.data.status==200)
                    {
                        wx.showToast({
                            icon:"success",
                            title:'添加成功'
                        })
                        this.setData({
                            nickname:'',
                            work_place:'',
                            work_time:'',
                            phonenumber:'',
                            filelist:[],
                            message:'',
                            jobid:''
                        })
                    }
                    else if(res.data.status==201)
                    {
                        wx.showToast({
                            icon:"error",
                            title:'添加失败'
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
            filelist:[],
            location_filelist:[]
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