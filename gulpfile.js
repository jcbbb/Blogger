const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
  styles: {
    src: 'src/public/css/style.scss',
    dest: 'dist/public/css',
  },
};
function style() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest));
}
function watch() {
  style();
  gulp.watch('src/public/css/**/*.scss', style);
}

module.exports = {
  watch,
  style,
};
