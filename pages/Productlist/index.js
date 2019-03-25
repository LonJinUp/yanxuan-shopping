// pages/SecondaryPage/Productlist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //模拟商品列表
    list:[{name:"匡威经典款帆布鞋",money:"200",money2:"699",zhuan:"10",pic:"../../images/shanchu/list-pic.png"},
      { name: "匡威经典款帆布鞋", money: "100", money2: "699", zhuan: "20",pic:"../../images/shanchu/list-pic.png" },
      { name: "匡威经典款帆布鞋", money: "800", money2: "699", zhuan: "50",pic:"../../images/shanchu/list-pic.png" },
      { name: "匡威经典款帆布鞋", money: "900", money2: "699", zhuan: "70",pic:"../../images/shanchu/list-pic.png" },
      { name: "匡威经典款帆布鞋", money: "400", money2: "699", zhuan: "90",pic:"../../images/shanchu/list-pic.png" },
    ],
    //商品
    commodity: [
      { pic: "../../images/goods.png", name: "中云中云的获得更多更多更好的刚刚打过电话", money: "469", makemoney: "79", Purchased: "234561" },
      { pic: "../../images/goods.png", name: "中云寒冰", money: "469", makemoney: "79", Purchased: "234561" },
      { pic: "../../images/goods.png", name: "中云寒冰", money: "469", makemoney: "79", Purchased: "234561" },
      { pic: "../../images/goods.png", name: "中云寒冰", money: "469", makemoney: "79", Purchased: "234561" },
    ],
    //切换列表样式
    ChangeList:true,
    showModal: false,
    //点击弹出分享
    ShowShare:false,
    //分享赚金额
    ShareMoney:"",
    //点击筛选
    filter:false

  },
  //改变列表布局
  ChangeList:function(e){
     let changecurrent=e.currentTarget.dataset.change;
      var that=this;
      that.setData({
        ChangeList:!changecurrent
      })
  },
  //弹出分享
  ShowShare:function(e){
    console.log(e);
    var that=this;
    that.setData({
      ShowShare:true,
      ShareMoney: e.currentTarget.dataset.money
    })
  },
  //点击关闭
  HideShare:function (e) {
    var that = this;
    that.setData({
      ShowShare: false
    })
  },
  //筛选
  ShowFilter:function(e){
    console.log(e);
    var that=this;
    that.setData({
      filter: true
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