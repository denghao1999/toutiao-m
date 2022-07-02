module.exports = {
  // 配置要使用的postcss插件
  plugins: {
    //   'autoprefixer': {
    //     // 配置使用  autoprefixer 插件
    //     // 作用 ：生成浏览器 css 样式规则前缀
    //     // VueVLI 内被已经配置了 autoprefixer 插件
    //     // 配置兼容到的环境信息
    //     browsers: ['Android >= 4.0', 'iOS >= 8']
    //   },
    // 配置使用postcss-pxtorem 插件
    "postcss-pxtorem": {
      rootValue ({ file }) {
        return file.indexOf("vant") !== -1 ? 37.5 : 75;
      },

      //配置要转换的 css属性
      // *表示所有
      propList: ["*"],
      exclude: 'github-markdown'
    },
  },
};
