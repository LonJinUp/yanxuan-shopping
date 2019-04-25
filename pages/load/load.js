var app = getApp();

Page({
  data: {
    logo: '',
    name: '',
    url: app.globalData.url,
  },
  onLoad: function (options) {
    var that = this;
  
  },
 
  //获取用户信息并且授权
  getUserInfo: function (e) {
    var userInfo = e.detail.userInfo;
    userInfo.spid = app.globalData.spid;
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          userInfo.code = res.code;
          wx.request({
            url: app.globalData.url + '/routine/login/index',
            method: 'post',
            dataType  : 'json',
            data: {
              info: userInfo,              
            },
            success: function (res) {
              app.globalData.data=res.data
              app.globalData.UserName = res.data.nickName;
              app.globalData.UserLogo = res.data.avatarUrl;
              app.globalData.uid = res.data.data.uid;
              app.globalData.openid = res.data.data.routine_openid;
              if (app.globalData.openPages != '' && app.globalData.openPages != undefined) {//跳转到指定页面
                wx.navigateTo({
                  url: app.globalData.openPages
                })
              } else {//跳转到首页
                if (res.data.data.page) {
                  wx.navigateTo({
                    url: res.data.data.page
                  })
                } else {
                  wx.reLaunch({
                    url: '/pages/index/index'
                  })
                }
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
})