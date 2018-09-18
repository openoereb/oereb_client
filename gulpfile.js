var gulp = require('gulp');

var Dgeni = require('dgeni');

gulp.task('copyDocApp', function() {
  return gulp.src(['./docs/app/*.js', './docs/app/*.css', './docs/app/*.png'])
    .pipe(gulp.dest('./docs/build/src'));
});

gulp.task('dgeni', ['copyDocApp'], function() {

    // Notice how we are specifying which config to use
    // This will import the index.js from the /docs/config folder and will use that
    // configuration file while generating the documentation
    var dgeni = new Dgeni([require('./docs/config')]);

    // Using the dgeni.generate() method
    return dgeni.generate();
});