// pages/class/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧数据
    leftitems: [{ id: "1", name: "美保健妆" }, { id: "2", name: "保保健健" }, { id: "3", name:"男男装男"}],
    //控制左侧active
    curNav: 1,
  },
  //左侧点击处理
   switchRightTab: function (e) {
     // 获取item项的id，和数组的下标值 
     let id = e.target.dataset.id
     // 把点击到的某一项，设为当前index 
     this.setData({
        curNav:id,
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

  },
})