// components/plate-number-keyboard/plate-number-keyboard.js
Component({

  behaviors: [],

  properties: {
    show: { // 控制键盘显示隐藏
      type: Boolean,
      value: false,
      observer(newVal, oldVal, changedPath) {
        console.log(newVal)
        if (newVal) {
          // 如果当前是显示状态，调用开始动画,弹出键盘
          const animation = wx.createAnimation({
            duration: 300
          })
          // 立即执行无效，延迟一段时间执行弹出动画
          setTimeout(function() {
            animation.translateY(-216).step()
            this.setData({
              animationData: animation.export()
            })
          }.bind(this), 100);
        }
      }
    },
    showMain: {
      type: Boolean,
      value: false
    },
    initValue: { // 初始化的值
      type: String,
      value: ""
    }
  },
  data: {
    plateNumber: "", // 键盘操作结果值
    provinceList: {
      line1: ['京', '津', '渝', '沪', '冀', '晋', '辽', '吉', '黑', '苏'],
      line2: ['浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '琼'],
      line3: ['川', '贵', '云', '陕', '甘', '青', '蒙', '桂', '宁', '新'],
      line4: ['藏', '使', '领', '警', '学', '港', '澳']
    },
    letterNumberList: {
      line1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      line2: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      line3: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      line4: ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    },
    showProvince: true, // 是否显示省份面板，控制省份面板和字符面板显示
    animationData: {} // 键盘动画
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {},
    moved: function() {},
    detached: function() {},
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function() {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function() {
    // 如果初始化有值，赋值，否则，置为空
    this.setData({
      plateNumber: this.data.initValue ? this.data.initValue : ''
    })
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() {},
    hide: function() {},
    resize: function() {},
  },

  methods: {
    /**
     * 键盘面板切换操作，控制省份内容和字符内容显示
     */
    _clickChangePlane: function() {
      this.setData({
        showProvince: !this.data.showProvince
      })
    },
    /**
     * 关闭键盘，将键盘隐藏
     */
    _closeKeyboard: function(e) {
      // 创建动画，执行键盘面板退出动画，动画结束后隐藏整个键盘组件
      const animation = wx.createAnimation({
        duration: 300
      })
      setTimeout(function() {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export()
        })
        setTimeout(function() {
          this.setData({
            show: false
          })
        }.bind(this), 300);
      }.bind(this), 100);
    },
    /* 触发外部绑定事件，传递结果值 */
    _handleResult: function() {
      const myEventDetail = {
        value: this.data.plateNumber // 传递到结果文本
      };
      // 触发外部绑定事件，传递结果参数
      this.triggerEvent('getResult', myEventDetail);
    },
    /**
     * 键盘主要键点击事件，将点击内容更新到plateNumber
     */
    _handleClick: function(e) {
      // 如果当前显示的省份面板，当即任意省份后，自动切换到字符面板，同时将结果值的第一个字符修改
      if (this.data.showProvince) {
        this.setData({
          showProvince: false
        })
      }
      let currentResult = this.data.plateNumber; // 当前的结果值
      let currentText = e.currentTarget.dataset.text; // 当前的操作值

      // 车牌号最多8位，大多数7位，新能源8位，控制不能超过8位数
      if (currentResult.length < 8) {
        this.setData({
          plateNumber: currentResult + currentText
        })

        this._handleResult();
      }
    },
    /**
     * 删除回退点击事件
     */
    _handleDelete: function() {
      let currentText = this.data.plateNumber;
      currentText = currentText.substring(0, currentText.length - 1);
      // 当当前结果值长度大于0时，可执行删减操作
      if (currentText.length >= 0) {
        this.setData({
          plateNumber: currentText
        })

        this._handleResult();
      }
    },
    /**
     * 防止点击穿透
     */
    _preventDefault: function(e) {}
  }

})
