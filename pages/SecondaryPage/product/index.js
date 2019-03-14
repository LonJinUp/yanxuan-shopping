// pages/SecondaryPage/product/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //已选择、未选择
    choose:true,
    // 查看更多；
    MoreNum:"3",
    MoreText:"更多参数",
    //模拟数据
   list:{
    "name": "商品介绍",
    "links": [
      {
        "name": "Google",
        "val":"年后"
      },
      {
        "name": "Baidu",
        "val": "年后"
      },
      {
        "name": "Baidu",
        "val": "年后"
      },
      {
        "name": "Baidu",
        "val": "年后"
      },
      {
        "name": "SoSo",
        "val": "年后"
      }
    ]
  },

  },
  /**
   * 生命周期函数--监听页面加载
   */

  more:function(e){
    var NowMore=e.target.dataset.more;
    var that = this;
    if (NowMore>3){
      that.setData({
        MoreNum: "3",
        MoreText: "更多参数"
      })
    }else{
      that.setData({
        MoreNum: "30",
        MoreText: "点击收起"
      })
    }
   
  },
  onLoad: function (e) {
   
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