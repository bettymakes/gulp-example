var gulp    = require('gulp'),
    plumber = require('gulp-plumber'),
    sass    = require('gulp-sass'),
    uglify  = require('gulp-uglify');

// Task: SCRIPTS  =========================================================
// Uglifies JS
gulp.task('scripts', function(){
   // Loads any '.js' files in the /js directory
  gulp.src('js/*.js')
      // Plumber ensures if compiling js produces erros, gulp continues to run
      .pipe(plumber())
      // Minifies the code
      .pipe(uglify())
      // Outputs the minified code into build/js directory
      .pipe(gulp.dest('build/js'));
});

// Task: STYLES ===========================================================
// Testing for the interim, printing text to screen
gulp.task('styles', function(){
  // Loads any '.scss' files in the /styles directory
  gulp.src('styles/*.scss')
      // Plumber ensures if compiling scss produces erros, gulp continues to run
      .pipe(plumber())
      // Builds the scss (coverting to css)
      .pipe(sass())
      // Outputs the css into build/styles directory
      .pipe(gulp.dest('build/styles'));
});


// Task: WATCH ============================================================
// Watches JS
gulp.task('watch', function(){
  // Watches all .js files in /js directory for changes. On change, we will
  // run the 'scripts' gulp task.
  gulp.watch('js/*.js', ['scripts']);

  // Watches all .scss files in /styles directory for changes. On change, we will
  // run the 'styles' gulp task.
  gulp.watch('styles/*.scss', ['styles'])
});


// Task: DEFAULT ==========================================================
/* Note:  Instead of passing in a callback function, you can pass in an array
          as the second argument. The array will contain the names of any tasks
          you want to run within the 'default' task.
*/
gulp.task('default', ['scripts', 'styles', 'watch']);