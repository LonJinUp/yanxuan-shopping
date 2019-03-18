// pages/SecondaryPage/AllOrders/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //倒计时
    clock: ""
  },
  //倒计时
  time: function (total_micro_second) {
    function count_down(that) {
      // 渲染倒计时时钟
      that.setData({
        clock: date_format(total_micro_second)
      });

      if (total_micro_second <= 0) {
        that.setData({
          clock: "已经截止"
        });
        // timeout则跳出递归
        return;
      }
      setTimeout(function () {
        // 放在最后--
        total_micro_second -= 10;
        count_down(that);
      }, 10)
    }

    // 时间格式化输出，如03:25:19 86。每10ms都会调用一次
    function date_format(micro_second) {
      // 秒数
      var second = Math.floor(micro_second / 1000);
      // 小时位
      var hr = Math.floor(second / 3600);
      // 分钟位
      var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
      // 秒位
      var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
      // 毫秒位，保留2位
      var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));

      // return hr + ":" + min + ":" + sec + ":" + micro_sec;
      return min + "分" + sec + "秒"
    }

    // 位数不足补零
    function fill_zero_prefix(num) {
      return num < 10 ? "0" + num : num
    }
    count_down(this);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //传入毫秒
    var total_micro_second = 1200000;
    /* 毫秒级倒计时 */
    this.time(total_micro_second);
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