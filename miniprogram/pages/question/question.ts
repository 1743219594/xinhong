// pages/question/question.ts
export{}
 const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      Aselection:'',
      Bselection:'',
      Cselection:'',
      Dselection:'',
      Aissel:false,
      Bissel:false,
      Cissel:false,
      Dissel:false,
      id:'',
      result:'',
      theme:'',
      time:'',
      title:'',
      type:'',
      selectedOptions: ['A'],
      Isovertime:false,
      /* 是否已经报名 */
      IsRegistration:false,
      /* 提示文字 */
      textmessage:'提交'
    },

    /* 判断用户是否已经回答过该问题 */
    check(){
      wx.request({
        method:'POST',
        url:app.globalData.url+'api/getOneQuestion',
        header:{
            'content-type':'application/x-www-form-urlencoded'
        },
        data:{
          studentid:wx.getStorageSync('userinfo').studentid,
          question:this.data.id
        },
        success:(res:any)=>{
          
          if(res.data.status==200)
          {
            if(res.data.data.length>0)
            {
           const target=res.data.data[0].content.split('')
            target.forEach((element: string) => {
              if(element=='A')
              {
                this.setData({
                  Aissel:true
                })
              }
              else if(element=='B')
              {
                this.setData({
                  Bissel:true,
                })
              }
              else if(element=='C')
              {
                this.setData({
                  Cissel:true,
                })
              }
              else{
                this.setData({
                  Dissel:true
                })
              }
            });
            this.setData({
              IsRegistration:true,
              textmessage:'已提交'
            })
            }
          }
          else{
            wx.showToast({
              icon:'none',
              title:'获取失败'
            })
          }
        }
      })
    },
    selectOption(e:any) {
      if(this.data.Isovertime||this.data.IsRegistration)
      {
        return
      }
      else{
        const { index, type } = e.currentTarget.dataset;
        const { selectedOptions } = this.data;    
        if (type === 'a') {
          // 单选题
          this.setData({ selectedOptions: [index] });
          if(index=='A')
        {
          this.setData({
            Aissel:true,
            Bissel:false,
            Cissel:false,
            Dissel:false
          })
        }
        else if(index=='B')
        {
          this.setData({
            Aissel:false,
            Bissel:true,
            Cissel:false,
            Dissel:false
          })
        }
        else if(index=='C')
        {
          this.setData({
            Aissel:false,
            Bissel:false,
            Cissel:true,
            Dissel:false
          })
        }
        else{
          this.setData({
            Aissel:false,
            Bissel:false,
            Cissel:false,
            Dissel:true
          })
        }
        } else if (type === 'b') {
          // 多选题
          const selectedIndex = selectedOptions.indexOf(index);
          if (selectedIndex === -1) {
            if(index=='A')
            {
              this.setData({Aissel:true})
            }
            else if(index=='B')
            {
              this.setData({Bissel:true})
            }
            else if(index=='C')
            {
              this.setData({Cissel:true})
            }
            else
            {
              this.setData({Dissel:true})
            }
            // 未选中，添加到选中列表
            this.setData({ selectedOptions: [...selectedOptions, index] });
          } else {
            if(index=='A')
            {
              this.setData({Aissel:false})
            }
            else if(index=='B')
            {
              this.setData({Bissel:false})
            }
            else if(index=='C')
            {
              this.setData({Cissel:false})
            }
            else
            {
              this.setData({Dissel:false})
            }
            // 已选中，从选中列表中移除
            selectedOptions.splice(selectedIndex, 1);
            this.setData({ selectedOptions: [...selectedOptions] });
          }
        }
      }
    },
  
    upload(){
      if(wx.getStorageSync('userinfo'))
      {
        wx.showModal({
          content:'确定提交吗？',
          success:(res)=>{
            if(res.confirm)
            {  if(this.data.selectedOptions.length>0)
              { 
              
                wx.request({
                  method:'POST',
                  url:app.globalData.url+'api/answer',
                  header:{
                      'content-type':'application/x-www-form-urlencoded'
                  },
                  data:{
                    studentid:wx.getStorageSync('userinfo').studentid,
                    content:this.data.selectedOptions.join(''),
                    question:this.data.id
                  },
                  success:(res:any)=>{
  
                    if(res.data.status==200)
                    {
                      wx.showToast({
                        icon:'success',
                        title:'提交成功'
                      })
                      this.setData({
                        IsRegistration:true,
                        textmessage:'已提交'
                      })
                    }
                    else{
                      wx.showToast({
                        icon:'error',
                        title:'提交失败'
                      })
                    }
                  }
                })
                
              }
              else{
                wx.showToast({
                  icon:'none',
                  title:'请选择'
                })
              }
           }
          
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(option:any) {
      this.setData({
        Aselection:option.Aselection,
        Bselection:option.Bselection,
        Cselection:option.Cselection,
        Dselection:option.Dselection,
        id:option.id,
        result:option.result,
        theme:option.theme,
        title:option.title,
        type:option.type,
        selectedOptions:[]
      })
      const dateObject = new Date(option.time)
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1; // 月份是从 0 开始的，所以需要加 1
      const day = dateObject.getDate();
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();
      const seconds = dateObject.getSeconds();
      const aftertime= year+'-'+month+'-'+(day<10?'0'+day:day)+' '+(hours<10?'0'+hours:hours)+':'+(minutes<10?'0'+minutes:minutes)+':'+(seconds<10?'0'+seconds:seconds);
      // 创建 Date 对象
      const targetDate = new Date(option.time);

      // 获取当前本地时间
      const currentDate = new Date();
      if (targetDate < currentDate) {
        this.setData({
          Isovertime:true,
          time:aftertime
        })
      } else {
       this.setData({
         Isovertime:false,
         time:aftertime
       });
    }
    this.check()
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