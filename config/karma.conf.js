// Karma configuration
// Generated on Fri Dec 05 2014 10:41:44 GMT-0600 (CST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
	"../app/lib/angular/angular1.3.11/angular.js",
	"../app/lib/angular/angular1.3.11/angular-route.js",	
	"../karmatests/angular-mocks.js",
	"../app/js/app.js",
	"../app/js/services.js",
	"../app/js/controllers.js",
	"../app/js/filters.js",
	"../app/js/directives.js",
	"../app/prebuild/modules/login/login.js",
	"../app/prebuild/modules/home/home.js",
	"../app/prebuild/modules/logout/logout.js",
	"../app/prebuild/modules/es6/es6.js",
	"../app/prebuild/coremodules/cookies/cookies.js",
	"../app/prebuild/coremodules/conversions/conversions.js",
	"../app/prebuild/coremodules/maps/maps.js",
	"../app/prebuild/coremodules/tools/tools.js",
	"../app/prebuild/coremodules/wxattributes/wxattributes.js",
	"../app/prebuild/datamodules/firebase/firebase.js",
	"../app/prebuild/directivemodules/search/search.js",
	"../app/prebuild/directivemodules/footer/footer.js",
	"../app/prebuild/directivemodules/alert/alert.js",
	"https://cdn.firebase.com/js/client/1.1.1/firebase.js",
	"https://cdn.firebase.com/libs/angularfire/0.8.0/angularfire.min.js",
	"https://maps.googleapis.com/maps/api/js?key=AIzaSyD5Hsb6nr_wjoRkpEmOYiXCYuecjmUwT6A",
	"../app/modules/login/tests.js",
	"../app/modules/home/tests.js",
	"../app/modules/logout/tests.js",
//	"../app/modules/es6/tests.js",
	"../app/coremodules/cookies/tests.js",
    "../app/coremodules/conversions/tests.js",
    "../app/coremodules/maps/tests.js",
    "../app/coremodules/tools/tests.js",
    "../app/coremodules/wxattributes/tests.js",
    "../app/datamodules/firebase/tests.js",
	"../app/directivemodules/search/tests.js",
	"../app/directivemodules/footer/tests.js",
	"../app/directivemodules/alert/tests.js"
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        '../app/prebuild/modules/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
        reporters: [
            {
                type: 'html',
                dir: '../coverage/html/',
                watermarks: {
                    statements: [ 15, 50 ],
                    functions: [ 15, 50 ],
                    branches: [ 15, 50 ],
                    lines: [ 15, 50 ]
                }
            },
            {type: 'clover', dir: '../coverage/clover'},
            {type: 'text', dir: '../coverage/text/', file: 'coverage.txt'},
            {type: 'text-summary', dir: '../coverage/text/', file: 'coverage-summary.txt'}
        ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
