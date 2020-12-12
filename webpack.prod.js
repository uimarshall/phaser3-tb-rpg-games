
const path = require('path');

const { merge } = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,

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
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [new MiniCssExtractPlugin({
    filename: '[name].[contentHash].css',

  }), new CleanWebpackPlugin()],


});