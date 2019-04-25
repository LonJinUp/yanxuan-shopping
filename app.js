//app.js
var app = getApp();
// var wxh = require('../../utils/wxh.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  
  },
  globalData: {
    UserLogo:"",
    UserName:"",
    routineStyle: '#ffffff',
    uid: null,
    openPages: '',
    spid: 0,
    urlImages: '',
    openid:'',
    url: 'https://vc.extouz.com'
  },
 

  setUserInfo: function () {
    var that = this;
    console.log(that.globalData)
    if (that.globalData.uid == null) {//是否存在用户信息，如果不存在跳转到首页
      wx.showToast({
        title: '用户信息获取失败!',
        icon: 'none',
        duration: 1500,
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/load/load',
        })
      }, 1500)
    }
  },
})