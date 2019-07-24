define([
      'jquery',
      './goodslist.js',
      './loaddata.js'
], function($,goodslist,loaddata) {
      'use strict';
      changeCartsNum();

      let data = {};
      let gotop_btn = $("#go_top");
      let top_nav = $(".header_nav_con");
      let little_logo = $(".logo");
      let saleNav = $(".slae_nav");

       function changeCartsNum(){
            var count = 0;
            var s = JSON.parse(localStorage.getItem("carts"));
            $.each(s, function(index , item){
                  count += item.count;
            })
            $(".cartsNumber").html("("+count+")");
      }

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
      saleNav.on("click" , function(evt){
            let e = evt || window.event ;
            let type = $(e.target).attr("data");
            let attr = $(e.target).parent().attr("data");
            data = {
                  type,
                  attr
            }
            location.href = "./html/goodslist.html?#"+ type+"-"+attr;
      })
      
     return data;
});