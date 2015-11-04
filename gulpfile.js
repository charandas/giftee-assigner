var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    fs = require('fs'),
    path = require('path'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    Builder = require('systemjs-builder'),
    notify = require('gulp-notify');

var argv = require('yargs').argv;

gulp.task('default',[]);


gulp.task('jsBundle', function() {

    var builder = new Builder({
        baseURL: 'file:' + path.resolve('./client')
    });

    return builder.loadConfig('./client/config.js')
    .then(function() {
        builder.buildSFX('js/main', './client/build.js', { minify: true })
        .then(function() {
            console.log('Build complete');
        })
        .catch(function(err) {
            console.log('Build error');
            console.log(err);
        });
    });
    /*.then(function() {
        gulp.src(['client/build.js'])
            .pipe(ngAnnotate({
                add: true
            }))
            .pipe(gulp.dest('client'));
    });*/
});

gulp.task('styles', function () {

    return gulp.src('./styles/main.scss')
        .pipe(sass({
            errLogToConsole: true,
            includePaths: [
                './jspm_packages/github/thoughtbot/bourbon@4.2.6/app/assets/stylesheets',
                './jspm_packages/github/lumapps/lumX@0.3.95/dist/scss',
                './jspm_packages/npm/mdi@1.2.65/scss'
            ],
            sourceMap: true

        }))
        .pipe(gulp.dest('./styles/'))
        .pipe(notify("Compiled sass successfully"));
});

//Watch task
gulp.task('watch',function() {
    gulp.watch('styles/**/*.scss',['styles']);
});