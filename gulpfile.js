const gulp = require( "gulp" );
const plumber = require( "gulp-plumber" );
const sourcemap = require( "gulp-sourcemaps" );
const less = require( "gulp-less" );
const postcss = require( "gulp-postcss" );
const autoprefixer = require( "autoprefixer" );
const csso = require( "postcss-csso" );
const rename = require( "gulp-rename" );
const htmlmin = require( "gulp-htmlmin" );
const terser = require( "gulp-terser" );
const imagemin = require( "gulp-imagemin" );
const webp = require( "gulp-webp" );
const svgstore = require( "gulp-svgstore" );
const del = require( "del" );
const sync = require( "browser-sync" ).create();


/* пути к исходным файлам (src), к готовым файлам (build), а также к тем, за изменениями которых нужно наблюдать (watch) */
let path = {
  build: {
    html: "assets/build/",
    js: "assets/build/js/",
    css: "assets/build/css/",
    img: "assets/build/img/",
    fonts: "assets/build/fonts/",
    lib: "assets/build/js/lib/"
  },
  src: {
    html: "assets/src/*.html",
    js: "assets/src/js/main.js",
    style: "assets/src/style/main.less",
    img: "assets/src/img/**/*.*",
    webp: "assets/src/img/**/*.{png,jpg}",
    fonts: "assets/src/fonts/**/*.*",
    sprite: "assets/src/img/icons/*.svg",
    lib: "assets/src/js/lib/**/*.js"
  },
  watch: {
    html: "assets/src/**/*.html",
    js: "assets/src/js/**/*.js",
    css: "assets/src/style/**/*.less",
    img: "assets/src/img/**/*.*",
    webp: "assets/src/img/**/*.{png,jpg}",
    fonts: "assets/srs/fonts/**/*.*",
    sprite: "assets/src/img/**/*.svg"
  },
  clean: "./assets/build/*"
};

// Styles

const styles = () => {
  return gulp.src( path.src.style )
    .pipe( plumber() )
    .pipe( sourcemap.init() )
    .pipe( less() )
    .pipe( postcss( [
      autoprefixer(),
      csso()
    ] ) )
    .pipe( rename( "style.min.css" ) )
    .pipe( sourcemap.write( "." ) )
    .pipe( gulp.dest( path.build.css ) )
    .pipe( sync.stream() );
};

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src( path.src.html )
    .pipe( htmlmin( { collapseWhitespace: true } ) )
    .pipe( gulp.dest( path.build.html ) );
};

// Scripts

const scripts = () => {
  return gulp.src( path.src.js )
    .pipe( terser() )
    .pipe( rename( "script.min.js" ) )
    .pipe( gulp.dest( path.build.js ) )
    .pipe( sync.stream() );
};

exports.scripts = scripts;

// Images

const optimizeImages = () => {
  return gulp.src( path.src.img )
    .pipe( imagemin( [
      imagemin.mozjpeg( { progressive: true } ),
      imagemin.optipng( { optimizationLevel: 3 } ),
      imagemin.svgo()
    ] ) )
    .pipe( gulp.dest( path.build.img ) );
};

exports.images = optimizeImages;

const copyImages = () => {
  return gulp.src( path.src.img )
    .pipe( gulp.dest( path.build.img ) );
};


// WebP

const createWebp = () => {
  return gulp.src( path.src.webp )
    .pipe( webp( { quality: 90 } ) )
    .pipe( gulp.dest( path.build.img ) );
};

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp.src( path.src.img.sprite )
    .pipe( svgstore( {
      inlineSvg: true
    } ) )
    .pipe( rename( "sprite.svg" ) )
    .pipe( gulp.dest( path.build.img ) );
};

exports.sprite = sprite;

// Copy

const copy = (done) => {
  gulp.src( [
    path.src.fonts, "src/img/**/*.svg", path.src.lib
  ], {
    base: "src"
  } )
    .pipe( gulp.dest( "build" ) );
  done();
};

exports.copy = copy;

// Clean

const clean = () => {
  return del( "build" );
};

// Server

const server = (done) => {
  sync.init( {
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  } );
  done();
};

exports.server = server;

// Reload

const reload = (done) => {
  sync.reload();
  done();
};

//Watcher

const watcher = () => {
  gulp.watch( "src/less/**/*.less", gulp.series( styles ) );
  gulp.watch( "src/js/script.js", gulp.series( scripts ) );
  gulp.watch( "src/*.html", gulp.series( html, reload ) );
};

// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp
  )
);

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);


