
var gulp = require("gulp"),
		twig = require("gulp-twig"),
		sass = require("gulp-sass"),
		autoprefixer = require("gulp-autoprefixer"),
		plumber = require("gulp-plumber"),
		cmq = require('gulp-combine-media-queries'),
		gcmq = require('gulp-group-css-media-queries'),
		rename    = require("gulp-rename"),
		htmlreplace= require("gulp-html-replace"),
		minify = require("gulp-csso"),
		imagemin  = require("gulp-imagemin"),
		copy  = require("gulp-copy"),
		del   = require("del"),
		run = require("run-sequence"),
		browserSync = require("browser-sync"),
		svgstore  = require("gulp-svgstore"),
		svgmin    = require("gulp-svgmin"),
		svgSprite = require('gulp-svg-sprite'),
		cheerio   = require("gulp-cheerio"),
		clean     = require("gulp-clean");


/*______ Templates ______*/

gulp.task("templates", function() {
  return gulp.src("app/templates/*.html")
         .pipe(twig())
         .pipe(gulp.dest('app/'))
});


/*______ Template Start ______*/

gulp.task('dev', function() {
  gulp.watch("app/templates/**/*.html", ["templates"], browserSync.reload);
});


/*______ Clean SVG-sprite ______*/

gulp.task("clean", function() {
	return gulp.src('app/img/icon-svg/sprite-svg.svg')
					.pipe(clean({force: false}));
});


/*______ sass ______*/

gulp.task("sass", function() {
	return gulp.src("app/sass/main.scss")
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer(["last 15 version", "> 1%", 'firefox 14', "ie 8", "ie 7"], {cascade: true}))
		.pipe(gcmq())
		.pipe(rename("style.css"))
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.reload({stream: true}))
});


/*______ sass production ______*/

gulp.task("sass:build", function() {
	return gulp.src("app/sass/main.scss")
				.pipe(sass())
				.pipe(autoprefixer(["last 15 version", "> 1%", 'firefox 14', "ie 8", "ie 7"], {cascade: true}))
				.pipe(gcmq())
				.pipe(gulp.dest("app/css"))
				.pipe(rename("style.css"))
				.pipe(gulp.dest("build/app/css"));
});


/*______ SVG-sprite ______*/

gulp.task("svgstoreDev",["clean"], function() {
	return gulp.src("app/img/icon-svg/*.svg")
				.pipe(svgstore({
					inlineSvg: true
				}))
				.pipe(rename("sprite-svg.svg"))
				.pipe(gulp.dest("app/img/icon-svg/"))
});


/*______ Local-server ______*/

gulp.task("serve", ["templates", "sass", "svgstore"], function() {
	browserSync.init({
		server: "./app",
		notify: false
	});

	gulp.watch("app/sass/**/*.scss", ["sass"], browserSync.reload);
	gulp.watch("app/img/icon-svg/*.svg", ["svgstoreDev"]);
	gulp.watch("app/img/icon-svg/*.svg", browserSync.reload);
	gulp.watch("app/js/**/*.js", browserSync.reload);
	gulp.watch("app/*.html", browserSync.reload);

});


/*______ Minific Images ______*/

gulp.task("images", function() {
	return gulp.src("build/app/img/**/*.{png,jpg,gif}")
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.jpegtran({progressive: true})
	]))
	.pipe(gulp.dest("build/app/img"));
});


/*______ Concat and minific CSS and JS ______*/

gulp.task("replace", function() {
	gulp.src("app/*.html")
	.pipe(htmlreplace({
		"css": "css/min.style.css",
		"js": "js/min.libs.js"
	}))
	.pipe(gulp.dest("build/app/"));
});


/*______ Copy Files ______*/

gulp.task("copy", function() {
	return gulp.src([
		"app/fonts/**/*.{woff,woff2}",
		"app/img/**",
		"app/js/**",
		"app/libs/**",
		"app/*.html"
	], {
		base: "."
	})
	.pipe(gulp.dest("build"));
});


/*______ Del files ______*/

gulp.task("del", function() {
	return del("build");
});


/*______ Minific SVG ______*/

gulp.task("svgmin", function() {
	return gulp.src("app/img/icon-svg/*.svg")
				.pipe(svgmin())
				.pipe(gulp.dest("build/app/img/icon-svg"))
});


/*______ Remove attr Fill SVG ______*/

gulp.task("removeSvgFill", function() {
	return gulp.src("app/img/svg/*.svg")
					.pipe(cheerio({
						run: function($) {
							$("[fill]").removeAttr("fill");
						},
						parseOptions: {xmlMode: true}
					}))
					.pipe(gulp.dest("app/img/svg/"))
});


/*______ Minific CSS ______*/

gulp.task("cssmin", function() {
	return gulp.src("build/app/css/style.css")
				 .pipe(minify())
				 .pipe(rename("style.min.css"))
				 .pipe(gulp.dest("build/app/css"))
});


/*______ SVG sprite ______*/

gulp.task("svgstore", function() {
	gulp.src("app/img/icon-svg/*.svg")
			.pipe(svgstore({
				inlineSvg: true
			}))
			.pipe(rename("sprite-svg.svg"))
			.pipe(gulp.dest("app/img/icon-svg/"));
});


/*______ SVG sprite production ______*/

gulp.task("svgstore:build",["svgmin"], function() {
	return gulp.src("build/app/img/icon-svg/*.svg")
				.pipe(svgstore({
					inlineSvg: true
				}))
				.pipe(rename("sprite-svg.svg"))
				.pipe(gulp.dest("build/app/img/icon-svg"))
});


/*______ Build for production ______*/

gulp.task("build", function() {
	run(
		"del",
		"copy",
		"sass:build",
		"cssmin",
		"svgstore:build",
		"replace"
	)
});
