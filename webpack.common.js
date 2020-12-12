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
// Common has entry, plugins and module

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');

module.exports = {

  // devtool: "none",
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js',
  },

  plugins: [new HtmlWebpackPlugin({
    template: './src/template.html',
  })],
  module: {
    rules: [

      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].[ext]',
            outputPath: 'images',
          },
        },
      },

    ],
  },
};