const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  stories: ['../src/**/*.stories.[tj]s','../src/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-docs',
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.


    // This removes the default loader since and allow us to use
    const adHocLoadersTests = ['png', 'jpg' ,'gif', 'svg', 'eot', 'ttf', 'woff', 'woff2'];
    config.module.rules = config.module.rules.filter(rule => {
      if (rule.test.toString().includes('svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf')) {
        return false;
      }
      return true;
    })

    // resolve every directory under src directly
    config.resolve = {
      modules: [
        path.resolve(__dirname, '..', 'src'),
        'node_modules',
      ],
      extensions: ['.tsx', '.ts', '.js'],
    };

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    });

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader',
      query: { limit: 8192, mimetype: 'image/png' },
      include: path.resolve(__dirname, '../'),
    });
    
    config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.(eot|ttf|woff|woff2|md)$/,
      loader: 'file-loader',
      include: path.resolve(__dirname, '../'),
    });

    // Return the altered config
    return config;
  },
};