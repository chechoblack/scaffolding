// main dependencies
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

// scss devendencies
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');

// javascript devpendencies
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// util dependencies
const del = require('del');

function minify_scss(done) {
    gulp
        .src('scss/*.scss')
        .pipe(sass())
        .on('error', sass.logError)
        /* Use postcss with autoprefixer and compress the compiled file using cssnano */
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest('dist/css'))

    done();
}

function minify_scripts(done) {
    gulp
        .src(['js/libs/*.js', 'js/controllers/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    done();
}

function jstask() {
    return gulp
        .src(['js/libs/*.js', 'js/controllers/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('dist/js'));
}

// gulp task default
gulp.task('default', gulp.parallel(minify_scss, minify_scripts));

// gulp task watch and function for watch
gulp.task('watch', gulp.parallel(function (done) {
    browserSync.init({ files: 'index.html', server: { baseDir: './' }, notify: false });
    gulp.watch('scss/**/*.scss', minify_scss).on('change', browserSync.reload);
    gulp.watch('js/**/*.js', jstask).on('change', browserSync.reload);
    done();
}));
