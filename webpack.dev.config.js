const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    bundle: ['./src/react/DevPlayground'],
  },
  output: {
    filename: '[name].js',
  },
  devtool: 'cheap-module-source-map',
  plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
              emitWarning: true,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)?$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        query: { limit: 8192, mimetype: 'image/png' },
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
};
