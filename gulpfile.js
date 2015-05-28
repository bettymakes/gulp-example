var gulp    = require('gulp'),
    uglify  = require('gulp-uglify');

// Task: SCRIPTS  =========================================================
// Uglifies JS
gulp.task('scripts', function(){
   // Loads any '.js' files in the /js directory
  gulp.src('js/*.js')
    // Minifies the code
    .pipe(uglify())
    // Compiles the minified code into build/js directory
    .pipe(gulp.dest('build/js'));
});

// Task: STYLES ===========================================================
// Testing for the interim, printing text to screen
gulp.task('styles', function(){
  console.log('Testing');
});


// Task: WATCH ============================================================
// Watches JS
gulp.task('watch', function(){
  // Watches all .js files in /js directory for changes. On change, we will
  // run the 'scripts' gulp task.
  gulp.watch('js/*.js', ['scripts']);
});


// Task: DEFAULT ==========================================================
/* Note:  Instead of passing in a callback function, you can pass in an array
          as the second argument. The array will contain the names of any tasks
          you want to run within the 'default' task.
*/
gulp.task('default', ['scripts', 'styles', 'watch']);