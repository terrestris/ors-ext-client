/* eslint-env node */
/* eslint max-len: 0 */
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {

  var files = [
    'https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/classic/theme-neptune/resources/theme-neptune-all_1.css',
    'https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/classic/theme-neptune/resources/theme-neptune-all_2.css',
    'https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/classic/theme-neptune/resources/theme-neptune-all.css',
    'node_modules/@geoext/openlayers-legacy/dist/ol.css',
    'node_modules/@geoext/openlayers-legacy/dist/ol.js',
    'node_modules/moment/min/moment-with-locales.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/ext-all.js',
    'https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/packages/ux/classic/ux.js',
    // GeoExt source files
    {
      pattern: 'node_modules/@geoext/geoext/src/**/*.js',
      included: true
    },
    // GeoExt classic toolkit source files
    {
      pattern: 'node_modules/@geoext/geoext/classic/**/*.js',
      included: true
    }, {
      pattern: 'node_modules/@terrestris/basigx/src/**/*.js',
      included: true
    },
    {
      pattern: 'src/**/*.js',
      included: true
    }, {
      pattern: 'classic/**/*.js',
      included: true
    },
    'https://cdn.jsdelivr.net/npm/proj4@2.5.0/dist/proj4-src.min.js',
    'test/test-helper-functions.js',
    'test/**/*.js',
    {pattern: 'test/resources/**/*', watched: false, included: false, served: true}
  ];

  config.set({
    basePath: '.',

    // proxies: {
    //   '/resources': '/base/test/resources',
    //   '/spec': '/base/test/spec',
    //   '/BasiGX': '/base/src'
    // },

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'expect', 'sinon'],

    // list of files / patterns to load in the browser
    files: files,

    // list of files to exclude
    exclude: [
    ],

    preprocessors: {
      'src/**/*.js': ['coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

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
    browsers: [
      'ChromeNoSandbox'
      // 'Firefox',
      // 'Chromium_no_sandbox'
    ],

    customLaunchers: {
      ChromeNoSandbox: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-web-security',
          '--disable-gpu',
          // Without a remote debugging port, Google Chrome exits immediately.
          '--remote-debugging-port=9999',
          '--remote-debugging-address=1.1.1.1'
        ]
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
