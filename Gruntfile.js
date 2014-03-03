
'use strict'

module.exports = function(grunt) {

	// Load all grunt tasks matching the `grunt-*` pattern.
	require('load-grunt-tasks')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings.
		app: {
			base:     'app',
			jsDir:    '<%= app.base %>/js',
			cssDir:   '<%= app.base %>/css',
			imageDir: '<%= app.base %>/img',
			bowerDir: '<%= app.base %>/bower_components'
		},

		// Runs a web server for viewing the app.
		connect: {
			options: {
				// Options reference:
				// https://github.com/gruntjs/grunt-contrib-connect#options

				port: 8000,
				hostname: 'localhost',
				base: ['<%= app.base %>'],
				livereload: true
			},
			server: {}
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			options: {
				// Options reference:
				// https://github.com/gruntjs/grunt-contrib-watch#settings
				livereload: true
			},
			js: {
				files: ['<%= app.jsDir %>/{,*/}*.js'],
				tasks: ['newer:jshint:lint']
			},
			livereload: {
				files: [
					'<%= app.base %>/{,*/}*.html',
					'<%= app.cssDir %>/{,*/}*.css',
					'<%= app.imageDir %>/{,*/}*.{png,jpg,jpeg,gif}'
				]
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				// Options reference:
				// https://github.com/gruntjs/grunt-contrib-jshint#options

				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			lint: [
				'<%= app.base %>/{,*/}*.js'
			]
		}

	});

	grunt.registerTask('serve', [
		'connect',
		'watch',
		'jshint'
	]);

	grunt.registerTask('default', ['serve']);
};
