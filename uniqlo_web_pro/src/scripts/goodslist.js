define([
      'jquery',
      './loaddata.js',
      './render.js'
], function($,loaddata,render) {
      'use strict';

      function Goodslist(){
      }
      $.extend(Goodslist.prototype , {
            init : function(type,attr){
                  this.goodslist = $(".goodslist_group");
                  this.res = "";
                  let url = "";

                 
                  switch(type){
                        case "women" : 
                              url = "../data/women.json" ;
                              break;
                  }      

                  loaddata.init(url).then($.proxy(function(res){
                        this.res = res;
                        let html = "";
                        html = render.init(this.res[attr].datalist,"goods");
                        this.goodslist.html(html);
                  },this)).fail(function(){
                        console.log("json请求失败")
                  })
            }
      })

      return new Goodslist();
});