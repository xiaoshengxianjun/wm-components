// components/plate-number-keyboard/plate-number-keyboard.js
Component({

  behaviors: [],

  properties: {
    show: { // 控制键盘显示隐藏
      type: Boolean,
      value: true
    }
  },
  data: {
    plateNumber: "", // 车牌号
    provinceList: {
      line1: ['京', '津', '渝', '沪', '冀', '晋', '辽', '吉', '黑', '苏'],
      line2: ['浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '琼'],
      line3: ['川', '贵', '云', '陕', '甘', '青', '蒙', '贵', '宁', '新'],
      line4: ['藏', '使', '领', '警', '学', '港', '澳']
    },
    letterNumberList:{
      line1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      line2: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      line3: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      line4: ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    },
    showProvince: true, // 是否显示省份面板，控制省份面板和字符面板显示
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
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
    _closeKeyboard: function() {
      this.setData({
        show: false
      })
    }
  }

})