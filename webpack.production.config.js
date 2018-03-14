const pkg = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var aliases = {
	'@mulesoft/anypoint-components': 'node_modules/@mulesoft/anypoint-components/lib',
	'@mulesoft/anypoint-styles': 'node_modules/@mulesoft/anypoint-styles/lib',
	react: path.resolve('./node_modules/react')	
}

const libraryName = pkg.name;
const outputFile = libraryName + '.js';
/* Assign aliases */
var config = {
	entry: path.join(__dirname, '/src/index.js'),
	output: {
		path: path.join(__dirname, 'lib'),
		filename: outputFile,
		library: libraryName,
		libraryTarget: 'commonjs2'
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM'
	},
	devtool: 'source-map',
	plugins: [
	],

	resolve: {		
		root: path.resolve(__dirname),
		alias: aliases,
		extensions: ['', '.js','.css']
	},

	module: {
		loaders: [
			{
				test: /\.js/,
				loaders: ['react-hot', 'babel'],
				include: [path.join(__dirname, 'src')]
			},
			{
				test: /\.css?$/,
				loaders: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				include: /\.json$/,
				loaders: ['json-loader']
			},
			{
				test: /\.png$/,
				loader: 'url',
				query: { limit: 8192, mimetype: 'image/png' }
			},      
			{
                test: /\.(eot|ttf|woff|woff2)$/,
                loader:'url',
                query: 'assets/fonts/[name].[ext]'
            },
			{
				test: /\.svg$/,
				loader: 'svg-sprite?' + JSON.stringify({
					name: '[name]'          
				})
			}
		]
	},
	postcss: [
		/* enable css @imports like Sass/Less */
		//require('postcss-import'),
		/* enable nested css selectors like Sass/Less */
		require('postcss-nested'),
		/* enable extend class */
		require('postcss-extend'),
		/* autoprefix for different browser vendors */
		require('autoprefixer'),
		/* require global variables */
		require('postcss-simple-vars')({
			variables: function () {
				return require('@mulesoft/anypoint-styles/lib/variables')
			}
		})
	]
}

module.exports = config
