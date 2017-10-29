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
      name1: "value1",
      name2: "value2",
      greeting: undefined
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
  <view>{{ name1 }}</view>
  <view>{{ name2 }}</view>
  <view>greeting: {{ greeting }}</view>
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
