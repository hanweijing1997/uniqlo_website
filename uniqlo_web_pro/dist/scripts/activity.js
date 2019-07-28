"use strict";

define(["jquery"], function ($) {
  var heightList = [];
  $(".notice_nav span").on("click", function () {
    if ($(".notice_nav").css("right") == "0px") {
      $(".notice_nav").animate({
        right: -150
      }, function () {
        $(".notice_nav span").html("&#xe645;");
      });
    } else {
      $(".notice_nav").animate({
        right: 0
      }, function () {
        $(".notice_nav span").html("&#xe646;");
      });
    }
  });
  getHeightList();
  console.log(heightList);
  $(window).on("scroll", $.proxy(function () {
    var scrolltop = $("body,html").scrollTop();
    changeStairs(scrolltop);
  }, this));
  $(".notice_nav_ul").on("click", "li", $.proxy(function (evt) {
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    var index = $(target).index();
    var s_top = heightList[index].min;
    $("body,html").animate({
      "scrollTop": s_top
    }, 500);
  }, this));

  function getHeightList() {
    $.each($(".notice_item"), function (index, item) {
      var min = $(item).offset().top - 120;
      var max = min + $(item).outerHeight();
      heightList.push({
        min: min,
        max: max
      });
    });
  }

  function changeStairs(st) {
    $.each(heightList, $.proxy(function (index, item) {
      if (st >= item.min && st < item.max) {
        console.log(index);
        $(".notice_nav_ul li").eq(index).addClass("active").siblings().removeClass("active");
      }
    }, this));
  }
});