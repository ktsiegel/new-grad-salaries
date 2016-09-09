var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

gulp.task("bundle", function () {
  return browserify({
    entries: "./src/jsx/main.jsx",
    debug: true
  }).transform(reactify)
  .bundle()
    .pipe(source("main.js"))
    .pipe(gulp.dest("public/javascripts"))
});

gulp.task("copy", ["bundle"], function () {
  return gulp.src(["src/lib/bootstrap-css/css/bootstrap.min.css","src/css/style.css"])
    .pipe(gulp.dest("public/stylesheets"));
});

gulp.task("default",["copy"],function(){
  console.log("Gulp completed..."); 
});
