let gulp     = require("gulp"); // gulp是一个实例对象;
let cleanCss = require("gulp-clean-css");
let rename   = require("gulp-rename");
let concat   = require("gulp-concat");
let babel    = require("gulp-babel");
let uglify   = require("gulp-uglify");
let dev      = require("./gulp.dev");
var sass = require('gulp-sass');
sass.compiler = require('node-sass');


// 外置paths => 因为方便配置;
let { paths }    = require("./config");

let type = process.argv[3] ? process.argv[3] : "dev";

// 路径;
// 转存;
function styles(){
      return gulp.src(paths.styles.src)
            //  .pipe(concat("index.css"))
            // .pipe(sass.on('error', sass.logError))
            // .pipe(cleanCss())
            // .pipe(rename({
            //       suffix: '.min'
            // }))
            .pipe(gulp.dest(paths.styles.dist))
}
function stylesIndex(){
      return gulp.src(paths.stylesIndex.src)
             .pipe(concat("index.css"))
            .pipe(cleanCss())
            .pipe(gulp.dest(paths.stylesIndex.dist))
}
function stylesGd(){
      return gulp.src(paths.stylesGoodsdetail.src)
             .pipe(concat("goodsdetail.css"))
            .pipe(cleanCss())
            .pipe(gulp.dest(paths.stylesGoodsdetail.dist))
}
function stylesGl(){
      return gulp.src(paths.stylesGoodslist.src)
             .pipe(concat("goodslist.css"))
            .pipe(cleanCss())
            .pipe(gulp.dest(paths.stylesGoodslist.dist))
}
function stylesSc(){
      return gulp.src(paths.stylesShopcart.src)
             .pipe(concat("shopcarts.css"))
            .pipe(cleanCss())
            .pipe(gulp.dest(paths.stylesShopcart.dist))
}
function stylesVer(){
      return gulp.src(paths.stylesVer.src)
             .pipe(concat("verification.css"))
            .pipe(cleanCss())
            .pipe(gulp.dest(paths.stylesVer.dist))
}
function scripts(){
      return gulp.src(paths.scripts.src)
            .pipe(babel({
                  presets: ['@babel/env']
            }))
            // .pipe(uglify())
            .pipe(gulp.dest(paths.scripts.dist))
}
function php(){
      return gulp.src(paths.php.src)
            .pipe(gulp.dest(paths.php.dist))
}
function data(){
      return gulp.src(paths.data.src)
            .pipe(gulp.dest(paths.data.dist))
}
function html(){
      return gulp.src(paths.html.src)
            .pipe(gulp.dest(paths.html.dist))
}
function indexhtml(){
      return gulp.src(paths.indexhtml.src)
            .pipe(concat("index.html"))
            .pipe(gulp.dest(paths.indexhtml.dist))
}


let build = gulp.series(indexhtml, html , styles ,stylesIndex ,stylesGd,stylesGl,stylesSc ,stylesVer, scripts ,php,data);


// 默认指令;
exports.build = build;
exports.dev = dev;



