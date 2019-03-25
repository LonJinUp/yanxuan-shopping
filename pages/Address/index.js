// pages/SecondaryPage/ Address/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //控制没地址时候显示
    Address:true,
    //添加地址
    Add_Address:false,
    //派送日期选择
    index: '0',
    array: ['任意时间', '工作日', '非工作日',],
    //地区选择
    region: ['北京', '北京市', '朝阳区'],
    customItem: '全部'
  },
  //派送时间
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //地址选择
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  
  //添加地址
  Add_Address:function(e){
    var that=this;
    that.setData({
      Add_Address:true
    })
  },

  //保存地址
  SaveAddress:function(e){
    var that = this;
    that.setData({
      Add_Address: false
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