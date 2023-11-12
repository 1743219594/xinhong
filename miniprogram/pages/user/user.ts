
// pages/user/user.ts
export{}
 const app=getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
       identity:'学生',
        userinfo:{
          avatarUrl:'../../image/avator.png',
          nickname:'',
          studentid:'',
          phonenumber:'',
          isboss:false,
          integral:0,
          role:''
        },
        hasmessage:false,
        hasuserinfo:false,
        menuBot:0,
        heighted:0,
        widthed:0,
        nav:0,
        navHeight:0,
        tabbarheight:0,
        screenheight:0,
        windowheight:0,
        flag:true,
        isselected:true,
        content:"获取",
        time:60,
        testnumber:'1111',
        //用户输入的验证码
        inputnum:'',
        //单选框
        Ischecked:true,
        isboss:false,
        role: 's',
    },
    radioChange: function (e:any) {
      this.setData({
        role: e.detail.value,
      });
    },
    tomessage(){
       wx.switchTab({
           url:'../suggestion/suggestion'
       })
    },
 // 复选框状态切换函数
 toggleCheckbox: function () {
  var currentFlag = this.data.isselected;

  this.setData({
    isselected: !currentFlag
  });

},
  login(){        
    const app=getApp()
      /* 获取用户的openid（唯一标识符) */
      wx.login({
        success:(res)=>{
          if (res.code) {
            //发起网络请求
            wx.request({
                url:app.globalData.url+'api/getcode',
                header:{
                  'content-type':'application/x-www-form-urlencoded'
              },
              method:'POST',
              data:{
                code:res.code
              },
              success:(res)=>{
                wx.setStorageSync('openid',res.data.openid);
                
                   /* 获取openid后在数据库查询是否存在 */
                   wx.request({
                       method:'POST',
                       url:app.globalData.url+'api/login',
                       data:{
                           openid:res.data.valueOf().openid
                       },
                       header:{
                           'content-type':'application/x-www-form-urlencoded'
                       },
                       success:(res:any)=>{  
                           this.setData({
                               hasmessage:true
                           })
                           if(res.data.status==202)
                           { 
                           
                             return wx.showModal({
                               content:'选择头像时请不要选择取消',
                               showCancel:false

                             })
                           }
                           /* 存在该用户 */
                           if(res.data.status==200){
                              this.setData({
                                hasuserinfo:true,
                               userinfo:{
                                   avatarUrl:res.data.avator,
                                   nickname:res.data.nickname,
                                   phonenumber:res.data.phonenumber,
                                   studentid:res.data.studentid,
                                   isboss:res.data.Isboss,
                                   integral:res.data.integral,
                                   role:res.data.role
                               }
                             })
                             if(res.data.Isboss=='1')
                             {
                                 this.setData({
                                     isboss:true,
                                     identity:'管理员'
                                 })
                             }
                             else{
                              this.setData({
                                isboss:false,
                                identity:res.data.role=='s'?'学生':'教师'
                            })
                             }
                             
                             wx.setStorageSync('userinfo',this.data.userinfo)
                         
                             
                           }
                       },
                       fail:()=>{
                        wx.showToast({
                            title:'出错了',
                            icon:'error'
                        })
                          
                           
                       }
                   })
                 },
                 fail:(res:any)=>{
                     wx.showToast({
                         title:'请求失败',
                         icon:'error'
                     })
                 }
            })
          } 
            
          
        
        
        }
      })
    },
    //注册时选择头像
    getmessage(event:any){
 
      
    this.setData({
      userinfo:{
        avatarUrl:event.detail.avatarUrl,
        nickname:this.data.userinfo.nickname,
        phonenumber:this.data.userinfo.phonenumber,
        studentid:this.data.userinfo.studentid,
        isboss:false,
        integral:0,
        role:this.data.role
      }
    })
    },
    //注册时获取昵称
    getnickname(event:any){
       this.setData({
         userinfo:{
           avatarUrl:this.data.userinfo.avatarUrl,
           nickname:event.detail.value,
           phonenumber:this.data.userinfo.phonenumber,
           studentid:this.data.userinfo.studentid,
           isboss:false,
           integral:0,
           role:this.data.role
         }
       })
    },
    //注册时获取学号
    getstudentid(event:any){
        this.setData({
            userinfo:{
              avatarUrl:this.data.userinfo.avatarUrl,
              nickname:this.data.userinfo.nickname,
              phonenumber:this.data.userinfo.phonenumber,
              studentid:event.detail.value,
              isboss:false,
              integral:0,
              role:this.data.role
            }
          })
    },
    //注册时获取手机号
    getphonenumber(event:any){
        this.setData({
            userinfo:{
              avatarUrl:this.data.userinfo.avatarUrl,
              nickname:this.data.userinfo.nickname,
              phonenumber:event.detail.value,
              studentid:this.data.userinfo.studentid,
              isboss:false,
              integral:0,
              role:this.data.role
            }
          })
    },
    //获取输入的验证码
    gettextnumber(event:any){
        this.setData({
            inputnum:event.detail.value
          })
    },
    //获取验证码
    getnumber(){
      if(this.data.flag)
      {  
      var timeout = setInterval(() => {
            if(this.data.time>0)
            {
                this.setData({
                    content:this.data.time+"秒",
                    time:this.data.time-1,
                    flag:false
                })
            }
            else{
              clearInterval(timeout);
              this.setData({
                content:"获取",
                  flag:true,
                  time:60
              })
            }

        }, 1000);
           
      }
    },
    /* 保存用户的头像和昵称 */
    serve(){
      if(this.data.userinfo.avatarUrl!='../../image/avator.png'&&this.data.userinfo.avatarUrl!=''&&this.data.userinfo.nickname!=''&&this.data.userinfo.phonenumber!=''&&this.data.userinfo.studentid!=''&&this.data.Ischecked&&this.data.testnumber==this.data.inputnum&&this.data.isselected)
      {
       if(this.data.role=='s')
      {
        wx.request({
          method:'POST',
                url:app.globalData.url+'api/test',
                header:{
                  'content-type':'application/x-www-form-urlencoded'
              },
            data:{
                studentid:this.data.userinfo.studentid,
                phonenumber:this.data.userinfo.phonenumber
            },
              success:(res:any)=>{
                  if(res.data.status==200)
                  {
                      var open_id=wx.getStorageSync('openid')
                      wx.uploadFile({
                        url:app.globalData.url+'api/avator',
                        name:'avator',
                        filePath:this.data.userinfo.avatarUrl,
                        formData:{
                            openid:open_id,
                            nick_name:this.data.userinfo.nickname,
                            phonenumber:this.data.userinfo.phonenumber,
                            studentid:this.data.userinfo.studentid,
                            role:this.data.role
                        },
                        header:{
                            'content-type':'application/x-www-form-urlencoded'
                        },
                        fail:(res)=>{
                        
                          wx.showToast({
                              title:'错误：'+res,
                              icon:"error"
                          })
                        },
                        success:(res:any)=>{
                          
                            if(JSON.parse(res.data).status==201)
                            {
                                wx.showToast({
                                    title:'注册失败',
                                    icon:'none'
                                })
                            }else if(JSON.parse(res.data).status==200)
                            { 
                                wx.request({
                                    method:'POST',
                                    url:app.globalData.url+'api/login',
                                    data:{
                                        openid:wx.getStorageSync('openid')
                                    },
                                    header:{
                                        'content-type':'application/x-www-form-urlencoded'
                                    },
                                    success:(res:any)=>{
                                        this.setData({
                                          userinfo:{
                                            avatarUrl:res.data.avator,
                                            nickname:this.data.userinfo.nickname,
                                            phonenumber:this.data.userinfo.phonenumber,
                                            studentid:this.data.userinfo.studentid,
                                            isboss:res.data.Isboss,
                                            integral:res.data.integral,
                                            role:res.data.role
                                          },
                                          hasuserinfo:true
                                        },()=>{wx.setStorageSync('userinfo',this.data.userinfo)
                                        this.setData({
                                          identity:'学生'
                                        })
                                     })
                                        
                                          wx.showToast({
                                              title:'注册成功',
                                              icon:'success'
                                          })
                                    }
                                })
                                
                            }
                            else if(JSON.parse(res.data).status==202)
                            {
                                wx.showToast({
                                    title:'该学号已注册',
                                    icon:'none'
                                    
                                })
                            }
                        }
                    })
                  
                  }
                 else{
                     wx.showToast({
                       title:'学号和手机号不匹配',
                       icon:'none'
                     })
                 }
               
              },
          
      })
      }
      else{
        wx.request({
          method:'POST',
                url:app.globalData.url+'api/teacher_test',
                header:{
                  'content-type':'application/x-www-form-urlencoded'
              },
            data:{
                studentid:this.data.userinfo.studentid,
                phonenumber:this.data.userinfo.phonenumber
            },
              success:(res:any)=>{
                  
                  
                  if(res.data.status==200)
                  {
                      var open_id=wx.getStorageSync('openid')
                      wx.uploadFile({
                          url:app.globalData.url+'api/avator',
                          name:'avator',
                          filePath:this.data.userinfo.avatarUrl,
                          formData:{
                              openid:open_id,
                              nick_name:this.data.userinfo.nickname,
                              phonenumber:this.data.userinfo.phonenumber,
                              studentid:this.data.userinfo.studentid,
                              role:this.data.role
                          },
                          header:{
                              'content-type':'application/x-www-form-urlencoded'
                          },
                          fail:(res)=>{
                          
                            wx.showToast({
                                title:'错误：'+res,
                                icon:"error"
                            })
                          },
                          success:(res:any)=>{
                            
                              if(JSON.parse(res.data).status==201)
                              {
                                  wx.showToast({
                                      title:'注册失败',
                                      icon:'none'
                                  })
                              }else if(JSON.parse(res.data).status==200)
                              { 
                                  wx.request({
                                      method:'POST',
                                      url:app.globalData.url+'api/login',
                                      data:{
                                          openid:wx.getStorageSync('openid')
                                      },
                                      header:{
                                          'content-type':'application/x-www-form-urlencoded'
                                      },
                                      success:(res:any)=>{
                                          this.setData({
                                            userinfo:{
                                              avatarUrl:res.data.avator,
                                              nickname:this.data.userinfo.nickname,
                                              phonenumber:this.data.userinfo.phonenumber,
                                              studentid:this.data.userinfo.studentid,
                                              isboss:res.data.Isboss,
                                              integral:res.data.integral,
                                              role:res.data.role
                                            },
                                            hasuserinfo:true
                                          },()=>{wx.setStorageSync('userinfo',this.data.userinfo)
                                          this.setData({
                                            identity:'教师'
                                          })})
                                          
                                            wx.showToast({
                                                title:'注册成功',
                                                icon:'success'
                                            })
                                      }
                                  })
                                  
                              }
                              else if(JSON.parse(res.data).status==202)
                              {
                                  wx.showToast({
                                      title:'该学号已注册',
                                      icon:'none'
                                      
                                  })
                              }
                          }
                      })
                  
                  }
                 else{
                     wx.showToast({
                       title:'学号和手机号不匹配',
                       icon:'none'
                     })
                 }
               
              },
          
      })
      }
        
       
      }
      else{
        wx.showToast({
          title:'信息填写不全',
          icon:'none'
        })
      }
    },
    Administrators(){
        wx.navigateTo({
            url:'../check/check'
          })
    },
   check(){
    wx.navigateTo({
      url:'../message/message'
    })
   },
  /* 退出登录 */
  loginout(){
    wx.showModal({
      content:'确定退出登录吗？',
      success:(res)=>{
        if(res.confirm)
        {   wx.clearStorageSync()
         this.setData({
           hasuserinfo:false,
           hasmessage:false,
           userinfo:{
             avatarUrl:'../../image/avator.png',
             nickname:'',
             studentid:'',
             phonenumber:'',
             isboss:false,
             integral:0,
             role:''
           }
         })
       }
      
      }
    })
     },
     
     preview(){
       wx.previewImage({
         current:this.data.userinfo.avatarUrl,
         urls:[this.data.userinfo.avatarUrl]
       })
     },
     show(){
      wx.navigateTo({
          url:'../about/about'
      })
     },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.setData({
            navHeight:app.globalData.menuHeight,
            menuBot:app.globalData.menuBot,
            widthed:app.globalData.windowWidth,
            nav:app.globalData.nav,
            heighted:app.globalData.windowheight,
           tabbarheight:app.globalData.tabbarheight,
           screenheight:app.globalData.screenheight,
           windowheight:app.globalData.windowheight
        })
         if(wx.getStorageSync('userinfo'))
         {
           this.setData({
             hasuserinfo:true,
             userinfo:wx.getStorageSync('userinfo')
           })
           if(wx.getStorageSync('userinfo').isboss=='1')
           {
               this.setData({
                   identity:'管理员',
                   isboss:true
               })
           }
           else{
             this.setData({
               identity:wx.getStorageSync('userinfo').role=='s'?'学生':'教师'
             })
           }
           
           
         };
        
        
         
         
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