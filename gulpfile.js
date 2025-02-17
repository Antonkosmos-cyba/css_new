const { src, dest, series, watch } = require("gulp");
// const sass = require('gulp-sass')(require('sass'))
const cssmin = require("gulp-cssmin");
("gulp-concat-css");
const autoprefixer = require("gulp-autoprefixer");
// const include = require('gulp-file-include')
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const webphtml = require("gulp-webp-html");
// const svgsprite = require('gulp-svg-sprite')
const svgmin = require("gulp-svgmin");
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");
const gulpBabel = require("gulp-babel");
const gulpUglify = require("gulp-uglify");
const clean = require("gulp-clean");
const strip = require("gulp-strip-comments");
const sync = require("browser-sync").create();
// import imagemin from 'gulp-imagemin';
const removeComments = require("gulp-strip-css-comments");
function html() {
  return (
    src("src/**/**.html")
      // .pipe(include({
      //     prefix: '@@'
      // }))

      // .pipe(webphtml())
      .pipe(
        htmlmin({
          collapseWhitespace: true,
        })
      )
      .pipe(strip())
      .pipe(dest("dist"))
      .pipe(sync.reload({ stream: true }))
  );
}

function css() {
  return (
    src("src/css/**.css")
      // .pipe(sass())
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 2 versions"],
        })
      )
      // .pipe(cssmin())
      .pipe(removeComments())
      .pipe(dest("dist/css"))
      .pipe(sync.reload({ stream: true }))
  );
}

// function css_swip() {
//   return src("./node_modules/swiper/swiper-bundle.min.css").pipe(
//     dest("dist/css")
//   );
// }

// function js() {
//   return (
//     src("src/*.js")
//       .pipe(gulpBabel())
//       .pipe(gulpUglify())
//       // .pipe(concat('index.js'))
//       .pipe(dest("dist/js"))
//   );
// }

// function js_swip() {
//   return src("./node_modules/swiper/swiper-bundle.min.js").pipe(
//     dest("dist/js")
//   );
// }

function del() {
  return src("dist").pipe(clean());
}

function images() {
  return (
    src(
      "src/media/**/*.{jpg,png,jpeg,webp,gif}"
      // '!src/images/icon/*'
    )
      // .pipe(
      //     webp ({
      //         quality: 70
      //     })
      // )
      // .pipe(dest('dist/images'))

      // .pipe(src('src/images/**/*.{jpg,png,jpeg,svg,gif}'
      // ))

      .pipe(
        imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interlaced: true,
          optimizationLevel: 3, //0 to7
        })
      )
      .pipe(dest("dist/media"))
  );
}

function media() {
  return src("src/media/**").pipe(dest("dist/media"));
}

// function font() {
//   return src("src/fonts/**").pipe(dest("dist/fonts"));
// }

function serve() {
  sync.init({
    server: "./dist",
  });
  watch("src/**/**.html", series(html)).on("change", sync.reload);
  watch("src/css/**.css", series(css)).on("change", sync.reload);
  // watch("src/js/s**.js", series(js)).on("change", sync.reload);
}
exports.build = series(del, images, media, css, html);
exports.serve = series(del, images, media, html, css, serve);
// exports.clear = del
