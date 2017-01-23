/*/* File: gulpfile.js */

// grab our gulp packages
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
pump = require('pump');

// define the default task and add the watch task to it
gulp.task('default', ['compress']);

//js minify
gulp.task('compress',['copy'], function(cb) {
    pump([
            gulp.src('webcomponents/**/*.js'),
            uglify(),
            gulp.dest('dist')
        ],
        cb
    );
});
gulp.task('copy', function() {
   gulp.src(['webcomponents/**/*']).pipe(gulp.dest('dist/**/*'));
})
*/