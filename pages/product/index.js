// pages/SecondaryPage/product/index.js
const app = getApp();
//缓存
var Storage = require('../../public/js/wCache.js');
var WxParse = require('../../wxParse/wxParse.js');
var wxh = require('../../utils/wxh.js');
const globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeImage: '',//海报产品图
    PromotionCode: '',//二维码图片
    canvasStatus: false,//海报绘图标签
    posterImage: '',//海报路径
    posterImageStatus: false,
    attrName: '',
    attr: '选择商品属性',
    attrValue: '',
    url: app.globalData.urlImages,
    storeInfo: [],
    storeKeyWord: [],
    similarity: [],
    productAttr: [],
    productValue: [],
    productSelect: [
      { image: "" },
      { store_name: "" },
      { price: 0 },
      { unique: "" },
      { stock: 0 },
    ],
    reply: [],
    replyCount: 0,
    description: '',
    collect: false,//是否收藏
    indicatorDots: true,//是否显示面板指示点;
    autoplay: true,//是否自动播放;
    interval: 3000,//动画间隔的时间;
    duration: 500,//动画播放的时长;
    indicatorColor: "rgba(51, 51, 51, .3)",
    indicatorActivecolor: "#ffffff",
    id: 0,
    num: 1,
    show: false,
    prostatus: false,
    CartCount: 0,
    status: 0,
    actionSheetHidden: true,
    ShowShare:false
  },
  // 自己写的
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
  BackIndex:function(e){
    wx.switchTab({
      url: '../index/index'
    })
  },
  // end

  // copy
  setTouchMove: function (e) {
    var that = this;
    wxh.home(that, e);
  },
  
  setNumber: function (e) {
    var that = this;
    var num = parseInt(e.detail.value);
    that.setData({
      num: num ? num : 1
    })
  },
  goCoupon: function () {
    wx.navigateTo({
      url: "/pages/coupon-status/coupon-status"
    })
  },
  //选择商品属性
  getAttrInfo: function () {
    var that = this;
    wxh.footan(that);
    that.setData({
      status: 1,
      ShowShare:true,
    })
  },

  // copy end

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



  onLoad: function (options) {
    console.log(options.id);
    // return ;
    app.globalData.openPages = '/pages/product/index?id=' + options.id;
    var that = this;
    app.setUserInfo();
    that.getCartCount();
    that.setData({
      id: options.id
    })
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    wx.request({
      url: app.globalData.url + '/routine/auth_api/details?uid=' + app.globalData.uid,
      method: 'POST',
      data: {
        id: that.data.id
      },
      header: header,
      success: function (res) {
        if (res.data.code == 200) {

          var image = "productSelect.image";
          var store_name = "productSelect.store_name";
          var price = "productSelect.price";
          var unique = "productSelect.unique";
          var stock = "productSelect.stock";
        
          that.setData({
            storeInfo: res.data.data.storeInfo,
            storeKeyWord: res.data.data.storeInfo.keyword.split(","),
            similarity: res.data.data.similarity,
            productAttr: res.data.data.productAttr,
            productValue: res.data.data.productValue,
            reply: res.data.data.reply,
            replyCount: res.data.data.replyCount,
            description: res.data.data.storeInfo.description,
            collect: res.data.data.storeInfo.userCollect,
            [image]: res.data.data.storeInfo.image,
            [stock]: res.data.data.storeInfo.stock,
           
            [store_name]: res.data.data.storeInfo.store_name,
            [price]: res.data.data.storeInfo.price,
            [unique]: ''
          }) 
          WxParse.wxParse('description', 'html', that.data.description,that, 0);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
          setTimeout(function () {
            wx.navigateBack({});
          }, 1200)
        }
      }
    })
  },
  listenerActionSheet: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  //加入购物车
  parameterShow: function () {
    console.log(1)
    var that = this;
    if (that.data.productSelect.unique != '') {
     
      var header = {
        'content-type': 'application/x-www-form-urlencoded',
      };
      wx.request({
        url: app.globalData.url + '/routine/auth_api/set_cart?uid=' + app.globalData.uid,
        method: 'GET',
        data: {
          productId: that.data.id,
          cartNum: that.data.num,
          uniqueId: that.data.productSelect.unique
        },
        header: header,
        success: function (res) {
          if (res.data.code == 200) {
            wx.showToast({
              title: '添加购物车成功',
              icon: 'success',
              duration: 2000
            })
            that.setData({
              prostatus: false,
              ShowShare:false

            })
            that.getCartCount();
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    } else {
      wxh.footan(that);
      that.setData({
        status: 2,
        ShowShare: true
      })
    }
  },
  //购买
  goOrder: function () {
    var that = this;
    console.log(that.data.status)
    if (that.data.productSelect.unique != '') {
      var header = {
        'content-type': 'application/x-www-form-urlencoded',
      };
      wx.request({
        url: app.globalData.url + '/routine/auth_api/now_buy?uid='+app.globalData.uid,
        method: 'GET',
        data: {
          productId: that.data.id,
          cartNum: that.data.num,
          uniqueId: that.data.productSelect.unique
        },
        header: header,
        success: function (res) {
          if (res.data.code == 200) {
            wx.navigateTo({ //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
              url: '/pages/Settlement/index?id=' + res.data.data.cartId
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    } else {
      that.setData({
        ShowShare: true,
        status: 3
      })
    }
  },

  modelbg: function (e) {
    this.setData({
      prostatus: false
    })
  },
  bindMinus: function () {
    var that = this;
    wxh.carmin(that)
  },
  bindPlus: function () {
    var that = this;
    wxh.carjia(that);
  },
  tapsize: function (e) {
    var that = this;
    var key = e.currentTarget.dataset.key;
    var attrValues = [];
    var attrName = that.data.attrName;
    var attrNameArr = attrName.split(",");
    var array = that.data.productAttr;
    for (var i in that.data.productAttr) {
      for (var j in that.data.productAttr[i]['attr_values']) {
        if (that.data.productAttr[i]['attr_values'][j] == key) {
          attrValues = that.data.productAttr[i]['attr_values'];
        }
      }
    }
    for (var ii in attrNameArr) {
      if (that.in_array(attrNameArr[ii], attrValues)) {
        attrNameArr.splice(ii, 1);
      }
    }
    attrName = attrNameArr.join(',');
    if (attrName) var eName = e.currentTarget.dataset.key + ',' + attrName;
    else var eName = e.currentTarget.dataset.key;
    attrNameArr = eName.split(",");
    var isBool = false;
    var isattrNameArrLength = 0;
    for (var an in attrNameArr) {
      if (attrNameArr[an]) isattrNameArrLength = isattrNameArrLength + 1;
    }
    for (var b in that.data.productValue) {
      var sukValue = that.data.productValue[b].suk.split(",");
      if (sukValue.length == isattrNameArrLength) {
        if (that.in_array_two(attrNameArr, sukValue)) {
          isBool = true;
        }
      } else {
        isBool = true;
      }
    }
    if (!isBool) {
      wx.showToast({
        title: '属性不存在，请重新选择',
        icon: 'none',
        duration: 1500,
      })
    } else {
      that.setData({
        attrName: e.currentTarget.dataset.key + ',' + attrName
      })
      attrNameArr = that.data.attrName.split(",");
      var attrNameArrSort = '';
      for (var jj in that.data.productAttr) {
        for (var jjj in that.data.productAttr[jj]['attr_values']) {
          if (that.in_array(that.data.productAttr[jj]['attr_values'][jjj], attrNameArr)) {
            attrNameArrSort += that.data.productAttr[jj]['attr_values'][jjj] + ',';
          }
        }
      }
      for (var jj in array) {
        for (var jjj in array[jj]['attr_values']) {
          if (that.in_array(array[jj]['attr_values'][jjj], attrNameArr)) {
            array[jj]['attr_value'][jjj].check = true;
          } else {
            array[jj]['attr_value'][jjj].check = false;
          }
        }
      }
      that.setData({
        productAttr: array
      })
      var attrNameArrSortArr = attrNameArrSort.split(",");
      attrNameArrSortArr.pop();
      that.setData({
        attrName: attrNameArrSortArr.join(',')
      })
      var arrAttrName = that.data.attrName.split(",");
      for (var index in that.data.productValue) {
        var strValue = that.data.productValue[index]['suk'];
        var arrValue = strValue.split(",");
        if (that.in_array_two(arrValue, arrAttrName)) {
          var image = "productSelect.image";
          var store_name = "productSelect.store_name";
          var price = "productSelect.price";
          var unique = "productSelect.unique";
          var stock = "productSelect.stock";
          that.setData({
            [image]: that.data.productValue[index]['image'],
            [price]: that.data.productValue[index]['price'],
            [unique]: that.data.productValue[index]['unique'],
            [stock]: that.data.productValue[index]['stock'],
          })
        }
      }
    }
  },

  in_array_two: function (arr1, arr2) {
    if (arr1.sort().toString() == arr2.sort().toString()) {
      return true;
    }
    else {
      return false;
    }

  },
  in_array: function (str, arr) {
    for (var f1 in arr) {
      if (arr[f1] == str) {
        return true;
      }
    }
  },
  tapcolor: function (e) {
    var that = this;
    wxh.tapcolor(that, e);
  },
  //选择商品属性，点击确定按钮
  subBuy: function (e) {
    console.log(e);
    // wx.request({
    //   url: app.globalData.url + '/routine/auth_api/get_form_id?uid=' + app.globalData.uid,
    //   method: 'GET',
    //   data: {
    //     formId: e.detail.formId
    //   },
    //   success: function (res) { }
    // })
    var that = this;
    if (that.data.num > that.data.productSelect.stock) {
      wx.showToast({
        title: '库存不足' + that.data.num,
        icon: 'none',
        duration: 2000
      })
      that.setData({
        num: that.data.productSelect.stock,
      })
      console.log("库存不足")
    } else if (that.data.productAttr.length > 0 && that.data.productSelect.unique == '') {
      wx.showToast({
        title: '请选择属性',
        icon: 'none',
        duration: 2000
      })
      console.log("请选择属性")
    } else {
      console.log("走到这一行")
      if (that.data.status == 1) {
        console.log("走到这一行1")
        var attrValueData = [];
        for (var i in that.data.productValue) {
          if (that.data.productValue[i].unique == that.data.productSelect.unique) {
            for (var j in that.data.productAttr) {
              for (var k in that.data.productAttr[j].attr_values) {
                var sukArr = that.data.productValue[i].suk.split(',');
                if (that.in_array(that.data.productAttr[j].attr_values[k], sukArr)) {
                  attrValueData.push(that.data.productAttr[j].attr_name + ':' + that.data.productAttr[j].attr_values[k]);
                }
              }
            }
          }
        }
        that.setData({
          attr: '已选',
          attrValue: attrValueData.join(','),
          prostatus: false,
          ShowShare:false
        })
      } else if (that.data.status == 2) {
        var header = {
          'content-type': 'application/x-www-form-urlencoded',
        };
        wx.request({
          url: app.globalData.url + '/routine/auth_api/set_cart?uid=' + app.globalData.uid,
          method: 'GET',
          data: {
            productId: that.data.id,
            cartNum: that.data.num,
            uniqueId: that.data.productSelect.unique
          },
          header: header,
          success: function (res) {
            if (res.data.code == 200) {
              wx.showToast({
                title: '添加购物车成功',
                icon: 'success',
                duration: 2000
              })
              that.setData({
                prostatus: false
              })
              that.getCartCount();
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      } else if (that.data.status == 3) {
        var header = {
          'content-type': 'application/x-www-form-urlencoded',
        };
        wx.request({
          url: app.globalData.url + '/routine/auth_api/now_buy?uid=' + app.globalData.uid,
          method: 'GET',
          data: {
            productId: that.data.id,
            cartNum: that.data.num,
            uniqueId: that.data.productSelect.unique
          },
          header: header,
          success: function (res) {
            if (res.data.code == 200) {
              wx.navigateTo({ //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
                url: '/pages/Settlement/index?id=' + res.data.data.cartId
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }
    }
  },

  getCartCount: function () {
    var that = this;
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    wx.request({
      url: app.globalData.url + '/routine/auth_api/get_cart_num?uid=' + app.globalData.uid,
      method: 'POST',
      header: header,
      success: function (res) {
        that.setData({
          CartCount: res.data.data
        })
      }
    })
  },
  setCollect: function () {
    if (this.data.collect) this.unCollectProduct();
    else this.collectProduct();
  },
  unCollectProduct: function () {
    var that = this;
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    wx.request({
      url: app.globalData.url + '/routine/auth_api/uncollect_product?uid=' + app.globalData.uid,
      method: 'POST',
      header: header,
      data: {
        productId: that.data.id
      },
      success: function (res) {
        wx.showToast({
          title: '取消收藏成功',
          icon: 'success',
          duration: 1500,
        })
        that.setData({
          collect: false,
        })
      }
    })
  },
  collectProduct: function () {
    var that = this;
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    wx.request({
      url: app.globalData.url + '/routine/auth_api/collect_product?uid=' + app.globalData.uid,
      method: 'POST',
      header: header,
      data: {
        productId: that.data.id
      },
      success: function (res) {
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 1500,
        })
        that.setData({
          collect: true,
        })
      }
    })
  },
  //去购物车
  getCar: function () {
    wx.switchTab({
      url: '/pages/buy/index'
    });
  },
  
  //加入清单
  AddList:function(e){
    
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
  onShareAppMessage: function () {
    var that = this;
    that.setData({
      actionSheetHidden: !that.data.actionSheetHidden
    })
    return {
      title: that.data.productSelect.store_name,
      path: app.globalData.openPages,
      // imageUrl: that.data.url + that.data.product.image,
      success: function () {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      }
    }
  }
  
})