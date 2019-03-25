var app = getApp();
Page({
  data: {
    logo: '',
    name: '',
    url: app.globalData.url,
    invite_uid:""

  },
  onLoad: function (options) {
    var that = this;
    that.getEnterLogo();
    app.setBarColor();
  },
  getEnterLogo: function () {
    var that = this;
    wx.request({
      url: app.globalData.url + '/routine/login/get_enter_logo',
      method: 'post',
      dataType  : 'json',
      success: function (res) {
        that.setData({
          logo: res.data.data.site_logo,
          name: res.data.data.site_name
        })
      }
    })
  },
  
  onLoad: function (options) {
    var that=this;
    that.setData({
      invite_uid: options.invite_uid
    })

  },
  //获取用户信息并且授权
  getUserInfo: function (e) {
    var invite_uid = this.data.invite_uid;
    console.log(invite_uid)
    var userInfo = e.detail.userInfo;
    userInfo.spid = app.globalData.spid;
    userInfo.invite_uid = invite_uid
    console.log(userInfo)
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          userInfo.code = res.code;
          userInfo.invite_uid
          wx.request({
            url: app.globalData.url + '/routine/login/index',
            method: 'get',
            dataType  : 'json',
            data: {
              info: userInfo,              
            },
            success: function (res) {
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