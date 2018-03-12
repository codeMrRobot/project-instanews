// REQUIRES

var gulp = require("gulp"),
 browserSync = require("browser-sync").create(),
 uglify = require("gulp-uglify"),
 rename = require("gulp-rename"),
 eslint = require("gulp-eslint"),
 sass = require("gulp-sass"),
 autoprefixer = require("gulp-autoprefixer"),
 cssnano = require("gulp-cssnano"),
 rename = require("gulp-rename"),
 prettyError = require("gulp-prettyerror");



// TASKS

gulp.task("default", ["lint", "scripts", "browser-sync", "watch"]
);

gulp.task("scripts", ["lint"],  function() {
  return gulp
    .src("js/*.js") // What files do we want gulp to consume?
    .pipe(uglify()) // Call the uglify function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")); // Where do we put the result?
});

gulp.task('lint', () => {
    return gulp.src(['js/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


gulp.task('watch', ["lint"],function() {
  gulp.watch(['js/*.js', '*.css', '*.html'] , ['lint', 'reload']);
});

gulp.task('reload', ['scripts'], function() {
  browserSync.reload();
});

gulp.task("sass", function() {
    return gulp
      .src("./sass/style.scss")
      .pipe(prettyError()) 
      .pipe(sass())
      .pipe(
        autoprefixer({
          browsers: ["last 2 versions"]
        })
      )
      .pipe(gulp.dest("./build/css"))
      .pipe(cssnano())
      .pipe(rename("style.min.css"))
      .pipe(gulp.dest("./build/css"));
  });


      