// pages/index/index.js
//获取应用实例

const app = getApp();
const globalData = getApp().globalData;
// 登陆js
var Login = require('../../public/js/login.js');
//缓存
var Storage = require('../../public/js/wCache.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //限时秒杀
    Spike: "",
    //公告列表
    msgList: "",
    //轮播图
    banner: "",
    // 倒计时
    clock: 0,
    //本周爆款
    hot_product: "",


    //商品
    commodity: [{
        pic: "../../images/goods.png",
        name: "中云中云的获得更多更多更好的刚刚打过电话",
        money: "469",
        makemoney: "79",
        Purchased: "234561"
      },
      {
        pic: "../../images/goods.png",
        name: "中云寒冰",
        money: "469",
        makemoney: "79",
        Purchased: "234561"
      },
      {
        pic: "../../images/goods.png",
        name: "中云寒冰",
        money: "469",
        makemoney: "79",
        Purchased: "234561"
      },
      {
        pic: "../../images/goods.png",
        name: "中云寒冰",
        money: "469",
        makemoney: "79",
        Purchased: "234561"
      },
    ]

  },

  //倒计时
  time: function(total_micro_second) {
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
      setTimeout(function() {
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
      var sec = fill_zero_prefix((second - hr * 3600 - min * 60)); // equal to => var sec = second % 60;
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    Login.denglu(options)


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
    //首页接口
    this.IndexData();
    this.GoodStuff()

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

  //首页数据
  IndexData: function() {
    let uid = globalData.uid;
    console.log(globalData.uid);
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
    });
    wx.request({
      url: Login.url + '/routine/auth_api/index',
      data:{uid:uid},
      method: "GET",
      dataType: JSON,
      header: "application / json",
      success: function(res) {
        var res = JSON.parse(res.data);
        wx.hideLoading();
        if (res.code == 200) {
          let spike = res.data.storeSeckill[0];
          let nowtime = Math.round(new Date().getTime() / 1000).toString();
          let stop = spike.stop_time;
          var now = stop - nowtime;
          var now2 = now * 1000;
          /* 毫秒级倒计时 */
          that.time(now2);
          that.setData({
            Spike: res.data.storeSeckill[0],
            msgList: res.data.roll_news,
            banner: res.data.banner,
            hot_product: res.data.hot_product,
            clock: now2,
          })
        } else {

        }

      },
      fail: function() {

      },

    })
  },

  //严选好货
  GoodStuff: function() {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
    });
    wx.request({
      url: Login.url + '/routine/auth_api/getBestProduct',
      data: Storage.get("uid"),
      method: "GET",
      dataType: JSON,
      header: "application / json",
      success: function(res) {
        var res = JSON.parse(res.data);
        wx.hideLoading();
        if (res.code == 200) {
          
        }else{
          console.log('加载失败')
        }
      },
      fail: function() {

      },

    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


})