# 车牌号专属键盘
自定义车牌号键盘，满足常见车牌和新能源车牌需求，可任意修改车牌号  
## 使用示例：
```
<plate-number-keyboard show="{{showKeyboard}}" bind:getResult="setNumber" initValue="{{plateNumber}}"></plate-number-keyboard>
```

## 参数规则：  

 参数  | 类型 | 说明  
 ---- | ----- | -----   
 initValue  | String | 初始化默认值，可不填，默认为空，如果有值，键盘会操作此值  
 show  | Boolean | 控制键盘显示隐藏
 
 ## 事件规则：
 
  名称 | 说明
  ---- | ----
  getResult | 在这个方法中可以拿到键盘点击操作的结果值，在该方法中设置更新页面内容
