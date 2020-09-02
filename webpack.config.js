const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const colorsSass = path.resolve(
  __dirname,
  'src',
  'react',
  'assets',
  'styles',
  'vars',
  'colors.scss',
);

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, 'src'),
  entry: {
    // group every react util into a single module
    'react/components': 'react/components/index.js',
    'react/hooks': 'react/hooks/index.ts',
    'react/hocs': 'react/hocs/index.tsx',

    // group every redux util into a single module
    redux: 'rredux/index.ts',
    'redux/hooks': 'rredux/hooks/index.ts',
    'redux/injectors': 'rredux/injectors/index.ts',
    'redux/redux-fetch': 'rredux/reduxFetch/index.js',

    // group every JS util into a single module
    utils: 'utils/index.ts',
    'utils/async': 'utils/async/index.ts',
    'utils/file': 'utils/file/index.ts',
    'utils/localstorage': 'utils/localstorage/index.ts',
    'utils/html': 'utils/html/index.ts',
    'utils/http': 'utils/http/index.ts',
    'utils/testers': 'utils/testers/index.ts',
    'utils/validation': 'utils/validation/index.ts',
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
          {
            loader: 'eslint-loader',
            options: {
              cache: true,
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                declarationDir: './dist',
                outDir: './dist',
              },
            },
          },
        ],
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
    redux: {
      root: 'Redux',
      commonjs2: 'redux',
      commonjs: 'redux',
      amd: 'redux',
      umd: 'redux',
    },
    'react-redux': {
      root: 'ReactRedux',
      commonjs2: 'react-redux',
      commonjs: 'react-redux',
      amd: 'react-redux',
      umd: 'react-redux',
    },
  },
};
