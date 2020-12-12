// This config will output helo.js in "TEST" folder just as dist o/p main.js
// To remove "TEST" folder type: "rm -rf TEST/" on ur CLI

// ***************************************************
// This is just recreating what we already have
/** const path = require('path');
module.exports = {
    entry: "./src/index.js",
    output:{
        filename:"helo.js",//create helo.js in the path below
        path: path.resolve(__dirname, "TEST")
    }
}; */
// ***************************************************

const path = require('path');
// webpack-merge v5 (and later)
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

// This will merge the content of webpack.common.js to webpack.dev.js
// const merge = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  // devtool: "none",
  // entry: "./src/index.js",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings and Injects into DOM
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },


});