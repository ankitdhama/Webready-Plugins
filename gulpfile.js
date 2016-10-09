var gulp = require('gulp');
    gulpjade = require('gulp-jade'),
    sass = require('gulp-ruby-sass'),
    csso = require('gulp-csso'),
    gulp_notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    ts = require('gulp-typescript'),
    uglify = require('gulp-uglify'),
    tsProject = ts.createProject("tsconfig.json"),
    livereload = require("gulp-livereload");

//DECALRE DEFAULTS TASKS
gulp.task('default', ['express', 'watch', 'livereload'], function() {
    gulp.start('style', 'typescripts', 'html');
});

gulp.task('style', function() {
  return sass('app/style/*.scss', {
            style: 'expanded'
         })
         .pipe(gulp.dest('dist/style'))
         .pipe(rename({ suffix: '.min' }))
         .pipe(csso())
         .pipe(gulp.dest('dist/style'));
         //.pipe(gulp_notify({ message: 'style task completed' }));
});

gulp.task('typescripts', function(){
    return tsProject.src()
                .pipe(tsProject()).js
                .pipe(gulp.dest('dist/scripts'));
                //.pipe(gulp_notify({ message: 'typescript task completed' }));
});

// gulp.task('scripts', ['typescripts'], function(){
//     return gulp.src('dist/scripts/plugins.js')
//                 .pipe(rename({ suffix: '.min' }))
//                 .pipe(uglify())
//                 .pipe(gulp.dest('dist/scripts'))
//                 .pipe(gulp_notify({ message: 'scripts task completed' }));
// });

gulp.task('html', function(){
   return gulp.src('app/*.html')
                .pipe(gulp.dest('dist'))
});

gulp.task('jade', function(){
    return gulp.src('app/*.jade')
                .pipe(gulpjade({
                    pretty: true
                }))
                .pipe(gulp.dest('dist'));
});

gulp.task('express', function(){
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')({port: 35729}));
    app.use(express.static(__dirname));
    app.listen(5000, '0.0.0.0');
});

var tinylr
gulp.task('livereload', function() {
    tinylr = require("tiny-lr")();
    tinylr.listen(35728);
});

gulp.task('watch', function() {
     livereload.listen();
     gulp.watch('app/scripts/*.ts', ['typescripts']);
     gulp.watch('app/style/*.scss', ['style']);
     gulp.watch('app/*.html', ['html']);

     // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
});





