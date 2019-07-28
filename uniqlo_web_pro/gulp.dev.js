let gulp     = require("gulp"); 
let connect  = require("gulp-connect");
let proxy    = require('http-proxy-middleware')
var sass     = require('gulp-sass');
sass.compiler = require('node-sass');

let { paths , proxyList } = require("./config");

function devStyles(){
      return gulp.src(paths.styles.src)
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(paths.styles.dist))
            .pipe(connect.reload());
}
function devScripts(){
      return gulp.src(paths.scripts.src)
      .pipe(gulp.dest(paths.scripts.dist))
      .pipe(connect.reload());
}
function devHtml(){
      return gulp.src(paths.html.src)
      .pipe(gulp.dest(paths.html.dist))
      .pipe(connect.reload());
}

function useconnect(){
      connect.server({
            root : "./dist",
            port : 8888, 
            livereload : true,
            middleware : function(connect, opt) {
                  let arr = [];
                  for(let attr in proxyList){
                        arr.push( proxy ( attr , proxyList[attr]))
                  }
                  return arr;

                  // return [
                  //       proxy("/login",{
                  //             target : "http://localhost/hwj/hwj_pro/uniqlo_web_pro/src/php/login.php",
                  //             // target:"https://www.zcool.com",
                  //             changeOrigin : true,
                  //             pathRewrite: {
                  //                   "^/login":""
                  //             }
                  //       }),
                  //       proxy("/register",{
                  //             target : "http://localhost/hwj/hwj_pro/uniqlo_web_pro/src/php/register.php",
                  //             changeOrigin : true,
                  //             pathRewrite: {
                  //                   "^/register":""
                  //             }
                  //       })
                  // ]
            }
      });
}

// function watch(){
//       gulp.watch(paths.styles.src,devStyles)
//       gulp.watch(paths.scripts.src,devScripts)
//       gulp.watch(paths.html.src,devHtml)
// }

let dev = gulp.series(gulp.parallel( useconnect  ));

module.exports  = dev; 
