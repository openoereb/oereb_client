// Karma configuration
// Generated on Mon Sep 25 2017 08:48:45 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/jquery/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/openlayers/dist/ol-debug.js',
      'node_modules/proj4/dist/proj4-src.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/google-closure-library/closure/goog/base.js',
      'test/js/deps.js',
      {pattern: 'oereb_client/static/js/**/*.js', included: false, served: true},
      {pattern: 'node_modules/google-closure-library/closure/goog/**/*.js', included: false, served: true},
      'test/js/**/*.spec.js',
      'oereb_client/static/build/templates.js',
      {pattern: 'test/resources/**/*.*', included: false, served: true}
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'oereb_client/static/js/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    coverageReporter: {
      reporters: [
        {type : 'text'},
        {type : 'text-summary'}
      ]
    }

  })
};
