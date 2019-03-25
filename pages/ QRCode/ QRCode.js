// pages/MyProfessor/MyProfessor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //控制导师没资料时候显示页面
    ProfessorHide: false,
    // 微信号码
    weChat: "27272727",
    //控制上传还是展示
    ShowMsg:false,
    
  },
  //点击重新上传
  Renew:function(){
    let that=this;
    that.setData({
      ShowMsg: true
    })
  },

  //上传图片
  selectImage: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        wx.uploadFile({
          url: "http://localhost/upload", // 你的接口地址
          filePath: tempFilePaths[0],
          name: "image",
          formData: {
            //'user': 'test'
          },
          success: function (res) {
            var data = res.data
            that.setData({ imagePath: data })
          }
        })
      }
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