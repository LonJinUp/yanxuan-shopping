// pages/AddList/AddList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleLength:0,
    contentlength:0,
    TitleName:"",
    ContentName:"",
  },
  //清单名称右侧 输入长度
  valuechange:function(e){
   var that=this;
   that.setData({
     TitleName: e.detail.value,
     titleLength: e.detail.value.length
   })
  },
  valuechange2:function(e){
    var that = this;
    that.setData({
      ContentName: e.detail.value,
      contentlength: e.detail.value.length
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setUserInfo();
  },
  //保存清单
  SaveList:function(){
    var that = this;
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    wx.request({
      url: app.globalData.url + '/routine/auth_api/crete_inventory?uid=' + app.globalData.uid,
      data: {
        theme: that.data.TitleName,
        describe: that.data.ContentName,
      },
      method: 'POST',
      header: header,
      success: function (res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: "添加成功",
            icon: 'none',
            duration: 2000
          })
          wx.navigateBack({
            url:"../list/list"
          })
        } else {
          wx.showToast({
            title:"添加失败",
            icon: 'none',
            duration: 2000
          })
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