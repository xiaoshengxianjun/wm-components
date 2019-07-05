// components/scratch/scratch.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  ctx: {},

  ready: function() {
    // 计算出当前设备分辨率与标准分辨率的比率
    const baseWidthUnit = 375; // 以iPhone6的分辨率为基准
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var rate = windowWidth / baseWidthUnit;

    // 1.初始化canvas，根据当前设备分辨率大小，设置宽高
    // 2.导入图片
    this.ctx = wx.createCanvasContext('scratchCanvas'); // 获取canvas对象
    this.ctx.drawImage('./images/scratch.jpg', 0, 0, 260 * rate, 80 * rate);
    this.ctx.draw();
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {}
})