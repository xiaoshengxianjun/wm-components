// components/luck-draw/luck-draw.js
Component({

  behaviors: [],

  properties: {
    isSameTime: { // 三列动画是否同时启动
      type: Boolean,
      value: false // 默认不同时启动
    },
    hasResult: { // 是否有抽奖结果，用于控制抽奖动画的结束
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        if (newVal) {
          this._setResult(this.data.isWinPrize)
        }
      }
    },
    isWinPrize: { // 抽奖结果，是否中奖
      type: Boolean,
      value: false
    }
  },
  data: {
    rate: 1, // 比率，用于不同分辨率设备兼容
    defaultStyle: '', // 图片默认的位置样式，用于多次抽奖是初始化位置
    disabled: false, // “点击抽奖”按钮是否可用，即控制抽奖是否可执行
    showDefault: true, // 是否展示默认图片
    animationData1: {}, // 第一列的第一个图片的动画
    animationData2: {}, // 第一列的第二个图片的动画
    animationData3: {}, // 第二列的第一个图片的动画
    animationData4: {}, // 第二列的第二个图片的动画
    animationData5: {}, // 第三列的第一个图片的动画
    animationData6: {}, // 第三列的第二个图片的动画
    btnAnimation: {}, // 按钮的呼吸动画
    resultPrize: 0 // 抽奖结果 0 代表为中奖
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      const baseWidthUnit = 375; // 以iPhone6的分辨率为基准
      var windowWidth = wx.getSystemInfoSync().windowWidth;
      var rate = windowWidth / baseWidthUnit; // 计算出当前设备分辨率与标准分辨率的比率
      this.setData({
        rate: rate
      })

      // 设置按钮的缩放动画
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'linear',
      })
      animation.scale(1.05, 1.05).step().scale(1, 1).step();
      var btnTime = setInterval(function () {
        animation.scale(1.05, 1.05).step().scale(1, 1).step();
        this.setData({
          btnAnimation: animation
        })
      }.bind(this), 1000);
    },
    moved: function () {},
    detached: function () {},
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {},
    hide: function () {},
    resize: function () {},
  },

  methods: {
    /* 触摸开始 */
    _handleTouchStart: function () {
      this.setData({
        bottom: '80rpx'
      })
    },
    /* 触摸结束 */
    _handleTouchEnd: function () {
      this.setData({
        bottom: '86rpx'
      })
    },

    /* 数据初始化 */
    _initData: function () {
      // 隐藏默认图片, 按钮置为不可用，数据初始化
      this.setData({
        showDefault: false,
        disabled: true,
        resultPrize: 0, // 抽奖结果初始化，置为0
        hasResult: false, // 没有抽奖结果
        defaultStyle: 'transform:translateY(0px)!important;' // 强制设置，位置移动设为0
      })
    },

    /* “试试手气”点击事件，启动抽奖动画，这里可以添加触发抽奖接口 */
    _handleClick: function () {
      // 点击后触发抽奖动画
      // 判断是否设置三列动画同时启动，如果不同时启动，设置为1秒内的任意毫秒数
      var oneLineTime = 0;
      var twoLineTime = 0;
      var threeLineTime = 0;
      if (this.data.isSameTime) {
        oneLineTime = 0;
        twoLineTime = 0;
        threeLineTime = 0;
      } else {
        // 1s内的任意毫秒数
        oneLineTime = parseInt(Math.random() * 1000);
        twoLineTime = parseInt(Math.random() * 1000);
        threeLineTime = parseInt(Math.random() * 1000);
      }

      this._initData();

      setTimeout(function () {
        this._handleAnimate(1);
      }.bind(this), oneLineTime);
      setTimeout(function () {
        this._handleAnimate(2);
      }.bind(this), twoLineTime);
      setTimeout(function () {
        this._handleAnimate(3);
      }.bind(this), threeLineTime);

      // 触发抽奖接口，该操作可以在组件外部操作，也可以在这里直接操作
      const myEventDetail = {} // detail对象，提供给事件监听函数，可以在getResult对应的方法中监听到
      this.triggerEvent('getResult', myEventDetail);

    },

    /**
     * 抽奖动画
     * 每一列单独滚动，根据每一列图片的滚动位置，确定最终的结果
     * 动画思路：计时计算上下两张图片的启动时间，根据每张图每次的动画启动时间，设置动画的开始
     * @param line 列数，表示当前第几列
     * @param duration 动画的循环时间，数值越大越慢，默认800ms，可以用于控制每列动画的快慢
     */
    _handleAnimate: function (line, duration) {
      const durationTime = duration ? duration : 800; // 动画的循环时间，默认800ms，改变这个值可以改变动画的快慢
      const loopTime = durationTime / 4 * 3; // 循环周期时间计算公式，一张图中有三个选项，加上显示区的那一项，共四个，除以4代表每一项走过显示区的时间
      const moveUnit = 85 * this.data.rate; // 移动单位，也是当前抽奖区域可见内容的高度，每移动一个项目的高度，该参数用于控制动画的移动距离
      var animation = wx.createAnimation({
        duration: durationTime,
        timingFunction: 'linear',
      })

      // 第一张图先执行一次动画
      animation.translateY(moveUnit * 4).step().translateY(0).step({
        duration: 0
      });
      if (line === 1) {
        this.setData({
          animationData1: animation,
        })
      } else if (line === 2) {
        this.setData({
          animationData3: animation,
        })
      } else if (line === 3) {
        this.setData({
          animationData5: animation,
        })
      }

      var count = 1;
      var time = setInterval(function () {
        // 如果抽奖有了结果，根据结果，执行对应的中奖或者未中奖处理
        if (this.data.hasResult) {
          clearInterval(time);
          this._handleAnimateEnd(moveUnit, line, count);
        } else {
          animation.translateY(moveUnit * 4).step().translateY(0).step({
            duration: 0
          });
          this._handleSetData(animation, count, line);
        }
        count++;
      }.bind(this), loopTime);
    },
    /**
     * 设置中奖结果,true中奖，false未中奖
     */
    _setResult: function (result) {
      // 如果中奖，将中奖结果设为一致，三种结果，任选一种作为最后的结果
      var tempRes = parseInt(Math.random() * 30);
      var res = 1; // 中奖结果，1代表显示结果为第一种
      if (tempRes >= 0 && tempRes < 10) {
        res = 1;
      } else if (tempRes >= 10 && tempRes < 20) {
        res = 2;
      } else {
        res = 3;
      }

      this.setData({
        isWinPrize: result,
        resultPrize: result ? res : 0
      })
    },
    /**
     * 处理抽奖结果和动画结束
     * 中奖结果如下：如中奖结果为A,每一列的移动距离为1,3,2，方能最终显示一样
     * A:[3,2,1]
     * B:[2,1,3]
     * C:[1,3,2]
     * @param {obj} animation 
     * @param {number} moveUnit 
     * @param {number} line 
     */
    _handleAnimateEnd: function (moveUnit, line, count) {
      // 需要重新申请一个动画，作为结束动画
      var animation = wx.createAnimation({
        duration: 2000,
        timingFunction: 'linear',
      })
      if (this.data.isWinPrize) {
        var res = this.data.resultPrize; // 中奖的结果
        var templateData = [
          [3, 2, 1],
          [2, 1, 3],
          [1, 3, 2]
        ]
        var calcNum = templateData[line - 1][res - 1];
        animation.translateY(moveUnit * calcNum).step({
          duration: 0
        }); // 这里需要设置duration为0，否则，动画不能按照预期停止，图片会停到最初的位置

        this._handleSetData(animation, count, line);

      } else {
        // 如果不中奖，将中奖结果设为不一致
        animation.translateY(moveUnit).step({
          duration: 0
        }); // 如果没有中奖，三列图片皆向下滚动一格，三列均为不同的图片，显示为未中奖
        this._handleSetData(animation, count, line);
      }

      // 抽奖结束后，可继续抽奖
      this.setData({
        disabled: false
      })
    },
    /* 处理data数据设置 */
    _handleSetData: function (animation, count, line) {
      if (count % 2 === 0) {
        if (line === 1) {
          this.setData({
            animationData1: animation,
          })
        } else if (line === 2) {
          this.setData({
            animationData3: animation,
          })
        } else if (line === 3) {
          this.setData({
            animationData5: animation,
          })
        }
      }
      if (count % 2 === 1) {
        if (line === 1) {
          this.setData({
            animationData2: animation,
          })
        } else if (line === 2) {
          this.setData({
            animationData4: animation,
          })
        } else if (line === 3) {
          this.setData({
            animationData6: animation,
          })
        }
      }
    }
  }

})