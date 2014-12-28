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
			'app/coremodules/cookies/cookies.js',
			'app/coremodules/conversions/conversions.js',
			'app/coremodules/maps/maps.js',
			'app/datamodules/firebase/firebase.js',
			'app/directivemodules/search/search.js'
                    ]
                }
            }
        },
	uglify: {
    		options: {
      			compress: {
        			drop_console: true
      			}
    		},
    		my_target: {
      			files: {
        			'app/build/wxapp.min.js': [
					'app/lib/angular/angular.js',
					'app/lib/angular/angular-route.js',
					'app/js/app.js',
					'app/js/services.js',
					'app/js/controllers.js',
					'app/js/filters.js',
					'app/js/directives.js',
					'app/prebuild/modules/login/login.js',
					'app/prebuild/modules/home/home.js',
					'app/prebuild/modules/logout/logout.js',
					'app/prebuild/coremodules/cookies/cookies.js',
					'app/prebuild/coremodules/conversions/conversions.js',
					'app/prebuild/coremodules/maps/maps.js',
					'app/prebuild/datamodules/firebase/firebase.js',
					'app/prebuild/directivemodules/search/search.js'//,	
//					'app/lib/firebase/firebase.js',
//					'app/lib/firebase/angularfire.min.js',
//					'app/lib/bootstrap/ui-bootstrap-tpls.min.js'
				]
      			}
    		}
  	},
        cssmin: {
            minify: {
                files: {
                    'app/build/wxapp.min.css': [
			'app/css/app.css',
			'app/css/signin.css'
                    ]
                },
                options: {
                    keepSpecialComments: '0'
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
				'app/prebuild/coremodules/cookies/cookies.js': 'app/coremodules/cookies/cookies.js',
				'app/prebuild/coremodules/conversions/conversions.js': 'app/coremodules/conversions/conversions.js',
				'app/prebuild/coremodules/maps/maps.js': 'app/coremodules/maps/maps.js',
				'app/prebuild/datamodules/firebase/firebase.js': 'app/datamodules/firebase/firebase.js',
				'app/prebuild/directivemodules/search/search.js': 'app/directivemodules/search/search.js'
			}
        	}
    	},
	watch: {
		css: {
			files: [
				'app/css/*.css'
			],
			tasks: [
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
				'app/coremodules/cookies/cookies.js',
				'app/coremodules/conversions/conversions.js',
				'app/coremodules/maps/maps.js',
				'app/datamodules/firebase/firebase.js',
				'app/directivemodules/search/search.js'				
			],
			tasks: [
//				'jshint:custom_js',
				'6to5',
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
        'cssmin:minify',
	'6to5',
	'uglify:my_target'
    ]);
    grunt.registerTask('build-prod', [
        'cssmin:minify',
	'6to5',
	'uglify:my_target'
    ]);

    	grunt.loadNpmTasks('grunt-contrib-watch');
    	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-6to5');
    	grunt.loadNpmTasks('grunt-contrib-cssmin');
};
