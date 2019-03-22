//全局存数据
const globalData = getApp().globalData;
//引用存缓存插件
var Storage = require('../../public/js/wCache.js');
// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  //点击授权按钮函数
  getUserInfo: (res) => {
    console.log(res)
    if (res.detail.userInfo) {
      var userInfo = res.detail.userInfo
      wx.login({
        success: (res) => {
          console.log('login返回：', res)
          var code = res.code;
          globalData.code = res.code
          if (res.code) {
            //请求用户信息
            wx.getUserInfo({
              success: (res) => {
                if (res.userInfo) {
                  globalData.userInfo = res.userInfo;
                  var rawData = res.rawData;
                  var signature = res.signature;
                  var encryptedData = res.encryptedData;
                  var iv = res.iv;
                  //向后端发送code与用户信息
                  wx.request({
                    url: 'https://vc.extouz.com/routine/login/index',
                    data: {
                      code: globalData.code,
                      "rawData": rawData,
                      "signature": signature,
                      'iv': iv,
                      'encryptedData': encryptedData
                    },
                    success:function(res){
                      //存token
                      var uid = res.data.data.uid;
                      globalData.uid = res.data.data.uid;
                      Storage.put('uid', uid,1728000);
                      //转跳上一页
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  })
                }
              },
              fail: (res) => {
                wx.showModal({
                  title: '授权失败',
                  content: '如需正常使用小程序功能，打开通知功能！再返回授权',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                      wx.openSetting({
                        success: function success(res) {
                          console.log('openSetting success', res.authSetting);
                        }
                      });
                    }
                  }
                })
              }
            })
          }
        },
      })
    }else{
      wx.showModal({
        title: '用户未授权',
        content: '如需正常使用小程序功能，请返回授权！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            // wx.openSetting({
            //   success: function success(res) {
            //     console.log('openSetting success', res.authSetting);
            //   }
            // });
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})