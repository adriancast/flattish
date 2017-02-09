var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var jade = require('gulp-jade');


gulp.task('default', function() {
  livereload.listen();
  fileTracker();
});

gulp.task('server', function() {
  startServer();
  livereload.listen();
  fileTracker();
});

gulp.task('html', function(){
	gulp.src('./*.html')
    .pipe(livereload());
})

gulp.task('js', function(){
	gulp.src('./*.js')
    .pipe(livereload());
})

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload());
});


/*
* This keeps track of the files
*/
function fileTracker() {
/* When a file is modified, runs the task in the square brackets */
  gulp.watch(['./*.jade','template/*.jade'], ['jade']);
  gulp.watch('sass/*.sass', ['sass']);
  gulp.watch('js/*.js', ['js']);
}

/*
* Server starts at port 1337
*/
function startServer() {
    gulp.src('./dist/')
      .pipe(webserver({
        open: true,
        port: 1337,
        fallback: 'dist/index.html'
      }));
}
/*
*Jade precompiler, compiles the HTML to the dist folder.
*/

gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src('./*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload());
});
