const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const colorsSass = path.resolve(__dirname, 'src', 'assets', 'styles', 'vars', 'colors.scss');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    // group every react util into a single module
    'react/components': './src/react/components/index.js',
    'react/hooks': './src/react/hooks/index.ts',
    'react/hocs': './src/react/hocs/index.tsx',
    // group every redux util into a single module
    redux: './src/redux/index.js',
    'redux/redux-fetch': './src/redux/reduxFetch/index.js',
    // group every JS util into a single module
    utils: './src/utils/index.ts',
    'utils/async': './src/utils/async/index.ts',
    'utils/file': './src/utils/file/index.ts',
    'utils/localstorage': './src/utils/localstorage/index.ts',
    'utils/html': './src/utils/html/index.ts',
    'utils/http': './src/utils/http/index.ts',
    'utils/testers': './src/utils/testers/index.ts',
    'utils/validation': './src/utils/validation/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/index.js',
    libraryTarget: 'umd',
    library: 'modusbox-ui-components',
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
      filename: 'react/components/index.css',
      disable: false,
      allChunks: true,
    }),
    new CopyWebpackPlugin([
      {
        from: colorsSass,
        to: path.resolve(__dirname, 'dist', 'scss'),
      },
    ]),
  ],
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
          { loader: 'eslint-loader' },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
      },
      {
        test: /\.(css|scss)?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
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
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          keep_fnames: true, // IMPORTANT - https://github.com/facebook/create-react-app/issues/7236
        },
      }),
    ],
  },
  externals: {
    // This line says to just use the version of React that consumers of this
    // library have installed.
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
  },
};
