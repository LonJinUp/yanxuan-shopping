// pages/list/list.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setUserInfo();
    this.list();
  },

  list:function(e){
    var that = this;
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    wx.request({
      url: app.globalData.url + '/routine/auth_api/get_user_inventory?uid=' + app.globalData.uid,
      data:{
        page:1,
        limit:20,
      },
      method: 'GET',
      header: header,
      success: function (res) {
        if (res.data.code == 200) {
          if (res.data.data.data==""){
            that.setData({
              list:false
            })
          }else{
            console.log(res.data.data.data)
            that.setData({
              list: true,
              ListData: res.data.data.data
            })
          }
        } else {
          console.log(res.msg);
        
        }
      }
    })
  },

  //删除列表
  DeleteList:function(e){
    var that=this;
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    wx.request({
      url: app.globalData.url + '/routine/auth_api/delete_inventory?uid='+app.globalData.uid,
      data:{
        inventory_id: e.currentTarget.dataset.id
      },
      method:'POST',
      header: header,
      success:function(res){
       if(res.data.code==200){
         that.list();
       }else{
         console.log(res)
       }

      },
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {

  },

  //添加商品清单
  AddList:function(e){
    let that=this;
    that.setData({
      list:true
    })
  },  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.list()
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