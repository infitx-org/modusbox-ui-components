const pkg = require('./package.json');
const fs = require('fs')
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

/* Return a list of all component in src */
var componentsPath = path.join(__dirname, 'src','components')
var componentsList = fs.readdirSync( componentsPath ).filter(function (x) {
  return x !== '.DS_Store' && x !== 'index.js' && x !== 'variables.js' && x !== 'Common'
})


// Per Component Build 
const defaultExternals = []
const cssExternals = []
const componentExternals = []
const entryPoints = {
	index: './src/components/index.js',
	moduscomponents: [ './src/assets/styles/default.scss']
}

/* Assign aliases, define externs, define entrypoints */
for (var i = 0; i < componentsList.length; i++) {
	var c = componentsList[i]
	/* define entryPoints  */
	entryPoints[c] = ['./src/components/' + c + '/index.js']
	/* extern individual Components. TODO make better Regex  */
	componentExternals.push('../' + c)
	/* extern CSS modules  */
	cssExternals.push('../' + c + '/' + c + '.css')
}

var externals = defaultExternals
.concat( cssExternals )
.concat( Object.keys( pkg.dependencies ) )
.concat( componentExternals )
.concat([
	'react',
	'react-dom'
])

const srcPath = path.join(__dirname, 'src')

var config = {
	entry: entryPoints,
	output: {
		path: path.join(__dirname, 'lib'),
		filename: '[name]/index.js',
		library: pkg.name,
		libraryTarget: 'commonjs2'
	},
	externals: externals,
	plugins: [
		// Ignore all locale files of moment.js
    	new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    	new webpack.optimize.OccurenceOrderPlugin(true),
    	new webpack.optimize.DedupePlugin(),
    	/*new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false
			}
		}),*/
    	new ExtractTextPlugin('[name]/[name].css?[hash]-[chunkhash]-[contenthash]-[name]', {
			disable: false,
			allChunks: true,
		}),

		function () {
			this.plugin('done', function (stats) {
				//console.log( stats )
				/* Write file tree to dist
				require('fs').writeFileSync(
				path.join(__dirname, 'webpack_files_map.conf.json'),
				JSON.stringify(stats.toJson().assetsByChunkName)
				)
				*/
			})
		}
	],

	resolve: {		
		root: path.resolve(__dirname),
		alias: {},
		extensions: ['', '.js', '.jsx', '.scss']
	},

	module: {
		loaders: [
			{
				test: /\.js/,
				loaders: ['babel'],
				include: srcPath
			},			
			{ test: /\.(css|scss)?$/, 
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?localIdentName=[hash:base64:5]&camelCase!sass-loader!postcss-loader',		
				)
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
	]
}

module.exports = config
