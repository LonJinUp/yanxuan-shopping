// pages/mine/mine.js
const app = getApp();
const globalData = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户头像
    UserPic:"",
    UserName:"",
    //点击弹出分享
    ShowShare: false,
  },
  //弹出分享
  ShowShare: function (e) {
    var that = this;
    that.setData({
      ShowShare: true,
    })
  },
  //点击关闭
  HideShare: function (e) {
    var that = this;
    that.setData({
      ShowShare: false
    })
  },
  // 拨打电话
  call:function(){
    wx.makePhoneCall({
      phoneNumber: '18534625325' 
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(globalData)
    //用户头像
    var UserPic = globalData.userInfo.avatarUrl;
    // 用户名字
    var UserName = globalData.userInfo.nickName;
    var that=this;
    that.setData({
      UserPic: UserPic,
      UserName:UserName
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