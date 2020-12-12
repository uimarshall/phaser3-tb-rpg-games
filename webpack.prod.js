
const path = require('path');
// webpack-merge v5 (and later)
const { merge } = require('webpack-merge');
// const merge = require('webpack-merge');//Only worked in v4.
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  // devtool: "none",
  // entry: "./src/index.js",
  output: {
    filename: '[name].[contentHash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 3. Extract css into files
          MiniCssExtractPlugin.loader,
          // 2. Translates CSS into CommonJS
          'css-loader',
          // 1. Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin({
    filename: '[name].[contentHash].css',

  }), new CleanWebpackPlugin()],


});