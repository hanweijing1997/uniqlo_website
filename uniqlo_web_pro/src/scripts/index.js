define([
      'jquery',
      './goodslist.js',
      './loaddata.js'
], function($,goodslist,loaddata) {
      'use strict';
      
      let gotop_btn = $("#go_top");
      let top_nav = $(".header_nav_con");
      let little_logo = $(".logo");

      $(window).on( "scroll" ,function(){
            let scrolltop = $("body,html").scrollTop();
            if(scrolltop > 150){
                  top_nav.addClass("shortcut");
                  little_logo.css("display" , "block");
            }else{
                  top_nav.removeClass("shortcut");
                  little_logo.css("display" , "none");
            }
            
            if(scrolltop >= 650){
                  gotop_btn.css("display" , "block");
            }else{
                  gotop_btn.css("display" , "none");
            }
            
      })
      gotop_btn.on("click" , function(){
            $("body,html").animate({
                  "scrollTop":0
            },500);
      })
     
      
     
});