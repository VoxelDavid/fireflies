
'use strict';

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
			sassDir:  '<%= app.base %>/sass',
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
				livereload: true
			},
			dev: {
				options: {
					base: '<%= app.base %>'
				}
			},
			build: {
				options: {
					livereload: false,
					base: '<%= app.buildDir %>'
				}
			}
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			// Options reference:
			// https://github.com/gruntjs/grunt-contrib-watch#settings

			bower: {
				files: ['<%= app.bowerDir %>/{,*/}*'],
				tasks: ['bowerInstall']
			},
			compass: {
				files: ['<%= app.sassDir %>/{,*/}*.{scss,sass}'],
				tasks: ['compass:compile']
			},
			js: {
				options: {
					livereload: true
				},
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

		// Compiles Sass to CSS and generates necessary files if requested
		compass: {
			// Options reference:
			// https://github.com/gruntjs/grunt-contrib-compass#options

			options: {
				sassDir: '<%= app.sassDir %>',
				cssDir: '<%= app.cssDir %>',
				importPath: '<%= app.bowerDir %>',
				noLineComments: true
			},
			compile: {}
		},

		// Empties the directories to start fresh.
		clean: {
			build: [
				// Remove everything inside the build directories.
				'<%= app.tempDir %>/*',
				'<%= app.buildDir %>/*'
			],
			buildDirs: [
				// Remove the build directories themselves.
				'<%= app.tempDir %>',
				'<%= app.buildDir %>',
				'.sass-cache'
			]
		},

		// Copies remaining files to places other tasks can use
		copy: {
			build: {
				expand: true,
				cwd: '<%= app.base %>',
				src: [
					// Don't copy any .js files, those are handled by the 'usemin' tasks.
					'img/**',
					'js/views/**',
					'js/data.json',
					'*.html'
				],
				dest: '<%= app.buildDir %>'
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
		},

		// Allow the use of non-minsafe AngularJS files. Automatically makes it
		// minsafe compatible so Uglify does not destroy the ng references
		ngmin: {
			// Options reference:
			// https://github.com/btford/grunt-ngmin#example

			build: {
				expand: true,
				cwd: '<%= app.tempDir %>/concat/js',
				src: '*.js',
				dest: '<%= app.tempDir %>/concat/js'
			}
		}

	});

	grunt.registerTask('serve', function(target) {
		if (target === 'build') {
			return grunt.task.run(['connect:build:keepalive']);
		}

		grunt.task.run([
			'bowerInstall',
			'connect:dev',
			'compass:compile',
			'watch',
		])
	})

	grunt.registerTask('build', [
		// concat, cssmin and uglify tasks are handled by Usemin.

		'bowerInstall',
		'clean:build',
		'useminPrepare',
		'compass:compile',
		'concat',
		'ngmin',
		'cssmin',
		'copy:build',
		'uglify',
		'usemin'
	]);

	grunt.registerTask('default', ['serve']);
};
