var webpack = require('webpack')

module.exports = {
	entry: {
		vendorPackages: [			
			'c3',
			'classnames',						
			'fixed-data-table',
			'lodash',			
			'rc-notification',
			'rc-trigger',
			'react',
			'react-addons-shallow-compare',
			'react-contenteditable',
			'react-dom',
			'react-virtualized',
			'react-zeroclipboard',
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