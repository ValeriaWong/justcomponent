module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-vue/scss",
  ],
  plugins: [
    'stylelint-selector-bem-pattern'
  ],
  "rules": {

    'import-notation': "string",

    'plugin/selector-bem-pattern': {
      // 选择Preset Patterns，支持suit和bem两种，默认suit规范；
      // 不管哪种都需要手动指定，因为该插件未给源插件默认指定
      'preset': 'bem',
      /**
       * 自定义模式规则
       * 指定组合的选择器检查规则，其实就是指定class名称规则
       * 支持正则字符串、返回正则的函数、包含2个选项参数的对象等写法
       */
      componentSelectors: {
        // 只初始的选择器规则（可以理解为外层的class规则）
        initial: '^\\.{componentName}(?:__[-a-z]+)?(?:--[a-z]+)?$',
        // 可以理解为外层以内的选择器的规则，
        // 如果不指定，则跟initial同样的规则，
        // 注意这里配置的时候比上面少一个问号，
        // 是希望内层就不应该只有componentName作为选择器了
        combined: '^\\.{componentName}(?:__[-a-z]+)(?:--[a-z]+)?$'
      },
      "utilitySelectors": "^\\.u-[a-z]+$",
      ignoreSelectors: ['^\\.el-', '/deep/', '>>>', '^\\.icon-'],
      ignoreCustomProperties: [],
    }
  }
}