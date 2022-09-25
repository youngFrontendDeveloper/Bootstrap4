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


/* пути к исходным файлам (src), к готовым файлам (docs), а также к тем, за изменениями которых нужно наблюдать (watch) */
let path = {
  build: {
    html: "docs/",
    js: "docs/js/",
    css: "docs/css/",
    img: "docs/img/",
    fonts: "docs/fonts/",
    lib: "docs/js/lib/"
  },
  src: {
    html: "src/*.html",
    js: "src/js/main.js",
    style: "src/style/main.less",
    img: "src/img/**/*.*",
    webp: "src/img/**/*.{png,jpg}",
    fonts: "src/fonts/**/*.*",
    sprite: "src/img/icons/*.svg",
    lib: "src/js/lib/**/*.js"
  },
  watch: {
    html: "src/**/*.html",
    js: "src/js/**/*.js",
    css: "src/style/**/*.less",
    img: "src/img/**/*.*",
    webp: "src/img/**/*.{png,jpg}",
    fonts: "srs/fonts/**/*.*",
    sprite: "src/img/**/*.svg"
  },
  clean: "./docs/*"
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
  gulp.watch( "src/style/**/*.less", gulp.series( styles ) );
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
    // sprite,
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
    // sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);


