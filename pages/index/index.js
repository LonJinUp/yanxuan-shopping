// pages/index/index.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //公告列表
    msgList: [{
        title: "恭喜张总拿下兰博基尼五元优惠券",
        url: "dhjsdhs"
      },
      {
        title: "恭喜小博喜提和谐一号",
        url: "dhjsdhs"
      },
    ],
    // 倒计时
    clock:"",
    //爆款
    goods:[
      { pic: "../../images/goods.png", name:"中云中云寒冰中云寒冰中云寒冰寒冰",money:"469",makemoney:"79"},
      { pic: "../../images/goods.png", name: "中云寒冰", money: "469", makemoney: "79"},
      { pic: "../../images/goods.png", name: "中云寒冰", money: "469", makemoney: "79" },
      { pic: "../../images/goods.png", name: "中云寒冰", money: "469", makemoney: "79" },
    ],
    //商品
    commodity:[
      { pic: "../../images/goods.png", name: "中云中云的获得更多更多更好的刚刚打过电话", money:"469",makemoney:"79",Purchased:"234561"},
      { pic: "../../images/goods.png", name: "中云寒冰", money: "469", makemoney: "79",Purchased:"234561"},
      { pic: "../../images/goods.png", name: "中云寒冰", money: "469", makemoney: "79",Purchased:"234561" },
      { pic: "../../images/goods.png", name: "中云寒冰", money: "469", makemoney: "79",Purchased:"234561" },
    ]
  
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var total_micro_second = 36 * 60 * 60 * 1000;

    /* 毫秒级倒计时 */
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

      return hr + ":" + min + ":" + sec + ":" + micro_sec;
    }

    // 位数不足补零
    function fill_zero_prefix(num) {
      return num < 10 ? "0" + num : num
    }
    count_down(this);
  },

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function() {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function() {

},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function() {

},


/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function() {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function() {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function() {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function() {

},
 

})
