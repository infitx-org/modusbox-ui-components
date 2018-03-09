var path = require('path')
var webpack = require('webpack')

module.exports = {
	entry: {
		vendorPackages: [			
			'c3',
			'classnames',
			'deepmerge',
			'element-class',
			'fixed-data-table',
			'lodash',
			/*'marked',*/
			'normalizr',
			'perfect-scrollbar',
			'rc-notification',
			'rc-trigger',
			'react',
			'react-addons-shallow-compare',
			'react-contenteditable',
			'react-dom',
			'react-flexbox',
			'react-router',
			'react-virtualized',
			'react-zeroclipboard',
			/*'smallxhr'*/
		]
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
			path: './dist/[name].json'
		})
	]
}