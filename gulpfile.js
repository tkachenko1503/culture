const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

// vendors css and js
gulp.task('vendors:css',
  () => gulp.src([
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/slick-carousel/slick/slick.css'
  ])
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest('./dist/public/css/'))
);

gulp.task('vendors:js',
  () => gulp.src([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/slick-carousel/slick/slick.min.js'
  ])
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('./dist/public/js/'))
);

gulp.task('vendors', ['vendors:css', 'vendors:js']);

// styles
gulp.task('css:dev', () => gulp.src('./app/**/*.less')
  .pipe(sourcemaps.init())
  .pipe(less())
  .pipe(sourcemaps.write())
  .pipe(concat('styles.css'))  
  .pipe(gulp.dest('./dist/public/css/'))
);

gulp.task('css:prod', () => gulp.src('./app/**/*.less')
  .pipe(less())
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(cssnano())
  .pipe(concat('styles.css'))  
  .pipe(gulp.dest('./dist/public/css/'))
);

// scripts
gulp.task('js:dev', () => {
  const bundler = browserify({
    entries: './app/index.js',
    debug: true
  });
  bundler.require('lodash', {expose: 'underscore'});
  bundler.transform(babelify);

  bundler.bundle()
    .on('error', err => console.error(err))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./dist/public/js/'))
    .pipe(gulp.dest('./dist/public/js/'));
});

gulp.task('js:prod', () => {
  const bundler = browserify({
    entries: './app/index.js',
    debug: false
  });
  bundler.require('lodash', {expose: 'underscore'});  
  bundler.transform(babelify);

  bundler.bundle()
    .on('error', err => console.error(err))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/public/js/'));
});

// files images and fonts
gulp.task('images', () => gulp.src('./app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('./dist/public/images/'))
);

gulp.task('fonts', () => gulp.src([
  './node_modules/bootstrap/dist/fonts/**/*',
  './node_modules/slick-carousel/slick/fonts/**/*'
])
    .pipe(gulp.dest('./dist/public/fonts/'))
);

gulp.task('clean:dist', () => del.sync([
  './dist/public/**/*', '!./dist/public/images', '!./dist/public/images/**/*'
  ])
);

// dev build
const src = path.resolve('./app');

gulp.task('watch', () => {
  gulp.watch('blocks/**/*.less', {cwd: src}, ['css:dev']);
  gulp.watch('blocks/**/*.js', {cwd: src}, ['js:dev']);
  gulp.watch('./app/index.js', ['js:dev']);
});

gulp.task('default', callback => 
  runSequence(
    ['vendors', 'images', 'fonts'],
    ['css:dev', 'js:dev'], 
    'watch', 
    callback
  )
)

// prod build
gulp.task('build', callback =>
  runSequence(
    'clean:dist',
    ['vendors', 'images', 'fonts'],
    ['css:prod', 'js:prod'], 
    callback
  )
)