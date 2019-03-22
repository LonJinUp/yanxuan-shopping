var Storage = require('wCache.js');
var url = 'https://vc.extouz.com';
const globalData = getApp().globalData;
function denglu(options) {
  //获取邀请参数
  var id = options.id;
  console.log(id)
  //储存用户UID
  var uid = Storage.get("uid");
  wx.getSetting({
    success: res => {
      console.log(res)
      if (uid != "") {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.login({
            success: (res) => {
              console.log('login返回：', res)
              var code = res.code
              if (res.code) {
                //发起请求
                wx.getUserInfo({
                  success: (res) => {
                    if (res.userInfo) {
                      //将userInfo存入全局数据
                      globalData.userInfo = res.userInfo;

                    }
                  },
                  fail: (res) => {
                    console.log(res)
                  }
                })
              }
            },
          })
        } else {
          if (id != undefined) {
            wx.navigateTo({
              url: '../../login/login' + id
            })
          } else {
            wx.navigateTo({
              url: '../../login/login'
            })
          }
        }
      } else {
        if (id != undefined) {
          wx.navigateTo({
            url: '../../login/login' + id
          })
        } else {
          wx.navigateTo({
            url: '../../login/login'
          })
        }
      }
    }
  })
}

module.exports = {
  denglu: denglu,
  url: url,
}