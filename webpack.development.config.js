var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var aliases = {
	views: 'src/views',
	icons: 'src/icons',
	reducers: 'src/reducers',
	store: 'src/store',
	utils: 'src/utils',
	react: path.resolve('./node_modules/react'),
};

/* Assign aliases */
var config = {
	entry: {
		bundle: ['webpack-hot-middleware/client', './src/Root'],
	},

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/dist/',
	},

	devtool: 'source-map',
	plugins: [
		//new HardSourceWebpackPlugin(),
		new webpack.DllReferencePlugin({
			context: process.cwd(),
			manifest: require(path.join(__dirname, 'dist', 'vendorPackages.json')),
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new CopyWebpackPlugin([{ from: 'assets/**/*' }]),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				VERSION: JSON.stringify(require('./package.json').version),
			},
		}),
	],

	resolve: {
		root: path.resolve(__dirname),
		alias: aliases,
		extensions: ['', '.js', '.css', '.scss'],
	},

	module: {
		loaders: [
			/*{
				test: /\.js/,
				loaders: ['react-hot', 'babel'],
				include: [path.join(__dirname, 'src')],
			},*/
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['react-hot', 'babel', 'eslint-loader'],
			},
			{
				test: /\.(css|scss)?$/,
				loaders: [
					'style-loader',
					'css-loader',
					'sass-loader',
					'postcss-loader',
				],
			},
			{
				include: /\.json$/,
				loaders: ['json-loader'],
			},
			{
				test: /\.png$/,
				loader: 'url',
				query: { limit: 8192, mimetype: 'image/png' },
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				loader: 'url',
				query: 'assets/fonts/[name].[ext]',
			},
			{
				test: /\.svg$/,
				loader:
					'svg-sprite?' +
					JSON.stringify({
						name: '[name]',
					}),
			},
		],
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
		//require('postcss-simple-vars')
	],
};

module.exports = config;
