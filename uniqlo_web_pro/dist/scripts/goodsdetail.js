"use strict";

define(["jquery", "./loaddata.js", "./render.js", "./magnifying.js"], function ($, loaddata, render, magnifying) {
  function Goodsdetail() {}

  $.extend(Goodsdetail.prototype, {
    init: function init() {
      this.data = "";
      var h = location.hash;
      h = parseInt(h.split("#")[1]);
      loaddata.init("../data/alldata.json").done($.proxy(function (res) {
        this.data = this.getIdDetail(res.all.datalist, h);
        var html = render.init(this.data, "detail");
        this.gooodsdetail.html(html);
        magnifying.init();
        this.size_list = $(".gd_con_size ul");
        this.size_list.on("click", "li", function (evt) {
          var e = evt || window.event;
          var target = e.target || e.srcElement;
          $(target).addClass("active").siblings().removeClass("active");
        });
        $(".addcarts_btn").on("click", $.proxy(function (evt) {
          var e = evt || window.event;
          var target = e.target || e.srcElement;
          var id = $(target).attr("data-id");
          this.saveId(id);
          this.changeCartsNum();
        }, this));
      }, this));
      this.gooodsdetail = $(".gd_detail");
      this.addcarts_btn = $(".addcarts_btn");
      this.chartTab = $(".g_chart_tab");
      this.chartCon = $(".g_chart_con");
      this.ul = $(".staris_nav");
      this.stairsList = $(".chart_stairs").children();
      this.heightList = [];
      this.minHei = 0;
      this.getHeightList();
      this.chartTab.on("click", "h4", $.proxy(function (evt) {
        var e = evt || window.event;
        var target = e.target || e.srcElement;
        $(target).parent().addClass("active").siblings().removeClass("active");
        var index = $(target).parent().index();
        this.chartConChange(index);
      }, this));
      $(window).on("scroll", $.proxy(function () {
        var scrolltop = $("body,html").scrollTop();

        if (scrolltop > this.minHei) {
          this.ul.addClass("fixed_ul");
        } else {
          this.ul.removeClass("fixed_ul");
        }

        this.changeStairs(scrolltop);
      }, this));
      this.ul.on("click", "li", $.proxy(function (evt) {
        var e = evt || window.event;
        var target = e.target || e.srcElement;
        var index = $(target).index();
        var s_top = this.heightList[index].min;
        $("body,html").animate({
          "scrollTop": s_top
        }, 500);
      }, this));
    },
    getHeightList: function getHeightList() {
      var topHei = $(".g_chart_con").offset().top;
      $.each(this.stairsList, $.proxy(function (index, ele) {
        var min = $(ele).offset().top + topHei;
        var max = min + $(ele).outerHeight();
        this.heightList.push({
          min: min,
          max: max
        });

        if (index === 0) {
          this.minHei = min;
        }
      }, this));
    },
    changeStairs: function changeStairs(st) {
      $.each(this.heightList, $.proxy(function (index, item) {
        if (st >= item.min && st < item.max) {
          this.ul.children().eq(index).addClass("arrive_this").siblings().removeClass("arrive_this");
        }
      }, this));
    },
    chartConChange: function chartConChange(index) {
      switch (index + 1) {
        case 1:
          $(".g_chart_con>div:nth-child(1)").addClass("active").removeClass("g_chart_item").siblings().removeClass("active").addClass("g_chart_item");
          break;

        case 2:
          $(".g_chart_con>div:nth-child(2)").addClass("active").removeClass("g_chart_item").siblings().removeClass("active").addClass("g_chart_item");
          break;

        case 3:
          $(".g_chart_con>div:nth-child(3)").addClass("active").removeClass("g_chart_item").siblings().removeClass("active").addClass("g_chart_item");
          break;
      }
    },
    getIdDetail: function getIdDetail(list, id) {
      var data = "";
      $.each(list, function (index, item) {
        if (item.dataid == id) {
          data = item;
        }
      });
      return data;
    },
    saveId: function saveId(id) {
      var s = localStorage.getItem("carts");

      if (s === null) {
        //当前无相关localStorage，创建一个新的
        var a = [{
          id: id,
          count: 1
        }];
        localStorage.setItem("carts", JSON.stringify(a));
      } else {
        //当前已有localStorage，直接判断当前id是否存在
        var list = JSON.parse(s);
        var has_same_id = false;
        $.each(list, function (index, item) {
          if (item.id === id) {
            item.count++;
            has_same_id = true;
          }
        }); //不存在相同的id，则新增

        if (!has_same_id) {
          list.push({
            id: id,
            count: 1
          });
        }

        localStorage.setItem("carts", JSON.stringify(list));
      }
    },
    changeCartsNum: function changeCartsNum() {
      var count = 0;
      var s = JSON.parse(localStorage.getItem("carts"));
      $.each(s, function (index, item) {
        count += item.count;
      });
      $(".cartsNumber").html("(" + count + ")");
    }
  });
  return new Goodsdetail();
});