"use strict";

define(['jquery', './goodslist.js', './loaddata.js'], function ($, goodslist, loaddata) {
  'use strict';

  changeCartsNum();
  verification();
  var data = {};
  var gotop_btn = $("#go_top");
  var top_nav = $(".header_nav_con");
  var little_logo = $(".logo");
  var saleNav = $(".slae_nav");
  var leftNavPart = $(".left_hg");
  var exitBtn = $(".exit_account");
  var aboutUs = $(".hg_about");
  var close_aboutus = $(".close_hover");

  function changeCartsNum() {
    var count = 0;
    var s = JSON.parse(localStorage.getItem("carts"));
    $.each(s, function (index, item) {
      count += item.count;
    });
    $(".cartsNumber").html("(" + count + ")");
  }

  $(window).on("scroll", function () {
    var scrolltop = $("body,html").scrollTop();

    if (scrolltop > 150) {
      top_nav.addClass("shortcut");
      little_logo.css("display", "block");
    } else {
      top_nav.removeClass("shortcut");
      little_logo.css("display", "none");
    }

    if (scrolltop >= 650) {
      gotop_btn.css("display", "block");
    } else {
      gotop_btn.css("display", "none");
    }
  });
  gotop_btn.on("click", function () {
    $("body,html").animate({
      "scrollTop": 0
    }, 500);
  });
  saleNav.on("click", "a", function (evt) {
    var e = evt || window.event;
    var type = $(e.target).attr("data");
    var attr = $(e.target).parent().attr("data");
    data = {
      type: type,
      attr: attr
    };
    location.href = "./html/goodslist.html?#" + type + "-" + attr;
  });
  leftNavPart.on("click", "a", $.proxy(function (evt) {
    var e = evt || window.event;
    var type = $(e.target).attr("data");
    var h = "";
    /\//.test(type) ? h = "./goodslist.html?#" : h = "./html/goodslist.html?#";
    window.open(h + type.split("/")[0] + "-all");
  }, this));
  aboutUs.on("click", function () {
    $(".hover_page").css("display", "block");
  });
  close_aboutus.on("click", function () {
    $(".hover_page").css("display", "none");
  });

  function verification() {
    if ($(".nologin").css("display") === "none") {
      return true;
    }

    var url = "./php/login.php";
    $.ajax(url).done(function (res) {
      res = JSON.parse(res);

      if (res.state === "error") {
        $(".nologin").css("display", "inline-block");
        $(".logined").css("display", "none");
        return false;
      }

      $(".nologin").css("display", "none");
      $(".logined").css("display", "inline-block");
      $(".username_a").html(res.username);
    });
  }

  exitBtn.on("click", function () {
    var url = "./php/login.php";
    $.ajax(url, {
      data: {
        removecookie: "true"
      },
      type: "POST"
    }).done(function (res) {
      res = JSON.parse(res);

      if (res.state === "remove") {
        location.reload();
      }
    });
  });
  return data;
});