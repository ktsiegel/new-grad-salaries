var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

gulp.task("bundle", function () {
  console.log("recompiling...");
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

gulp.task("default",["copy"], function(){
    gulp.watch("./src/jsx/*/*.jsx", ["bundle"]);
    gulp.watch("./src/css/style.css", ["copy"]);
});
