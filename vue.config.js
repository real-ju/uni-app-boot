const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('@c', resolvePath('src/components'));
    // .set('@modal', resolvePath('src/views'))
  }
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: process.env.VUE_APP_devServerProxy,
  //       pathRewrite: { '^/api': '' },
  //       changeOrigin: true
  //     }
  //   }
  // }
  // lintOnSave: true
};

function resolvePath(url) {
  return path.resolve(__dirname, url);
}
