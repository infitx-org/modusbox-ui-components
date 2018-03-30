#!/usr/bin/env node
var path = require('path')
var exec = require('child_process').exec
var cwd = process.cwd()
if (cwd.indexOf('@') === -1) {
  console.log('Building components')
  var webpackPath = path.join(cwd, 'node_modules', '.bin', 'webpack')
  var command = webpackPath + ' --config webpack.production.config.js --inline --bail'
  exec(command, {cwd: cwd}, function (error, stdout, stderr) {
    if (error) {
      console.warn(error)
    }    
    console.log('Built Components')
  })
} else {
  console.log('in node_modules context, stop DLL build on postinstall')
}