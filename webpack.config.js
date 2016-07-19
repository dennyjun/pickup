var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: path.join(__dirname + '/client/dist'),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};