// app.ts
export{}
const app=getApp()
App<IAppOption>({
  globalData: {
    navHeight:0,
    nav:0,
    menuLeft:0,
    menuHeight:0,
    menuBot:0,
    windowWidth:0,
    windowheight:0,
   url:'http://192.168.13.48:8080/',
   tabbarheight:0,
   screenheight:0,
   token:'',
  },
  onLaunch() {
    // 展示本地存储能力
    let menuButtonObject = wx.getMenuButtonBoundingClientRect()
    // 获取设备信息
    wx.getSystemInfo({
      success: res => {
        // 整个导航栏的高度
        let navHeight = menuButtonObject.top + menuButtonObject.height + (menuButtonObject.top - res.statusBarHeight)*2
        // 导航栏的高度
        let nav = navHeight - res.statusBarHeight
 
        // 挂载到全区变量 globalData 上
        this.globalData.navHeight = navHeight
        this.globalData.nav = nav
 
        // 胶囊与左边的距离
        this.globalData.menuLeft = menuButtonObject.left
        // 胶囊的高度
        this.globalData.menuHeight = menuButtonObject.height
        // 胶囊距离顶部的高度
        this.globalData.menuBot = menuButtonObject.top
        // 整个设备的宽度
        this.globalData.windowWidth = res.windowWidth
       
        this.globalData.windowheight=res.windowHeight-res.statusBarHeight
        const systemInfo = wx.getSystemInfoSync(); // 获取设备信息
        const tabBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - systemInfo.statusBarHeight
        this.globalData.tabbarheight=tabBarHeight
        this.globalData.screenheight=res.screenHeight
        
      },
      fail: err => {
        console.log(err)
      }
    })
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
  

   
  },
})