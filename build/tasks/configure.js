/*jshint node: true */
'use strict';
var buildRules = require('../configure');
module.exports = function (grunt) {
	grunt.registerMultiTask('configure', function () {

		var done = this.async();
		var options = this.options({
      rules: ['lib/rules/**/*.json'],
      checks: ['lib/checks/**/*.json'],
      tools: ['lib/tools/**/*.json'],
      style: ['lib/**/*.less'],
      misc: ['lib/misc/**/*.json'],
			blacklist: ['metadata'],
			tags: ''
		});
		var that = this;
		this.files.forEach(function (file) {
			var commons = file.src[0];
			buildRules(grunt, options, commons, function (result) {
				grunt.file.write(that.data.dest.auto, 'axe._load(' + result.auto + ');');
				grunt.file.write(that.data.dest.descriptions, result.descriptions);
				done();
			});
		});
	});
};
