var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
//var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

var aliases = {
	'@mulesoft/anypoint-components': 'node_modules/@mulesoft/anypoint-components/lib',
	'@mulesoft/anypoint-styles': 'node_modules/@mulesoft/anypoint-styles/lib',
	/*'@mulesoft/anypoint-navbar': 'node_modules/@mulesoft/anypoint-navbar',*/
	'domains': 'src/domains',
	'views': 'src/views',
	'style': 'src/style',  
	'icons': 'src/icons',
	'components': 'src/components',
	'actions': 'src/actions',
	'constants': 'src/utils/constants',
	'models': 'src/models',
	'statics': 'src/statics',
	'validators': 'src/validators',
	'reducers': 'src/reducers',
	'providers': 'src/providers',
	'store': 'src/store',
	'styles': '@mulesoft/anypoint-styles',
	'util': '@mulesoft/anypoint-utils',
	'utils': 'src/utils',
	'HOCs': 'src/HOCs',
	react: path.resolve('./node_modules/react')	
}

/* Assign aliases */
var config = {
	entry: { 
		bundle: ['webpack-hot-middleware/client', './src/Root' ],
	},

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/dist/'
	},

	devtool: 'source-map',
	plugins: [
	 	//new HardSourceWebpackPlugin(),
		new webpack.DllReferencePlugin({
			context: process.cwd(),
			manifest: require( path.join(__dirname, 'dist','vendorPackages.json') )
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new CopyWebpackPlugin([
			{ from: 'assets/**/*' }
		]),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development'),
				VERSION: JSON.stringify( require('./package.json').version )
			}
        })
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
