/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    navHeight:Number,
    nav:Number,
    menuLeft:Number,
    menuHeight:Number,
    menuBot:Number,
    windowWidth:Number
    userInfo?: WechatMiniprogram.UserInfo,
    url:String,
    windowheight:Number,
    tabbarheight:Number,
    screenheight:Number,
    token:String,

  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}