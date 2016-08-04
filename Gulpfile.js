var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
gulp.task('scripts', function() {
    return gulp.src('src/*.js')
        .pipe(concat('utile.js'))
        .pipe(gulp.dest('build'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('build'))
        .pipe(notify({ message: 'Scripts task complete' }));
});