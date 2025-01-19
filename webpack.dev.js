/*
 * @Description: webpack-DEV 配置文件
 * @Date: 2021-03-30
 * @Author: harry <sh_fight@163.com>
 * @Version: 0.0.1
 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CreateReactPublicPlugin = require('create-react-public-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const paths = require('./path.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // contentBase: paths.appPublic,
    // contentBasePublicPath: paths.publicUrlOrPath,
    publicPath: paths.publicUrlOrPath.slice(0, -1),
    port: 8000,
    historyApiFallback: {
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
    hot: true,
    proxy: {
      "/": {
        target: "http://localhost:8080",
        ws: true,
        bypass(req) {
          if (req.headers.accept.indexOf('html') !== -1) {
            return '/index.html';
          }
          return null;
        },
      },
    }
  },
  output: {
    // webpack uses `publicPath` to determine where the app is being served from.
    // It requires a trailing slash, or the file assets will get an incorrect path.
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: paths.publicUrlOrPath,
    filename: "js/[name].js",
    globalObject: 'this',
  },
  module: {

  },
  plugins: [
    // 生成 index.html
    new HtmlWebpackPlugin({
      inject: true,
      // template: path.resolve('public/index.html'),
      template: paths.appHtml,
    }),
    // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: paths.publicUrlOrPath + 'public',
      // You can pass any key-value pairs, this was just an example.
      // WHATEVER: 42 will replace %WHATEVER% with 42 in index.html.
    }),
    new CreateReactPublicPlugin({
      rootPath: __dirname,
      projectName: 'public',
      outputFiles: ['favicon.ico', 'index.html', 'logo192.png', 'logo512.png', 'manifest.json', 'robots.txt'],
    }),
  ],
});
