// Import required modules
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");

// Define paths
const paths = {
  scss: "./sass/**/*.scss",
  css: "./assets/css",
};


// Compile SCSS -> CSS + Autoprefix + Minify
function compileSass() {
  return gulp
    .src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()])) // ✅ add prefixes here
    .pipe(gulp.dest(paths.css))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.css));
}

// Watch files for changes
function watchFiles() {
  gulp.watch(paths.scss, compileSass);
}

// Default Gulp task
exports.default = gulp.series(compileSass, watchFiles);
