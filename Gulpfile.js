var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    jsdoc = require('gulp-jsdoc3'),

    del = require('del');
gulp.task('doc', function (cb) {
    //var config = require('./docs.json');
    gulp.src(['README.md', './src/**/*.js'], {read: false})
        .pipe(jsdoc( cb))
        //.pipe(jsdoc(config, cb))
        .pipe(notify({ message: 'Doc creation complete' }));
});

gulp.task('build', function() {
    return gulp.src('src/*.js')
        .pipe(concat('utile.js'))
        .pipe(gulp.dest('build'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('build'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('quick copy to dewolfe_theme_2',function(){
    return gulp.src('build/*.js').pipe(gulp.dest('/Users/richard/PhpstormProjects/unity_www/src/themes/dewolfe_two/bower_components/codevanilla_utile/build/')).pipe(notify({ message: 'copied to dewolfe_theme_2' }));
})

