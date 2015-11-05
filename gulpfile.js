var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    fs = require('fs'),
    path = require('path'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    Builder = require('systemjs-builder'),
    notify = require('gulp-notify');

var argv = require('yargs').argv;

gulp.task('default',[]);


gulp.task('jsBundle', function() {

    var builder = new Builder({
        baseURL: 'file:' + path.resolve('./')
    });

    return builder.loadConfig('./config.js')
    .then(function() {
        builder.buildStatic('app', './build.js', { minify: true })
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
                './jspm_packages/github/tobiasahlin/SpinKit@1.2.2/scss',
                './jspm_packages/npm/mdi@1.2.65/scss'
            ],
            // sourceMap: true

        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./styles/'))
        .pipe(notify("Compiled sass successfully"));
});

//Watch task
gulp.task('watch',function() {
    gulp.watch('styles/**/*.scss',['styles']);
});