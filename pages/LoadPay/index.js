// pages/SecondaryPage/LoadPay/index.js
var app = getApp();
var wxh = require('../../utils/wxh.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   //倒计时
   clock:"",
    url: app.globalData.urlImages
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
      return min+"分"+sec+"秒"
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
  onLoad: function (e) {
    //传入毫秒
    var total_micro_second = 1200000;
    /* 毫秒级倒计时 */
    this.time(total_micro_second);
    //新增
    app.globalData.openPages = '/pages/orders-con/orders-con?order_id=' + e.order_id;
    app.setUserInfo();
    var header = {
      'content-type': 'application/x-www-form-urlencoded'
    };
    var uni = e.order_id;
    var that = this;
    wx.showLoading({ title: "正在加载中……" });
    wx.request({
      url: app.globalData.url + '/routine/auth_api/get_order?uid=' + app.globalData.uid,
      data: { uni: uni },
      method: 'get',
      header: header,
      success: function (res) {
        wx.hideLoading();
        that.setData({
          ordercon: res.data.data
        });
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    });
  },
  //选择付款方式
  checkPay: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['微信支付', '余额支付'],
      success(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {//微信支付
          wx.request({
            url: app.globalData.url + '/routine/auth_api/pay_order?uid=' + app.globalData.uid + '&uni=' + e.target.dataset.id + '&paytype=weixin',
            method: 'get',
            success: function (res) {
              var data = res.data.data;
              if (res.data.code == 200) {
                var jsConfig = res.data.data.result.jsConfig;
                console.log(jsConfig);
                wx.requestPayment({
                  timeStamp: jsConfig.timeStamp,
                  nonceStr: jsConfig.nonceStr,
                  package: jsConfig.package,
                  signType: jsConfig.signType,
                  paySign: jsConfig.paySign,
                  success: function (res) {
                    wx.showToast({
                      title: '支付成功',
                      icon: 'success',
                      duration: 1000,
                    })
                    setTimeout(function () {
                      wx.navigateTo({ //跳转至指定页面并关闭其他打开的所有页面
                        url: '/pages/orders-list/orders-list?uid=' + app.globalData.uid
                        // url: '/pages/orders-con/orders-con?order_id=' + data.result.order_id
                      })
                    }, 1200)
                  },
                  fail: function (res) {
                    wx.showToast({
                      title: '取消支付',
                      icon: 'success',
                      duration: 1000,
                    })
                  },
                  complete: function (res) {
                    console.log(res);
                    if (res.errMsg == 'requestPayment:cancel') {
                      wx.showToast({
                        title: '取消支付',
                        icon: 'none',
                        duration: 1000,
                      })
                    }
                  },
                })
              }
            },
            fail: function (res) {
              console.log('submit fail');
            }
          });
        } else {
          wx.request({
            url: app.globalData.url + '/routine/auth_api/pay_order?uid=' + app.globalData.uid + '&uni=' + e.target.dataset.id + '&paytype=yue',
            method: 'get',
            success: function (res) {
              var data = res.data.data;
              if (res.data.code == 200) {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(function () {
                  wx.navigateTo({ //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
                    url: '/pages/orders-list/orders-list?uid=' + app.globalData.uid
                    // url: '/pages/orders-con/orders-con?order_id=' + data.result.orderId
                  })
                }, 1200)
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
            },
            fail: function (res) {
              console.log('submit fail');
            }
          });
        }
      },
      fail(res) {
        console.log(res.errMsg)
      },
      // complete(res) {
      //   setTimeout(function () {
      //     wx.navigateTo({
      //       url: '/pages/orders-list/orders-list',
      //     })
      //   }, 1500)
      // },
    })
  },
  //立即付款
  getPay: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/routine/auth_api/pay_order?uid=' + app.globalData.uid + '&uni=' + e.target.dataset.id,
      method: 'get',
      success: function (res) {
        var data = res.data.data;
        if (res.data.code == 200 && res.data.data.status == 'WECHAT_PAY') {
          var jsConfig = res.data.data.result.jsConfig;
          console.log(jsConfig);
          wx.requestPayment({
            timeStamp: jsConfig.timeStamp,
            nonceStr: jsConfig.nonceStr,
            package: jsConfig.package,
            signType: jsConfig.signType,
            paySign: jsConfig.paySign,
            success: function (res) {
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 1000,
              })
              setTimeout(function () {
                wx.navigateTo({ //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
                  url: '/pages/orders-list/orders-list?uid=' + app.globalData.uid
                })
              }, 1200)
            },
            fail: function (res) {
              wx.showToast({
                title: '支付失败',
                icon: 'success',
                duration: 1000,
              })
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/orders-list/orders-list?uid=' + app.globalData.uid
                })
              }, 1200)
            },
            complete: function (res) {
              console.log(res);
              if (res.errMsg == 'requestPayment:cancel') {
                wx.showToast({
                  title: '取消支付',
                  icon: 'none',
                  duration: 1000,
                })
                setTimeout(function () {
                  wx.navigateTo({ //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
                    url: '/pages/orders-list/orders-list?uid=' + app.globalData.uid
                  })
                }, 1200)
              }
            },
          })
        } else if (res.data.code == 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateTo({ //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
              url: '/pages/orders-con/orders-con?order_id=' + data.result.orderId
            })
          }, 1200)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateTo({ //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
              url: '/pages/orders-con/orders-con?order_id=' + data.result.orderId
            })
          }, 1200)
        }
      },
      fail: function (res) {
        console.log('submit fail');
      }
    });
  },
  delOrder: function (e) {
    var header = {
      'content-type': 'application/x-www-form-urlencoded'
    };
    var uni = e.currentTarget.dataset.uni;
    var that = this;
    wx.showModal({
      title: '确认删除订单？',
      content: '订单删除后将无法查看',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + '/routine/auth_api/user_remove_order?uid=' + app.globalData.uid,
            data: { uni: uni },
            method: 'get',
            header: header,
            success: function (res) {
              if (res.data.code == 200) {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(function () {
                  wx.navigateTo({
                    url: '/pages/orders-list/orders-list',
                  })
                }, 1500)
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
              // that.setData({
              //   ordercon: that.data.ordercon
              // });
            },
            fail: function (res) {
              console.log('submit fail');
            },
            complete: function (res) {
              console.log('submit complete');
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  goTel: function (e) {
    console.log(e);
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel //仅为示例，并非真实的电话号码
    })
  },
  goJoinPink: function (e) {
    var uni = e.currentTarget.dataset.uni;
    wx.navigateTo({
      url: '/pages/join-pink/index?id=' + uni,
    })
  },
  confirmOrder: function (e) {
    var header = {
      'content-type': 'application/x-www-form-urlencoded'
    };
    var uni = e.currentTarget.dataset.uni;
    var that = this;
    wx.showModal({
      title: '确认收货',
      content: '为保障权益，请收到货确认无误后，再确认收货',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + '/routine/auth_api/user_take_order?uid=' + app.globalData.uid,
            data: { uni: uni },
            method: 'get',
            header: header,
            success: function (res) {
              if (res.data.code == 200) {
                wx.navigateTo({
                  url: '/pages/orders-list/orders-list?nowstatus=4',
                })
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
              that.setData({
                ordercon: that.data.ordercon
              });
            },
            fail: function (res) {
              console.log('submit fail');
            },
            complete: function (res) {
              console.log('submit complete');
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  goIndex: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
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