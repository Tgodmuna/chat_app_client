const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    path: require.resolve("path-browserify"),
    os: require.resolve("os-browserify/browser"),
    crypto: require.resolve("crypto-browserify"),
    buffer: require.resolve("buffer/"),
    vm: require.resolve("vm-browserify"),
    stream: require.resolve("stream-browserify"),
    process: require.resolve("process/browser.js"),
  };
   config.plugins = (config.plugins || []).concat([
     new webpack.ProvidePlugin({
       process: "process/browser",
     }),
   ]);
  return config;
};
