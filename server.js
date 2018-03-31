var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var path = require('path');
var fs = require('fs');
var Express = require('express');
var http = require('http');
var app = new Express();
var port = undefined;
var appBaseName = '';
var isDevelopment = process.env.NODE_ENV === 'development';

// CORS CONFIGURATIONS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Authorization, X-Requested-With'
	);
	next();
});

// use webpack if development
if (isDevelopment) {
	port = 10000;
	//appBaseName = require('./config/environments').development.appBaseName

	var config = require('./webpack.development.config');
	var compiler = webpack(config);
	app.use(
		webpackDevMiddleware(compiler, {
			noInfo: true,
			publicPath: config.output.publicPath,
			historyApiFallback: true,
		})
	);
	app.use(webpackHotMiddleware(compiler));

	// handle webpack DLL files
	app.get('/dist/vendorPackages.dll.js', function(req, res, next) {
		res.sendFile(path.join(__dirname, '/dist/vendorPackages.dll.js'));
	});

	app.get(appBaseName + '/cmp/:cmp', function(req, res, next) {
		var file = path.join(__dirname, '/src/views/All/' + req.params.cmp + '.js');
		var content, err;

		try {
			content = fs.readFileSync(file, 'utf8');
			res.send(content);
		} catch (e) {
			res.status(500);
			res.send(e);
		}
	});

	// Handle routing on UI with React Router
	// this is the path serving the files
	app.get(appBaseName + '/*', function(req, res, next) {
		res.sendFile(path.join(__dirname, '/index.html'));
	});
} else {
	app.get('*.js', function(req, res, next) {
		req.url = req.url + '.gz';
		res.set('Content-Encoding', 'gzip');
		next();
	});
	port = 10001;
	//appBaseName = require('./config/environments').local.appBaseName

	// add custom listener for /dist when testing production version
	app.use('*bundle.js.gz', function(req, res) {
		res.sendFile(path.join(__dirname, '/dist/bundle.js.gz'));
	});

	app.get(appBaseName + '/', function(req, res, next) {
		res.sendFile(path.join(__dirname, '/dist/index.html'));
	});

	// Handle routing on UI with React Router
	// this is the path serving the files
	app.get(appBaseName + '/*', function(req, res, next) {
		res.sendFile(path.join(__dirname, '/dist/index.html'));
	});
}

// HTTPS configuration
var server = http.createServer(app).listen(port, function(error) {
	if (error) {
		console.error(error);
	} else {
		console.info(
			'\n🌎  Listening on port %s.\n Open up \x1b[31m\x1b[1mhttp://localhost:%s/\x1b[0m in your browser.',
			port,
			port + appBaseName
		);
	}
});
