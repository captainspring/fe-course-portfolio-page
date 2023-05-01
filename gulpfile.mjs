import gulp from 'gulp';
const { series, watch, src, dest, task } = gulp;
import rename from 'gulp-rename';
import { deleteAsync } from 'del';
import htmlmin from 'gulp-htmlmin';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
const sass = gulpSass(dartSass);
import postcss from 'gulp-postcss';
import sortMediaQueries from 'postcss-sort-media-queries';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import svgstore from 'gulp-svgstore';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserSync from 'browser-sync';
const server = browserSync.create();

// HTML
gulp.task('html', () => {
  return gulp.src('src/html/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build'))
});

// Styles
gulp.task('css', () => {
  return gulp.src('src/style/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      sortMediaQueries(),
      csso({
        restructure: false
      })
    ]))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build'))
    .pipe(server.stream());
});

// Images
gulp.task('optimizeImages', () => {
  return gulp.src([
      'src/assets/img/**/*.{png,jpg,svg}',
      '!src/assets/img/icons/sprite/*.svg'
    ])
    .pipe(imagemin([
      imagemin.mozjpeg({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('copyImages', () => {
  return gulp.src('src/assets/img/**/*.{png,jpg,svg}')
    .pipe(gulp.dest('build/img'));
});

gulp.task('createWebp', () => {
  return gulp.src('src/assets/img/**/*.{png,jpg}')
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest('build/img'));
});

// Sprite
gulp.task('sprite', () => {
  return gulp.src('src/assets/icons/sprite/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('icons-sprite.svg'))
    .pipe(gulp.dest('build/icons'));
});

// Scripts
gulp.task('js', () => {
  return browserify({
      entries: 'src/js/scripts.js',
      debug: true
    })
    .transform(babelify, {
      presets: [[
        '@babel/preset-env',
        {
          'targets': {
            'esmodules': true
          }
        }
      ]]
    })
    .bundle()
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/js'));
});

// Functional
gulp.task('clean', () => {
  return deleteAsync('build');
});

gulp.task('copy', () => {
  return gulp.src([
      'src/assets/favicons/*.{png,jpg}'
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('reload', (done) => {
  server.reload();
  done(); 
});

gulp.task('server', () => {
  server.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
    browser: 'google chrome'
  });

  gulp.watch('src/**/*.html', gulp.series('html', 'reload'));
  gulp.watch('src/**/*.scss', gulp.series('css'));
  gulp.watch('src/**/*.js', gulp.series('js', 'reload'));
});

// Tasks
gulp.task('dev', gulp.series('clean', 'copy', 'html', 'css', 'js', 'server'));
gulp.task('build', gulp.series('clean', 'copy', 'html', 'css', 'js'));
