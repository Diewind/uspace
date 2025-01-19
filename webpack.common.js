/*
 * @Description: webpack-COMMON 配置文件
 * @Date: 2021-03-30
 * @Author: harry <sh_fight@163.com>
 * @Version: 0.0.1
 */
const path = require('path');
const WebpackBar = require('webpackbar');

module.exports = {
  entry: ['react-hot-loader/patch', './src'],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // Creates style nodes from JS strings
          },
          {
            loader: "css-loader" // Translates CSS into CommonJS
          },
          {
            loader: "less-loader" // Compiles Less to CSS
          }
        ]
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      // All files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(ts|tsx)?$/,
        loader: "ts-loader",
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.json'),
        }
      }
    ]
  },
  plugins: [
    new WebpackBar({
      name: '⛳ MySpace Front',
    }),
  ],
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
    ], // 省略获取后缀文件名不加后缀
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  output: {
    // 打包文件根目录
    path: path.resolve(__dirname, "dist/"),
  },
};
