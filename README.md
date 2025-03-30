# vue-i18n-lp
> 分为loader和plugin两部分。loader是webpack loader,plugin是vue plugin
> 1. loader主要完成\<i18n>标签的解析，会将\<i18n>标签内的json数据存到当前vue实例的$options
> 2. plugin主要完成能够在模板中直接使用$t，和当前语言的设置

#### usage
1. webpack.config.js
```js
 module: {
    rules: [
        ...,
        {
            resourceQuery: /blockType=i18n/,
            use: ["vue-i18n-lp/loader"]
        },
        ...
    ]
}
```
2. vue
```js
import Vue from "vue"
import I18N from "vue-i18n-lp/plugin"

Vue.use(I18N)
```


#### example
1. 直接使用
```vue
<i18n>
  {
    "zh-CN": {
      "app-label": "测试"
    },
    "en-US": {
      "app-label": "test"
    }
  }
</i18n>
<template>
  <div>
    <h1>这是标题</h1>
    <p>这是一段话</p>
    <p>{{ $t("app-label" }}</p>
  </div>
</template>
<script>
  // 默认语言是 navigator.language
  export default {
    name: "app"
  }
</script>
```
2. 通过mixins引入
```vue
<!-- mixin/i18n.vue -->
<i18n>
  {
      "zh-CN": {
        "app-label": "测试"
      },
      "en-US": {
        "app-label": "test"
      }
  }
</i18n>
<i18n>
  {
    "zh-CN": {
      "app-value": "值"
    },
    "en-US": {
      "app-value": "value"
    }
  }
</i18n>

<!-- index.vue -->
<script>
  import i18n from "./mixin/i18n.vue"
  export default {
      mixins: [i18n],
      name: "app"
  }
</script>
```