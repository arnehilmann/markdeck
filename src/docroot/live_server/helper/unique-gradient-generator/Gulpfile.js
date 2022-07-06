/**
 * GULP tasks
 * @author Tibor Szász
 */
var gulp = require('gulp'),
	sass = require('gulp-sass');
	uglify = require('gulp-uglify');
	concat = require('gulp-concat');
	autoprefixer = require('gulp-autoprefixer');

var port = 4000;

/**
 * Launch static server
 */
gulp.task('express', function() {
	var express = require('express');
	var app = express();
	app.use(express.static(__dirname));
	app.listen(port);
});

/**
 * Compile sass files to the /dist folder
 */
gulp.task('sass', function () {
	gulp.src('./sass/**/*.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
	.pipe(gulp.dest('./dist'));
});

/**
 * Compile JS files
 */
gulp.task('js', function () {
	gulp.src('./js/*.js')
	.pipe(uglify())
	.on('error', function (e) {
		console.log(e)
	})
	.pipe(concat('flat.js'))
	.pipe(gulp.dest('./dist'));
});

/**
 * And the main entry point:
 *  - compiles sass
 *  - watches sass
 */
gulp.task('default', ['sass'], function() {
	// Peek for changes
	gulp.watch('./sass/**/*.scss', ['sass']);
});
