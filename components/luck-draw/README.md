# 抽奖游戏组件
该组件可以直接拷贝到自己的项目目录中，按照正常的组件使用规则引入使用即可。  
## 使用示例：
```
<luck-draw hasResult="{{hasResult}}" isWinPrize="{{isWinPrize}}" bind:getResult="handleLuckDraw"></luck-draw>
```

## 参数规则：  

 参数  | 类型 | 说明  
 ---- | ----- | -----   
 hasResult  | Boolean | 是否有中奖结果，控制抽奖动画的结束  
 isWinPrize  | Boolean | 是否中奖，控制抽奖动画停止的显示状态，中奖或者不中奖 
 
 ## 事件规则：
 
  名称 | 说明
  ---- | ----
  getResult | 在这个方法中可以执行抽奖调用接口，在这里设置hasResult和isWinPrize的结果，用于控制抽奖动画的结束和状态
