var gulp    = require('gulp'),
    uglify  = require('gulp-uglify');

// Scripts Task 
// Uglifies JS
gulp.task('scripts', function(){
   // Loads any '.js' files in the /js directory
  gulp.src('js/*.js')
    // Minifies the code
    .pipe(uglify())
    // Compiles the minified code into build/js directory
    .pipe(gulp.dest('build/js'))
});

// Creating default task
gulp.task('default', function(){
 
});