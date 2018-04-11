#!/usr/bin/env node
var path = require('path');
var exec = require('child_process').exec;
var cwd = process.cwd();

var webpackPath = path.join(cwd, 'node_modules', '.bin', 'webpack');
if (cwd.indexOf('node_modules') !== -1) {
	webpackPath = path.join(cwd, '..','.bin','webpack');
}	
	
	console.log('Building components');
	var command = webpackPath + ' --config webpack.production.config.js --inline --bail';
	exec(command, { cwd: cwd }, function(error, stdout, stderr) {
		if (error) {
			console.warn(error);
		}
		console.log('Built Components');
	});

