//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasResult: false,
    isWinPrize: false,
    goodsList: [{
      id: 1,
      name: "泰国夜猫樱桃味加气酒300ml",
      description: "这里是商品描述",
      price: 11.5,
      oldPrice: 18,
      imageUrl: "../../images/goodsImg.jpg"
    }, {
      id: 2,
      name: "人生好酒，就此一杯",
      description: "这里是商品描述",
      price: 3.5,
      oldPrice: '',
      imageUrl: "../../images/goodsImg.jpg"
    }],
    addImg: "../../images/iconAdd.png",
    showKeyboard: false, 
    plateNumber: '沪A12345' // 车牌号
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /* 点击抽奖按钮操作，在这执行调用抽奖接口操作 */
  handleLuckDraw: function(e) {
    console.log(e)
    setTimeout(function() {
      this.setData({
        hasResult: true,
        isWinPrize: true
      })
    }.bind(this), 5000)
  },
  /* 商品添加按钮点击事件 */
  handleClick: function(e) {
    console.log(e.detail)
  },
  /* 输入框聚焦显示车牌号键盘 */
  handleFocus: function(e) {
    this.setData({
      showKeyboard: true
    })
  },
  /* 车牌号键盘点击事件 */
  setNumber: function(e) {
    this.setData({
      plateNumber: e.detail.value
    })
  }
})