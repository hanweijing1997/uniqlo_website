"use strict";

define(["jquery"], function ($) {
  function Render() {}

  $.extend(Render.prototype, {
    init: function init(list, type) {
      switch (type) {
        case "goods":
          return this.goodsListShow(list);
          break;

        case "detail":
          return this.detailListShow(list);
          break;

        case "carts":
          return this.cartsListShow(list);
          break;
      }
    },
    goodsListShow: function goodsListShow(list) {
      var html = "";
      $.each(list, function (index, item) {
        html += "\n                              <li class=\"gl_li\">\n                                    <a class=\"gl_a\" href=\"./goodsdetail.html?gid=".concat(item.dataid, "#").concat(item.dataid, "\">\n                                          <div class=\"gl_item_con\">\n                                                <ul class=\"gl_item_tag\">\n                                                      <li> <img style=\"width:90%;margin-right:5px;\" src=\"https://www.uniqlo.cn/cms/b11ef5e69f0e7edac050452a5e534406.jpg\" > </li>\n                                                </ul>\n                                                <div style=\"position: relative; margin-bottom: 10px;\">\n                                                      <img style=\"width:225px; height: 225px; text-align: center;\" src=\"").concat(item.imgurl, "\" >\n                                                </div>\n                                                <p>").concat(item.cate, " <span class=\"gl_item_size\">").concat(item["min-size"], " - ").concat(item["max-size"], "</span> </p>\n                                                <p style=\"font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;\">").concat(item.title, "</p>\n                                                <p>\u521D\u4E0A\u5E02\u4EF7\u683C : \uFFE5").concat(item["origin-price"], ".00</p>\n                                                <div class=\"gl_item_p\">\uFFE5").concat(item["now-price"], ".00</div>\n                                          </div>\n                                    </a>\n                              </li>");
      });
      return html;
    },
    detailListShow: function detailListShow(list) {
      var html = "";
      html += "  \n                              <div class=\"gd_img\">\n                              <div class=\"gd_img_small\">\n                                    <ul class=\"gd_smallimg_list\">\n                                    ".concat(this.getDetailImgList(list.cover), "\n                                    </ul>\n                              </div>\n                              <div class=\"gd_img_mid\">\n                                    <img src=\"").concat(list.cover.cover1['s-img'], "\">\n                                    <div class=\"cursor-div\"></div>\n                                    <div style=\"width: 100%; height: 100%; position: absolute;top: 0;left: 0;z-index: 999;\"></div>\n                              </div>\n                              <div class=\"gd_img_big\">\n                                    <img style=\"width: 1000px;height: 1000px;position: absolute;\" src=\"").concat(list.cover.cover1['b-img'], "\">\n                              </div>\n                        </div>\n                  \n                        <div class=\"gd_con_list\">\n                              <h4>").concat(list.cate, " ").concat(list.title, "</h4>\n                              <p class=\"gd_con_orisize\"> <a href=\"javacript:;\">\u521D\u4E0A\u5E02\u5C3A\u7801\u8303\u56F4: ").concat(list["min-size"], "-").concat(list["max-size"], "</a> </p>\n                              <p class=\"gd_con_price\"> \uFFE5").concat(list["now-price"], ".00 <span>\u521D\u4E0A\u5E02\u4EF7\u683C : \uFFE5").concat(list["origin-price"], ".00</span> </p>\n                              <p class=\"gd_con_activity\">\u6D3B\u52A8 : <span>\u8BA2\u5355\u6EE1200\u5143\u514D\u8FD0\u8D39\uFF08\u95E8\u5E97\u6025\u9001\u9886\u5238\u514D\u90AE\uFF09</span> </p>\n                              <div class=\"gd_con_color\">\n                                    <p>\u989C\u8272 : </p>\n                                    <ul>\n                                          ").concat(this.getDetailColorList(list.colorList), "\n                                    </ul>\n                              </div>\n                              <div class=\"gd_con_size\">\n                                    <p>\u5C3A\u7801 : </p>\n                                    <ul class=\"\">\n                                          ").concat(this.getDetailSizeList(list.sizelist), "\n                                    </ul>\n                              </div>\n                              <div  class=\"gd_con_getmethod\">\n                                    \u914D\u9001\u65B9\u5F0F : \n                                    <label> <input type=\"radio\" name=\"getmethod\"> \u5FEB\u9012\u914D\u9001 </label>\n                                    <label> <input type=\"radio\" name=\"getmethod\"> \u95E8\u5E97\u81EA\u63D0 </label>\n                              </div>\n                              <div  class=\"gd_con_buy\">\n                                    <button class=\"buynow_btn\" type=\"button\" data-id=\"").concat(list.dataid, "\">\u7ACB\u5373\u8D2D\u4E70</button>\n                                    <button class=\"addcarts_btn\" type=\"button\" data-id=\"").concat(list.dataid, "\">\u6DFB\u52A0\u81F3\u8D2D\u7269\u8F66</button>\n                              </div>\n                              <p style=\"margin-top: 20px;height: 20px;\">\n                                    \u652F\u630130\u5929\u65E0\u7406\u7531\u9000\u6362\u8D27\n                                    \u5206\u4EAB\u5546\u54C1\n                                    \u6536\u85CF\n                              </p>\n                        </div>");
      return html;
    },
    getDetailImgList: function getDetailImgList(list) {
      var html = "";
      $.each(list, function (index, item) {
        if (index === 0) {
          html += "  \n                              <li class=\"active\">\n                                    <img src=\"".concat(item["s-img"], "\" data-src=\"").concat(item["b-img"], "\">\n                              </li>");
        } else {
          html += "  \n                              <li>\n                                    <img src=\"".concat(item["s-img"], "\" data-src=\"").concat(item["b-img"], "\">\n                              </li>");
        }
      });
      return html;
    },
    cartsListShow: function cartsListShow(list) {
      var s = localStorage.getItem("carts");
      var ls = JSON.parse(s === null ? "[]" : s);
      list = list.filter(function (goods) {
        return ls.some(function (item, index) {
          if (item.id == goods.dataid) {
            goods.count = item.count;
            return true;
          }
        });
      });
      var html = "";
      $.each(list, function (index, item) {
        html += "\n                              <li class=\"sc_con_item\">\n                                    <div class=\"sc_con_method\">\n                                          <input type=\"checkbox\">\u4FEE\u6539\u914D\u9001\u65B9\u5F0F\n                                          \n                                    </div>\n                                    <div class=\"sc_con_img\">\n                                          <img src=\"".concat(item.imgurl, "\" alt=\"\">\n                                    </div>\n\n                                    <div class=\"sc_con_detail\">\n                                          <p style=\"width:220px;font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;\">").concat(item.cate, "  ").concat(item.title, "</p>\n                                          <p>\u652F\u630130\u5929\u65E0\u7406\u7531\u9000\u6362\u8D27</p>\n                                    </div>\n                                    <div class=\"sc_con_detail\">\n                                          <p>\u5C3A\u7801 : 160/76/M</p>\n                                          <p>\u989C\u8272 : 54 \u7EFF\u8272</p>\n                                    </div>\n                                    <div class=\"sc_con_detail\">\n                                          <p class=\"price_bold\">\uFFE5").concat(item["now-price"], ".00</p>\n                                          <p>\u521D\u4E0A\u5E02\u4EF7\u683C </p>\n                                          <p>\uFFE5").concat(item["origin-price"], ".00</p>\n                                    </div>\n                                    <div class=\"sc_con_count\">\n                                          <span data=\"").concat(item.dataid, "\"> <i class=\"iconfont red_num_btn\" style=\"float:left;margin-left:-3px\">&#xe723;</i> ").concat(item.count, "  <i class=\"iconfont add_num_btn\" style=\"float:right;margin-right:-3px;\">&#xe71e;</i></span>\n                                    </div>\n                                    <div class=\"sc_con_price\">\n                                          <p class=\"price_bold\">\uFFE5<span>").concat(item.count * item["now-price"], "</span>.00</p>\n                                    </div>\n                              </li>");
      });
      return html;
    },
    getDetailSizeList: function getDetailSizeList(list) {
      var html = "";
      $.each(list, function (index, item) {
        html += "\n                        <li class=\"\">".concat(item, "</li> ");
      });
      return html;
    },
    getDetailColorList: function getDetailColorList(list) {
      var html = "";
      $.each(list, function (index, item) {
        html += "\n                        <li>\n                              <img style=\"width:100%\" src=\"".concat(item, "\">\n                        </li> ");
      });
      return html;
    }
  });
  return new Render();
});