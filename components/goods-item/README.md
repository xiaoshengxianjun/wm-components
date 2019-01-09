# 商品单项竖版组件
展示商品信息，用于商品列表竖版排列中，可显示商品图片，名称，说明，价格，原价，更改添加图片按钮等。  
## 使用示例：
```
<goods-item goodsInfo="{{item}}" addImage="{{addImg}}" bind:handleClick="handleClick"></goods-item>
```

## 参数规则：  

 参数  | 类型 | 说明  
 ---- | ----- | -----   
 addImage  | String | 添加按钮图片资源路径，可以是加号，购物车或者收藏等图片资源  
 goodsInfo  | Object | 商品内容信息，包含商品图片，名称，价格等
 
 ## 事件规则：
 
  名称 | 说明
  ---- | ----
  handleClick | 添加按钮点击后的操作，一般执行加入购物车操作
