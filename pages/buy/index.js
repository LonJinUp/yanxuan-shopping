Page({

  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth: 180,
    txtStyle:0,
    cartItems: [
      { id: 1, name: '商商品', caption: '副标题', specifications: '规格111', price: '100', quantity: 1 },
      { id: 2, name: '商品2', caption: '副标题', specifications: '规格111', price: '104', quantity: 1 },
      { id: 3, name: '商品3', caption: '副标题', specifications: '规格111', price: '200', quantity: 2 },
      { id: 4, name: '商品4', caption: '副标题', specifications: '规格111', price: '150', quantity: 4 }
    ]
  },
  //减
  minus: function (e) {
    var cartItems = this.data.cartItems
    var index = e.currentTarget.dataset.index
    var quantity = cartItems[index].quantity
    var skuId = cartItems[index].id
    if (quantity > 1) {
      cartItems[index].quantity -= 1
      this.setData({
        cartItems: cartItems
      })
      this.isAllSelect()
      this.selPrice()
      this.selNum()
    }


  },
  //加
  add: function (e) {
    var cartItems = this.data.cartItems
    var index = e.currentTarget.dataset.index
    var quantity = cartItems[index].quantity
    var skuId = cartItems[index].id
    cartItems[index].quantity += 1
    this.setData({
      cartItems: cartItems
    })
    this.isAllSelect()
    this.selPrice()
    this.selNum()

  },
  // 删除
  remove: function (e) {
    console.log(e);
    var cartItems = this.data.cartItems
    var index = e.currentTarget.dataset.index
    var skuId = cartItems[index].id
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: (res) => {
        if (res.confirm) {
          cartItems.splice(index, 1)
          this.setData({
            cartItems: cartItems
          })
          this.isAllSelect()
          this.selPrice()
          this.selNum()
          console.log('用户点击确定');
        } else if (res.cancel) {
          //更新列表的状态
        
          console.log('用户点击取消');
        }
      }
    })

  },
  //选择订单
  isSelect: function (e) {
    var cartItems = this.data.cartItems
    var index = e.currentTarget.dataset.index
    cartItems[index].isSelect = !cartItems[index].isSelect
    this.setData({
      cartItems: cartItems
    })
    this.isAllSelect()
    this.selPrice()
    this.selNum()
  },
  //全选订单
  allSelect: function (e) {
    var cartItems = this.data.cartItems
    var isAllSelect = this.data.isAllSelect
    isAllSelect = !isAllSelect
    if (isAllSelect) {
      for (let i in cartItems) {
        cartItems[i].isSelect = true
      }
    } else {
      for (let i in cartItems) {
        cartItems[i].isSelect = false
      }
    }
    this.setData({
      cartItems: cartItems,
      isAllSelect: isAllSelect
    })
    this.isAllSelect()
    this.selPrice()
    this.selNum()
  },
  //判断是否全选
  isAllSelect() {
    var cartItems = this.data.cartItems
    var isAllSelect = true
    for (let i in cartItems) {
      if (!cartItems[i].isSelect) {
        isAllSelect = false
      }
    }
    this.setData({ isAllSelect: isAllSelect })
  },
  //计算所选数据
  selNum() {
    var selNum = 0
    var se = []
    var cartItems = this.data.cartItems
    for (let i in cartItems) {
      if (cartItems[i].isSelect) {
        selNum += cartItems[i].quantity;
        se += cartItems[i].id;
      }
    };
    console.log(se);
    console.log(selNum)
    this.setData({
      selNum: selNum
    })
  },
  //计算所选价格
  selPrice() {
    var selPrice = 0
    var cartItems = this.data.cartItems
    for (let i in cartItems) {
      if (cartItems[i].isSelect) {
        selPrice += cartItems[i].price * cartItems[i].quantity
      }
    }
    this.setData({
      selPrice: selPrice
    })
  },
  // 下单
  buy: function () {

  },

  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    var that = this
    // initdata(that)
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      console.log(moveX);
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = '';
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var cartItems = this.data.cartItems;
      cartItems[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        cartItems: cartItems
      });
    }
  },

  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var cartItems = this.data.cartItems;
      cartItems[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        cartItems: cartItems
      });
    }
  },
  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initEleWidth()
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
    //给购物车列表添加选中key
    var cartItems = this.data.cartItems
    for (let i in cartItems) {
      cartItems[i].isSelect = false
    }
    this.setData({
      cartItems: cartItems
    })
    this.isAllSelect()
    this.selPrice()
    this.selNum()
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
    return util.transmit()
  }
})