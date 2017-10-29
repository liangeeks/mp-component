# mp-component
小程序组件化实现


### 定义组件

> `DemoComponent.js`组件JS文件
```js
import Component from '[path]/Component';

export default 
# 继承组件基类
class DemoComponent extends Component {
  
  /**
   * 组件默认数据
   **/
  data() {
    return {
      name: "world",
      greeting: undefined
    };
  }
  
  /**
   * 事件处理
   **/
  methods() {
    return {
      bindInputChange(e) {
        this.setData({
          name: e.detail.value
        });
      }
    };
  }

  initialize(options) {
    # 组件初始化
    this.setData({
      greeting: options.greeting
    });
  }
}
```

> `DemoComponent.wxml` 组件模板文件
```xml
<template name="DemoComponent">
  <view></view>
  <input  bindinput="{{ bindInputChange }}" placeholder="输入同步到view中"/>
  <view>greeting: {{ greeting }} {{ name }}</view>
  
</template>
```

### 使用组件

> `some-page.js`小程序中的页面
```js
import DemoComponent from '../components/DemoComponent';
Page({
  onLoad: function (options) {
    # 初始化组件
    this.$DemoComponent = new DemoComponent(this, {
      greeting: "Hello"
    });
  },
});
```
> `some-page.wxml`在页面模板中用到组件
```wxml
<import src="../components/DemoComponent.wxml"/>
<template wx:if="{{ $DemoComponent }}" is="DemoComponent" data="{{ ...$DemoComponent }}"></template>
```
