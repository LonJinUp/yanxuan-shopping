// pages/SecondaryPage/product/index.js
const app = getApp();
// 登陆js
var Login = require('../../../public/js/login2.js');
//缓存
var Storage = require('../../../public/js/wCache.js');
const globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //已选择、未选择
    choose: true,
    // 查看更多；
    MoreNum: "3",
    MoreText: "更多参数",
    //点击弹出购买选择
    ShowShare: false,
    //初始购买数量
    BuyNumber: "1",
    //banner图
    banner: "",
    //商品信息
    storeInfo: "",
    guige: [{
        id: 1,
        name: 'M'
      },
      {
        id: 2,
        name: 'L'
      },
      {
        id: 3,
        name: 'X'
      },
      {
        id: 4,
        name: 'S'
      }
    ],
    color: [{
        id: 5,
        name: '红'
      },
      {
        id: 6,
        name: '橙'
      },
      {
        id: 7,
        name: '黄'
      },
      {
        id: 8,
        name: '绿'
      }
    ],

    //模拟数据
    list: {
      "name": "商品介绍",
      "links": [{
          "name": "Google",
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
  guige: function (e) {
    this.setData({
      gid: e.currentTarget.dataset.index,
      gindex: e.currentTarget.dataset.current,
    })
  },
  color: function (e) {
    this.setData({
      cid: e.currentTarget.dataset.index,
      cindex: e.currentTarget.dataset.current,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  // 更多参数
  more: function(e) {
    var NowMore = e.target.dataset.more;
    var that = this;
    if (NowMore > 3) {
      that.setData({
        MoreNum: "3",
        MoreText: "更多参数"
      })
    } else {
      that.setData({
        MoreNum: "30",
        MoreText: "点击收起"
      })
    }

  },
  // 尺码选择
  //点击关闭
  HideShare: function(e) {
    var that = this;
    that.setData({
      ShowShare: false
    })
  },
  ShowShare: function(e) {
    console.log(e);
    var that = this;
    that.setData({
      ShowShare: true,
    })
  },
  //减
  minus: function(e) {
    if (this.data.BuyNumber > 1) {
      let num = parseInt(this.data.BuyNumber) - 1;
      var that = this;
      that.setData({
        BuyNumber: num
      })
    }

  },
  //加
  add: function(e) {
    let num = parseInt(this.data.BuyNumber) + 1;
    var that = this;
    that.setData({
      BuyNumber: num++
    })
  },



  onLoad: function(options) {
    Login.denglu(options);

    this.product(options);


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
  //商品详情
  product: function(options, product_id) {

    var that = this;
    globalData.product_id = options.id;
    var product_id = globalData.product_id;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
    });
    wx.request({
      url: Login.url + '/routine/auth_api/details',
      data: {
        id: product_id
      },
      method: "POST",
      dataType: JSON,
      header: "application / json",
      success: function(res) {
        var res = JSON.parse(res.data);
        console.log(res.data.productValue)
        wx.hideLoading();
        if (res.code == 200) {
          that.setData({
            banner: res.data.storeInfo.slider_image,
            storeInfo: res.data.storeInfo,
            productValue: res.data.productValue
          })
        } else {
          console.log('加载失败')
        }
      },
      fail: function() {

      },

    })
  }
})