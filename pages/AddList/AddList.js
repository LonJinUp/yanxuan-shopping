// pages/AddList/AddList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleLength:0,
    contentlength:0,
  },
  //清单名称右侧 输入长度
  valuechange:function(e){
   var that=this;
   console.log(e)
   that.setData({
     titleLength: e.detail.value.length
   })
  },
  valuechange2:function(e){
    var that = this;
    console.log(e)
    that.setData({
      contentlength: e.detail.value.length
    })
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