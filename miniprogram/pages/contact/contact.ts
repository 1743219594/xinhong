// 简单版
export{}
 const app=getApp()
Page({
  data: {
      content: '',
      jobid:'',
      // 聊天信息
      chatList: [],
      my_id:'',
      ws:{}
  },
 
  // 输入监听
  inputClick(e:any) {
      this.setData({
          content: e.detail.value
      })
  },
  // 发送监听
  sendClick() {
   if(this.data.content.trim()!='')
   {
    var time=new Date()
    var nowtime=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+' '+(time.getHours()<10?('0'+time.getHours()):time.getHours())+':'+(time.getMinutes()<10?('0'+time.getMinutes()):time.getMinutes())
    wx.request({
      url:app.globalData.url+'api/consulation_message',
      method:'POST',
      header:{
          'content-type':'application/x-www-form-urlencoded'
      },
      data:{
        time:nowtime,
        from_id:wx.getStorageSync('userinfo').studentid,
        jobid:this.data.jobid,
        content:this.data.content,
        avator:wx.getStorageSync('userinfo').avatarUrl,
        name:wx.getStorageSync('userinfo').nickname
      },
      success:(res:any)=>{
       if(res.data.status==200)
       {
        const messageObject = {
          id:'xinhong',
          content: this.data.content,
           from_id:wx.getStorageSync('userinfo').studentid,
           to_id:this.data.jobid
         }; 
    wx.sendSocketMessage({
        data:JSON.stringify(messageObject)
    })
       }
       else{
        wx.showToast({
          title:'发送失败',
          icon:'error'
        })
       }
       
        
      },
      complete:()=>{
        this.setData({
          content:''
        })
      }
    })
   }
  },
  getdata(){
    wx.request({
      url:app.globalData.url+'api/get_con',
      method:'POST',
      header:{
          'content-type':'application/x-www-form-urlencoded'
      },
      data:{
        from_id:wx.getStorageSync('userinfo').studentid,
        to_id:this.data.jobid
      },
      success:(res:any)=>{
        if(res.data.status==200)
        {
          this.setData({
            chatList:res.data.data
          })
        }
        else{
          wx.showToast({
            title:'发送失败',
            icon:'error'
          })
        }
        
      }
    })
  },
  onLoad(e:any) {

    this.setData({
      jobid:e.jobid,
      my_id:wx.getStorageSync('userinfo').studentid
    },()=>{
      this.getdata()
    })
    this.data.ws=wx.connectSocket({
      url:'ws://192.168.1.124:7070?id='+'xinhong'+'&from_id='+this.data.my_id+'&to_id='+this.data.jobid,
      header: {
          'content-type': 'application/json'
        }
  })
  wx.onSocketMessage(()=>{
      this.getdata()
  
     
  })
},
onHide() {


},
onUnload() {
console.log(111);

},


})
