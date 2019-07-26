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
                  this.fold_btn = $(".fold_btn");
                  this.fliter_con = $(".gl_con_fliter");
                  this.leftNav = $(".left_nav_list");
                  this.topTitle = $(".gl_top_title");
                  this.res = "";
                  var url = "";
                  var toptitle_con = "";

                 switch(attr){
                        case "xsth" : toptitle_con += "限时特惠-"; break;
                        case "zxsj" : toptitle_con += "最新上架-"; break;
                        case "tscm" : toptitle_con += "特大/特小 尺码-"; break;
                        case "czjx" : toptitle_con += "超值精选-"; break;
                 }
                 toptitle_con += type.toUpperCase();
                  switch(type){
                        case "women" : 
                              url = "../data/women.json" ;
                              break;
                        case "men" : 
                              url = "../data/men.json" ;
                              break;
                        case "kids" : 
                              url = "../data/kids.json" ;
                              break;
                        case "baby" : 
                              url = "../data/baby.json" ;
                              break;
                        case "alldata" : 
                              url = "../data/alldata.json" ;
                              break;
                  }      

                  this.topTitle.html(toptitle_con);
                  loaddata.init(url).then($.proxy(function(res){
                        this.res = res;
                        var html = "";
                        if(attr === "all"){
                              for(var a in this.res){
                                    html += render.init(this.res[a].datalist,"goods");
                              }
                        }else{
                              html = render.init(this.res[attr].datalist,"goods");
                        }
                        
                        this.goodslist.html(html);
                  },this)).fail(function(){
                        console.log("json请求失败")
                  })

                  this.fold_btn.on("click",$.proxy(function(){
                        if(this.fliter_con.css("display") === "none"){
                              this.fold_btn.html("&#xe723;");
                        }else{
                              this.fold_btn.html("&#xe71e;");
                        }
                        this.fliter_con.toggle(500);
                  },this));

                  this.leftNav.on("click" , ".left_fld_btn" , $.proxy(function(evt){
                        var e = evt || window.event;
                        var target = e.target || e.srcElement;
                        var ul = $(target).next(".left_nav_sl");
                        if(ul.css("display") === "none"){
                              $(target).html("&#xe652;");
                        }else{
                              $(target).html("&#xe651;");
                        }
                        ul.toggle(400);
                  },this));
            }
      })

      return new Goodslist();
});