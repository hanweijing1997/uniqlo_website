"use strict";

define(["jquery", "./render.js", "./loaddata.js"], function ($, render, loaddata) {
  loaddata.init("../data/alldata.json").done(function (res) {
    var html = render.init(res.all.datalist, "carts");
    $(".sc_con_list").html(html);
    var c = new Carts();
    c.init();
  });

  function Carts() {}

  $.extend(Carts.prototype, {
    init: function init() {
      this.goodsNumCon = $(".sc_con_count");
      this.cart_num = $(".cartsNumber");
      this.sum_price = $(".sum_price_int");
      this.goodsNumCon.on("click", ".red_num_btn", $.proxy(this.reduceGoodsNum, this));
      this.goodsNumCon.on("click", ".add_num_btn", $.proxy(this.addGoodsNum, this));
      this.calculateSum();
    },
    addGoodsNum: function addGoodsNum(evt) {
      var e = evt || window.event;
      var target = e.target || e.srcElement;
      var id = $(target).parent().attr("data");
      var s = JSON.parse(localStorage.getItem("carts"));
      $.each(s, function (index, item) {
        if (item.id == id) {
          item.count++;
        }
      });
      localStorage.setItem("carts", JSON.stringify(s));
      this.changeCartNum();
      this.renderCartsList();
    },
    reduceGoodsNum: function reduceGoodsNum(evt) {
      var e = evt || window.event;
      var target = e.target || e.srcElement;
      var id = $(target).parent().attr("data");
      var s = JSON.parse(localStorage.getItem("carts"));
      $.each(s, function (index, item) {
        if (item.id == id) {
          item.count--;

          if (item.count == 0) {
            s.splice(index, 1);
          }
        }
      });
      localStorage.setItem("carts", JSON.stringify(s));
      this.changeCartNum();
      this.renderCartsList();
    },
    changeCartNum: function changeCartNum() {
      var count = 0;
      var s = JSON.parse(localStorage.getItem("carts"));
      $.each(s, function (index, item) {
        count += item.count;
      });
      this.cart_num.html("(" + count + ")");
    },
    renderCartsList: function renderCartsList() {
      loaddata.init("../data/alldata.json").done(function (res) {
        var html = render.init(res.all.datalist, "carts");
        $(".sc_con_list").html(html);
        var c = new Carts();
        c.init();
      });
    },
    calculateSum: function calculateSum() {
      var sum_p = 0;
      $.each($(".sc_con_price span"), function (index, item) {
        sum_p += parseInt($(item).html());
      });
      this.sum_price.html(sum_p.toFixed(2));
    }
  }); // return new Carts();
});