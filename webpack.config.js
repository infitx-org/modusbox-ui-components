const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: './src/components/index.js',
    mulesoft: './src/assets/styles/themes/mulesoft.scss',
    modusbox: './src/assets/styles/themes/modusbox.scss',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'modusbox-ui-components',
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ExtractTextPlugin('[name].css', {
      disable: false,
      allChunks: true,
    }),
  ],
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
        loader: ExtractTextPlugin.extract('css-loader!sass-loader!postcss-loader'),
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
    ],
  },
  externals: {
    // This line says to just use the version of React that consumers of this
    // library have installed.
    react: 'commonjs react',
  },
};
