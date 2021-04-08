const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('@c', resolvePath('src/components'));
    // .set('@modal', resolvePath('src/views'))
  }
  // lintOnSave: true
};

function resolvePath(url) {
  return path.resolve(__dirname, url);
}
