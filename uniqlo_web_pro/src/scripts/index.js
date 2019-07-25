define([
      'jquery',
      './goodslist.js',
      './loaddata.js'
], function($,goodslist,loaddata) {
      'use strict';
      changeCartsNum();
      verification();

      let data = {};
      let gotop_btn = $("#go_top");
      let top_nav = $(".header_nav_con");
      let little_logo = $(".logo");
      let saleNav = $(".slae_nav");
      let leftNavPart = $(".left_hg");
      let exitBtn = $(".exit_account");

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
      saleNav.on("click" , "a" , function(evt){
            let e = evt || window.event ;
            let type = $(e.target).attr("data");
            let attr = $(e.target).parent().attr("data");
            data = {
                  type,
                  attr
            }
            location.href = "./html/goodslist.html?#"+ type+"-"+attr;
      })
      leftNavPart.on("click" , "a" , $.proxy(function(evt){
            let e = evt || window.event ;
            let type = $(e.target).attr("data");
            let h = "";
            /\//.test(type) ? h = "./goodslist.html?#" : h = "./html/goodslist.html?#";
            window.open(h + type.split("/")[0]+"-all");
      },this));

      function verification(){
            if($(".nologin").css("display")==="none"){
                  return true;
            }
            let url = "http://localhost/hwj/hwj_pro/uniqlo_web_pro/src/php/login.php";
            $.ajax(url).done(function(res){
                  res = JSON.parse(res);
                  if(res.state === "error"){
                        $(".nologin").css("display","inline-block");
                        $(".logined").css("display","none")
                        return false;
                  }
                 $(".nologin").css("display","none");
                 $(".logined").css("display","inline-block")
                 $(".username_a").html(res.username);
            })
      }

      exitBtn.on("click",function(){
            let url = "http://localhost/hwj/hwj_pro/uniqlo_web_pro/src/php/login.php";
            $.ajax(url,{
                  data : {
                        removecookie : "true"
                  },
                  type : "POST"

            }).done(function(res){
                  res = JSON.parse(res);
                  if(res.state === "remove"){
                        location.reload();
                  }
            })
      })
      
     return data;
});