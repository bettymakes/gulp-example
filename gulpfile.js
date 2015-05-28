var gulp    = require('gulp'),
    uglify  = require('gulp-uglify');

// Creating default task
gulp.task('default', function(){

  // Loads any '.js' files in the /js directory
  gulp.src('js/*.js')
    // Minifies the code
    .pipe(uglify())
    // Saves the minified code into build/js directory
    .pipe(gulp.dest('build/js'))
});