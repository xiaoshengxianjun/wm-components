// components/goods-item/goods-item.js
Component({

  behaviors: [],

  properties: {
    goodsInfo: { // 商品信息内容
      type: Object
    },
    addImage: {
      type: String,
      value: '../../images/iconAdd.png'
    }
  },
  data: {}, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {},
    moved: function() {},
    detached: function() {},
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function() {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function() {},

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() {},
    hide: function() {},
    resize: function() {},
  },

  methods: {
    onMyButtonTap: function() {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod: function() {
      // 这里将 data.A[0].B 设为 'myPrivateData'
      this.setData({
        'A[0].B': 'myPrivateData'
      })
    },
    /**
     * 添加操作，一般执行加入到购物车操作，或者是搜藏操作，
     * 在这里触发外部事件，根据需求，自定义外部事件即可
     */
    _handleAdd: function(e) {
      // 触犯外部事件
      var myEventDetail = {
        id: e.currentTarget.dataset.id
      }
      this.triggerEvent('handleClick', myEventDetail);
    }
  }

})