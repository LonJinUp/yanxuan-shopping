// pages/CheckIn/CheckIn.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setUserInfo();
    this.CheckStatus();
  },

//签到
  check:function(e){
      var that = this;
      console.log(e);
      var header = {
        'content-type': 'application/x-www-form-urlencoded',
      };
      wx.request({
        url: app.globalData.url + '/routine/auth_api/user_sign?uid=' + app.globalData.uid,
        method: 'GET',
        header: header,
        success: function (res) {
          if (res.data.code == 200) {
            wx.showToast({
              title: '签到成功',
              icon: 'success',
              duration: 2000
            });
            that.CheckStatus();
          } else {
            wx.showToast({
              title:"已签到",
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
  },

  CheckStatus:function(){
    var that = this;
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    wx.request({
      url: app.globalData.url + '/routine/auth_api/sign_in?uid=' + app.globalData.uid,
      method: 'post',
      header: header,
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            sign_count: res.data.data.sign_count,
            is_sign: res.data.data.is_sign 
          })
        } else {
          console.log(2);
        }
      }
    })
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