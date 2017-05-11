//index.js
//获取应用实例

var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    income: '',
    outcome: '',
    latest: '',
  },

  // 更新视图
  updateWithRecords: function (records) {
    var income = 0
    var outcome = 0
    var latest = records.length > 0 ? ' 最近记录：' : ' 最近记录：无'

    for (var i = 0; i < records.length; i++) {
      var date = new Date(records[i].date)

      if (records[i].type == 1) { // 收入
        income += parseFloat(records[i].fee)
        if (i < 3) {
          latest += '\n收入 ' + parseFloat(records[i].fee).toFixed(2) + '元  ' + util.formatDate(date)
        }
      } else { // 支出
        outcome += parseFloat(records[i].fee)
        if (i < 3) {
          latest += '\n支出  ' + parseFloat(records[i].fee).toFixed(2) + '元  ' + util.formatDate(date)
        }
      }
    }

    this.setData({
      income: '收入:\n' + income.toFixed(2) + '元',
      outcome: '支出:\n' + outcome.toFixed(2) + '元',
      latest: latest
    })
  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
  },

  addTapped: function () {
    wx.navigateTo({
      url: '../add/add'
    })
  },

  revertTapped: function () {
    var records = wx.getStorageSync('records') || []
    records.shift()
    wx.setStorageSync('records', records)
    this.updateWithRecords(records)
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },

  onShow: function () {
    this.updateWithRecords(wx.getStorageSync('records') || [])
  }
})
