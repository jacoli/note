// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    outcomeFee: 0,
    incomeFee: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },

  outcomeInput: function (e) {
    this.setData({
      outcomeFee: e.detail.value
    })
  },

  outcomeTapped: function () {
    if (this.data.outcomeFee <= 0) {
      wx.showToast({
        title: '金额不能为空',
      })
      return
    }

    var records = wx.getStorageSync('records') || []
    records.unshift({
      type: 2,
      fee: this.data.outcomeFee,
      date: new Date()
    })
    wx.setStorageSync('records', records)
    wx.navigateBack({
    })
  },

  incomeInput: function (e) {
    this.setData({
      incomeFee: e.detail.value
    })
  },

  incomeTapped: function () {
    if (this.data.incomeFee <= 0) {
      wx.showToast({
        title: '金额不能为空',
      })
      return
    }
    var records = wx.getStorageSync('records') || []
    records.unshift({
      type: 1,
      fee: this.data.incomeFee,
      date: new Date()
    })
    wx.setStorageSync('records', records)
    wx.navigateBack({
    })
  }
})