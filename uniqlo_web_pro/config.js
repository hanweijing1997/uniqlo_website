module.exports = {
      paths : {
            styles : {
                  src  : "./src/css/*.css",
                  dist : "./dist/styles/"
            },
            stylesIndex : {
                  src  : "./src/css/index/*.css",
                  dist : "./dist/styles/"
            },
            stylesGoodsdetail : {
                  src  : "./src/css/goodsdetail/*.css",
                  dist : "./dist/styles/"
            },
            stylesGoodslist : {
                  src  : "./src/css/goodslist/*.css",
                  dist : "./dist/styles/"
            },
            stylesShopcart : {
                  src  : "./src/css/shopcarts/*.css",
                  dist : "./dist/styles/"
            },
            stylesVer : {
                  src  : "./src/css/verification/*.css",
                  dist : "./dist/styles/"
            },
            scripts : {
                  src  : "./src/scripts/*.js",
                  dist : "./dist/scripts/"
            },
            html    : {
                  src : "./src/html/*.html",
                  dist: "./dist/html/"
            },
            indexhtml : {
                  src : "./src/*.html",
                  dist: "./dist/"
            },
            data : {
                  src : "./src/data/*.json",
                  dist: "./dist/data/"
            },
            php : {
                  src : "./src/php/*.php",
                  dist: "./dist/php/"
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