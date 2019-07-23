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
            .pipe(sass.on('error', sass.logError))
            .pipe(cleanCss())
            // .pipe(rename({
            //       suffix: '.min'
            // }))
            .pipe(gulp.dest(paths.styles.dist))
}
function scripts(){
      return gulp.src(paths.scripts.src)
            .pipe(concat("index.js"))
            .pipe(babel({
                  presets: ['@babel/env']
            }))
            .pipe(uglify())
            .pipe(gulp.dest(paths.scripts.dist))
}

function html(){
      return gulp.src(paths.html.src)
            .pipe(gulp.dest(paths.html.dist))
}


let build = gulp.series( html , styles , scripts );


// 默认指令;
exports.build = build;
exports.dev = dev;



