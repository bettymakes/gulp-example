var express     = require('express'),
    gulp        = require('gulp'),
    plumber     = require('gulp-plumber'),
    sass        = require('gulp-sass'),
    tinyLr      = require('tiny-lr')(),
    uglify      = require('gulp-uglify');

// Middleware
var connectLivereload = require('connect-livereload')();

// CONSTANTS
var EXPRESS_PORT      = 4000,
    EXPRESS_ROOT      = './build',
    LIVERELOAD_PORT   = 35729;

// Fn: Starting Express Server
function startExpress(){
  console.log("starting express server");
  var app = express();
  app.use(connectLivereload);
  app.use(express.static(EXPRESS_ROOT))
  app.listen(EXPRESS_PORT);
}

// Fn: Starting Tiny-Lr
function startLivereload(){
  tinyLr.listen(LIVERELOAD_PORT);
}

// Fn: Notify Livereload
function notifyLivereload(event){
  var fileName = require('path').relative(EXPRESS_ROOT, event.path);
  tinyLr.changed({
    body: {
      files: [fileName]
    }
  });
}

// Fn: Logging error
function errorLog(error){
  console.error(error);
  this.emit('end');
};

// Task: EXPRESS  =========================================================
gulp.task('expressServer', function(){
  console.log('EXPRESS SERVER TASK');
  startExpress();
});

// Task: LIVERELOAD  =========================================================
gulp.task('livereload', function(){
  startLivereload();
});

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
      /* // Plumber ensures if compiling scss produces erros, gulp continues to run
      .pipe(plumber()) */
      // Builds the scss (coverting to css)
      .pipe(sass())
      // Using on error instead of plumber to throw errors. Should be included 
      // after the process that attempts to compile/build
      /* Method 1:
      .on('error', console.error.bind(console))*/
      // Method 2: errorLog Fn is declared up top
      .on('error', errorLog)
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
  gulp.watch('styles/*.scss', ['styles']);

  gulp.watch('index.html', ['index']);
  gulp.watch('*.html', notifyLivereload);
});


gulp.task('index', function(){
  gulp.src('index.html')
  .pipe(gulp.dest('build'));
});

// Task: DEFAULT ==========================================================
/* Note:  Instead of passing in a callback function, you can pass in an array
          as the second argument. The array will contain the names of any tasks
          you want to run within the 'default' task.
*/
gulp.task('default', 
  ['index', 'scripts', 'styles', 'expressServer', 'livereload', 'watch']);




