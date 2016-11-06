'user strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');

gulp.task('html_build', function() {
  return gulp.src('./src/*.html')
    .pipe(fileinclude({
      prefix: '@gulp@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('sass_build', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch(['src/*.html', 'src/html_templates/*'], ['html_build']);
  gulp.watch('src/scss/*.scss', ['sass_build']);
});

gulp.task('build', [ 'html_build',  'sass_build']);

gulp.task('default', ['build', 'watch']);


