module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // ----------------------------------------
        // Code Validation
        // ----------------------------------------
        jshint: {
            custom_js: {
                options: {
                    '-W041': false, // !== (changing this will break stuff)
                    '-W080': false, // var x = undefined (we can turn this on later but its a small detail)
                    '-W008': false, // A leading decimal point can be confused with a dot: '{a}' (whatever)
                    '-W083': false  // Don't make functions within a loop (requires individual thought if we think its an issue)
                },
                files: {
                    src: [
                        'Gruntfile.js',
			'app/modules/login/login.js',
			'app/modules/home/home.js',
			'app/modules/logout/logout.js',
			'app/modules/es6/es6.js',
			'app/modules/footer/footer.js',
			'app/modules/nested/nested.js',
			'app/modules/templating/templating.js',
			'app/coremodules/cookies/cookies.js',
			'app/coremodules/conversions/conversions.js',
			'app/coremodules/maps/maps.js',
			'app/coremodules/tools/tools.js',
			'app/coremodules/wxattributes/wxattributes.js',
			'app/datamodules/firebase/firebase.js',
			'app/directivemodules/search/search.js',
			'app/directivemodules/footer/footer.js',
			'app/directivemodules/alert/alert.js'
                    ]
                }
            }
        },
	'6to5': {
        	options: {
            		sourceMap: true
        	},
        	dist: {
			files: {
				'app/prebuild/modules/login/login.js': 'app/modules/login/login.js',
				'app/prebuild/modules/home/home.js': 'app/modules/home/home.js',
				'app/prebuild/modules/logout/logout.js': 'app/modules/logout/logout.js',
				'app/prebuild/modules/es6/es6.js': 'app/modules/es6/es6.js',
				'app/prebuild/modules/footer/footer.js': 'app/modules/footer/footer.js',
				'app/prebuild/modules/nested/nested.js': 'app/modules/nested/nested.js',
				'app/prebuild/modules/templating/templating.js': 'app/modules/templating/templating.js',
				'app/prebuild/coremodules/cookies/cookies.js': 'app/coremodules/cookies/cookies.js',
				'app/prebuild/coremodules/conversions/conversions.js': 'app/coremodules/conversions/conversions.js',
				'app/prebuild/coremodules/maps/maps.js': 'app/coremodules/maps/maps.js',
				'app/prebuild/coremodules/tools/tools.js': 'app/coremodules/tools/tools.js',
				'app/prebuild/coremodules/wxattributes/wxattributes.js': 'app/coremodules/wxattributes/wxattributes.js',
				'app/prebuild/datamodules/firebase/firebase.js': 'app/datamodules/firebase/firebase.js',
				'app/prebuild/directivemodules/search/search.js': 'app/directivemodules/search/search.js',
				'app/prebuild/directivemodules/footer/footer.js': 'app/directivemodules/footer/footer.js',
				'app/prebuild/directivemodules/alert/alert.js': 'app/directivemodules/alert/alert.js'
			}
        	}
    	},
	traceur: {
    		options: {
      			experimental: true,
			blockBinding: true,
			includeRuntime: true,
			moduleNames: false,
      			moduleNaming: {
		        	stripPrefix: "",
        			addPrefix: ""
      			}
    		},
    		custom: {
      			files: [{
        			expand: true,
        			cwd: 'app/',
        			src: [
					'modules/login/login.js',
					'modules/home/home.js',
					'modules/logout/logout.js',
					'modules/es6/es6.js',
					'modules/footer/footer.js',
					'modules/nested/nested.js',
					'modules/templating/templating.js',
					'coremodules/cookies/cookies.js',
					'coremodules/conversions/conversions.js',
					'coremodules/maps/maps.js',
					'coremodules/tools/tools.js',
					'coremodules/wxattributes/wxattributes.js',
					'datamodules/firebase/firebase.js',
					'directivemodules/search/search.js',
					'directivemodules/footer/footer.js',
					'directivemodules/alert/alert.js'
				],
        			dest: 'app/prebuild-traceur/'
      			}]
    		}
  	},
	uglify: {
    		options: {
      			compress: {
//        			drop_console: true
      			}
    		},
    		my_target: {
      			files: {
        			'app/build/wxapp.min.js': [
					'app/lib/angular/angular.js',
					'app/lib/angular/angular-route.js',
					'app/lib/angular/angular-sanitize.js',
					'app/lib/angular/angular-resource.js',
					'app/js/app.js',
					'app/js/services.js',
					'app/js/controllers.js',
					'app/js/filters.js',
					'app/js/directives.js',
					// 6 to 5 
					'app/prebuild/modules/login/login.js',
					'app/prebuild/modules/home/home.js',
					'app/prebuild/modules/logout/logout.js',
					'app/prebuild/modules/es6/es6.js',
					'app/prebuild/modules/footer/footer.js',
					'app/prebuild/modules/nested/nested.js',
					'app/prebuild/modules/templating/templating.js',
					'app/prebuild/coremodules/cookies/cookies.js',
					'app/prebuild/coremodules/conversions/conversions.js',
					'app/prebuild/coremodules/maps/maps.js',
					'app/prebuild/coremodules/tools/tools.js',
					'app/prebuild/coremodules/wxattributes/wxattributes.js',
					'app/prebuild/datamodules/firebase/firebase.js',
					'app/prebuild/directivemodules/search/search.js',	
					'app/prebuild/directivemodules/footer/footer.js',	
					'app/prebuild/directivemodules/alert/alert.js'
					// Traceur
					/*
					'app/prebuild-traceur/modules/login/login.js',
					'app/prebuild-traceur/modules/home/home.js',
					'app/prebuild-traceur/modules/logout/logout.js',
					'app/prebuild-traceur/modules/es6/es6.js',
					'app/prebuild-traceur/modules/footer/footer.js',
					'app/prebuild-traceur/modules/nested/nested.js',
					'app/prebuild-traceur/modules/templating/templating.js',
					'app/prebuild-traceur/coremodules/cookies/cookies.js',
					'app/prebuild-traceur/coremodules/conversions/conversions.js',
					'app/prebuild-traceur/coremodules/maps/maps.js',
					'app/prebuild-traceur/coremodules/tools/tools.js',
					'app/prebuild-traceur/coremodules/wxattributes/wxattributes.js',
					'app/prebuild-traceur/datamodules/firebase/firebase.js',
					'app/prebuild-traceur/directivemodules/search/search.js',	
					'app/prebuild-traceur/directivemodules/footer/footer.js',	
					'app/prebuild-traceur/directivemodules/alert/alert.js'	
					*/
				]
      			}
    		}
  	},
	sass: {
   	 	dist: {
      			files: {
        			'app/prebuild/modules/home/home.css': 'app/modules/home/home.scss',
        			'app/prebuild/modules/login/login.css': 'app/modules/login/login.scss',
        			'app/prebuild/modules/logout/logout.css': 'app/modules/logout/logout.scss',
        			'app/prebuild/directivemodules/search/search.css': 'app/directivemodules/search/search.scss'
      			}
    		}
  	},
        cssmin: {
            minify: {
                files: {
                    'app/build/wxapp.min.css': [
			'app/css/app.css',
			'app/css/signin.css',
			'app/prebuild/modules/home/home.css',
			'app/prebuild/modules/login/login.css',
			'app/prebuild/modules/logout/logout.css',
			'app/prebuild/directivemodules/search/search.css'
                    ]
                },
                options: {
                    keepSpecialComments: '0'
                }
            }
        },
	watch: {
		css: {
			files: [
				'app/css/*.css',
				'app/**/*.scss'
			],
			tasks: [
				'sass',
				'cssmin:minify'
			],
			options: {
				nospawn: true
			}
		},
		js: {
			files: [
				'app/modules/login/login.js',
				'app/modules/home/home.js',
				'app/modules/logout/logout.js',
				'app/modules/es6/es6.js',
				'app/modules/footer/footer.js',
				'app/modules/nested/nested.js',
				'app/modules/templating/templating.js',
				'app/coremodules/cookies/cookies.js',
				'app/coremodules/conversions/conversions.js',
				'app/coremodules/maps/maps.js',
				'app/coremodules/tools/tools.js',
				'app/coremodules/wxattributes/wxattributes.js',
				'app/datamodules/firebase/firebase.js',
				'app/directivemodules/search/search.js',	
				'app/directivemodules/footer/footer.js',	
				'app/directivemodules/alert/alert.js'				
			],
			tasks: [
//				'jshint:custom_js',
				'6to5',
				'traceur:custom',
				'uglify:my_target'
			],
			options: {
				nospawn: true
			}
		}
	}
    });

    grunt.registerTask('watch', 'watch');
    grunt.registerTask('build-dev', [
	'sass',
        'cssmin:minify',
	'6to5',
	'traceur:custom',
	'uglify:my_target'
    ]);
    grunt.registerTask('build-prod', [
	'sass',
        'cssmin:minify',
	'6to5',
	'traceur:custom',
	'uglify:my_target'
    ]);

    	grunt.loadNpmTasks('grunt-contrib-watch');
    	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-6to5');
	grunt.loadNpmTasks('grunt-traceur');
    	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
};
