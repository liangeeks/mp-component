export default class Component {
  data() {
    return {
    };
  }
  methods() {
    return {};
  }
  constructor(page, options) {
    this.page = page;
    this.options = options;
    this.scope = options.scope || this.constructor.name;
    this._data = this.data();
    this._methods = this.methods();
    this.__init();
    
  }
  __init() {
    this.__initData();
    this.__initMethods();
    if (typeof this.initialize == 'function') {
      this.initialize();
    }
  }
  /**
   * 初始化数据
   */
  __initData() {
    this.setData = (data) => {
      let originData = this.page.data[`$${this.scope}`] || {};
      let destData = Object.assign(originData, data);
      this.page.setData({[`$${this.scope}`]: destData});
      this._data = destData;
    };
    this.getData = (name) => {
      if (name) {
        return this.page.data[`$${this.scope}`][name];
      } else {
        return this.page.data[`$${this.scope}`];
      }
    }
    this.setData(this._data)
  }
  /**
   * 初始化方法
   */
  __initMethods() {
    let map2data = {}
    Object.keys(this._methods).forEach((k)=> {
      if (typeof this._methods[k] === `function`) {
        this[k] = this.page[`$${this.scope}.${k}`] = this._methods[k].bind(this);
        map2data[`$${this.scope}.${k}`] = `$${this.scope}.${k}`;
      }
    });
    this.page.setData(map2data);
  }
}
