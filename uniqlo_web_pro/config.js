module.exports = {
      paths : {
            styles : {
                  src  : "./src/scss/*.scss",
                  dist : "./dist/styles/"
            },
            scripts : {
                  src  : "./src/scripts/*.js",
                  dist : "./dist/scripts/"
            },
            html    : {
                  src : "./src/html/*.html",
                  dist: "./dist/"
            }
      },
      proxyList : {
            // "/baidu" : {
            //       target : "https://www.baidu.com",
            //       changeOrigin : true ,
            //       pathRewrite : {
            //             "^/baidu" : ""
            //       }
            // }
      }
}