module.exports = {
  parallel: false,
  chainWebpack: (config) => {
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap((options) => {
        options.transpileOnly = false;
        return options;
      });
    config.module
      .rule('tsx')
      .use('ts-loader')
      .tap((options) => {
        options.transpileOnly = false;
        return options;
      });
  },
};
