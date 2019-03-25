// pages/SecondaryPage/OrderDetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //选项卡
    currentTab: 0,
    //优惠券
    couponData:[
      { id: 0, DescriptionShow: false },
      { id: 1, DescriptionShow:false},
    ]
  },
  //查看优惠券详情
  Description:function(e){
    console.log(e);
    let show = e.currentTarget.dataset.descriptionshow
    let index = e.currentTarget.dataset.index
    this.data.couponData[index].DescriptionShow = !this.data.couponData[index].DescriptionShow
    this.setData({
      couponData: this.data.couponData
    })
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
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