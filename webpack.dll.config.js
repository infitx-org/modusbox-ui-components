var webpack = require('webpack');

module.exports = {
	entry: {
		vendorPackages: [
			'react-addons-shallow-compare',
			'lodash',
			'react',
			'react-dom',
		],
	},

	output: {
		filename: '[name].dll.js',
		path: './dist/',
		library: '[name]',
	},

	plugins: [
		new webpack.DllPlugin({
			context: process.cwd(),
			name: '[name]',
			path: './dist/[name].json',
		}),
	],
};
