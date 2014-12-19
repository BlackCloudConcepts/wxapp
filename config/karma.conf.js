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
	"../app/lib/angular/angular.js",
	"../app/lib/angular/angular-route.js",	
	"../karmatests/angular-mocks.js",
	"../app/js/app.js",
	"../app/js/services.js",
	"../app/js/controllers.js",
	"../app/js/filters.js",
	"../app/js/directives.js",
	"../app/modules/login/login.js",
	"../app/modules/home/home.js",
	"../app/modules/logout/logout.js",
	"../app/coremodules/cookies/cookies.js",
	"../app/coremodules/conversions/conversions.js",
	"../app/coremodules/maps/maps.js",
	"../app/datamodules/firebase/firebase.js",
	"https://cdn.firebase.com/js/client/1.1.1/firebase.js",
	"https://cdn.firebase.com/libs/angularfire/0.8.0/angularfire.min.js",
	"https://maps.googleapis.com/maps/api/js?key=AIzaSyD5Hsb6nr_wjoRkpEmOYiXCYuecjmUwT6A",
	"../app/modules/login/tests.js",
	"../app/modules/home/tests.js",
	"../app/modules/logout/tests.js",
	"../app/coremodules/cookies/tests.js",
        "../app/coremodules/conversions/tests.js",
        "../app/coremodules/maps/tests.js",
        "../app/datamodules/firebase/tests.js"
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


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
