Page({
  data: {

  },
  onLoad: function (options) {

  },
  callPhone:function(){//联系客服
    wx.makePhoneCall({
      phoneNumber: '18500641006',
    })
  },
  goTuiKuan:function(){//退款
    wx.navigateTo({
      url: '/pages/member/refundQuestion/refundQuestion' // 指定页面的url
    });
  },
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