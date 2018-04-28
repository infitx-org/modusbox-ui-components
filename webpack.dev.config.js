const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    bundle: ['babel-polyfill', './src/Root'],
  },
  output: {
    filename: 'bundle.js',
  },
  devtool: 'eval',
  plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.(css|scss)?$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        query: 'assets/fonts/[name].[ext]',
      },
    ],
  },
};

module.exports.serve = {
  content: [__dirname],
};
