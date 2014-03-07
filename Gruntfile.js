
'use strict'

module.exports = function(grunt) {

	// Load all grunt tasks matching the `grunt-*` pattern.
	require('load-grunt-tasks')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings.
		app: {
			base:     'app',
			tempDir:  '.temp',
			buildDir: 'build',
			jsDir:    '<%= app.base %>/js',
			cssDir:   '<%= app.base %>/css',
			imageDir: '<%= app.base %>/img',
			bowerDir: '<%= app.base %>/bower_components'
		},

		// Runs a web server for viewing the app.
		connect: {
			// Options reference:
			// https://github.com/gruntjs/grunt-contrib-connect#options

			options: {
				port: 8000,
				hostname: 'localhost',
				base: ['<%= app.base %>'],
				livereload: true
			},
			server: {}
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			// Options reference:
			// https://github.com/gruntjs/grunt-contrib-watch#settings

			options: {
				livereload: true
			},
			bower: {
				files: ['<%= app.bowerDir %>/{,*/}*'],
				tasks: ['bowerInstall']
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
			// Options reference:
			// https://github.com/gruntjs/grunt-contrib-jshint#options

			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			lint: [
				'<%= app.base %>/{,*/}*.js'
			]
		},


		/* Build tasks
		   ======================================================================== */

		// Automatically inject Bower components into the app.
		bowerInstall: {
			// Options reference:
			// https://github.com/stephenplusplus/grunt-bower-install#getting-started

			app: {
				src: ['<%= app.base %>/index.html'],
				ignorePath: '<%= app.base %>/'
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them.
		useminPrepare: {
			// Options reference:
			// https://github.com/yeoman/grunt-usemin#options

			options: {
				dest: '<%= app.buildDir %>',
				staging: '<%= app.tempDir %>'
			},
			html: '<%= app.base %>/index.html'
		},

		// Performs rewrites based on the useminPrepare configuration.
		usemin: {
			// Options reference:
			// https://github.com/yeoman/grunt-usemin#options-1

			html: ['<%= app.buildDir %>/{,*/}*.html'],
			css: ['<%= app.buildDir %>/css/{,*/}*.css']

		}

	});

	grunt.registerTask('serve', [
		'bowerInstall',
		'connect',
		'watch',
		'jshint'
	]);

	grunt.registerTask('build', [
		// concat, cssmin and uglify tasks are handled by Usemin.

		'bowerInstall',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'usemin'
	]);

	grunt.registerTask('default', ['serve']);
};
