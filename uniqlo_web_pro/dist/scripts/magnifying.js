"use strict";

define(["jquery"], function ($) {
  function Magnifying() {}

  $.extend(Magnifying.prototype, {
    init: function init() {
      this.cube = $(".cursor-div");
      this.smallImgBox = $(".gd_img_mid");
      this.smallImg = $(".gd_img_mid img");
      this.bigImgBox = $(".gd_img_big");
      this.bigImg = $(".gd_img_big img");
      this.seletion = $(".gd_smallimg_list");
      this.smallBoxSize = {
        width: getSize(this.smallImgBox).width,
        height: getSize(this.smallImgBox).height
      };
      this.bigBoxSize = {
        width: getSize(this.bigImgBox).width,
        height: getSize(this.bigImgBox).height
      };
      this.cubeSize = {
        width: 250,
        height: 250
      };
      this.smallImgBox.on("mouseenter", $.proxy(this.show, this));
      this.smallImgBox.on("mouseleave", $.proxy(this.hidden, this));
      this.smallImgBox.on("mousemove", $.proxy(this.handlerMove, this));
      this.seletion.on("click", "img", $.proxy(this.changeImg, this));
    },
    show: function show() {
      this.cube.css("display", "block");
      this.bigImgBox.css("display", "block");
    },
    hidden: function hidden() {
      this.cube.animate({
        borderWidth: 0,
        display: "none"
      }, 200);
      this.bigImgBox.css("display", "none");
    },
    handlerMove: function handlerMove(evt) {
      var e = evt || window.event;
      var x = e.offsetX - parseInt(this.cubeSize.width / 2);
      var y = e.offsetY - parseInt(this.cubeSize.height / 2);
      var cube_position = this.boundary(x, y);
      var bigImg_position = this.getBigImgPosition(cube_position);
      this.move(cube_position, bigImg_position);
    },
    move: function move(cube_position, bigImg_position) {
      var borderWidth = cube_position.y + "px " + (this.smallBoxSize.width - this.cubeSize.width - cube_position.x) + "px " + (this.smallBoxSize.height - this.cubeSize.height - cube_position.y) + "px " + cube_position.x + "px ";
      this.cube.css({
        "borderWidth": borderWidth,
        opacity: 0.5
      });
      this.bigImg.css({
        "left": -bigImg_position.x,
        "top": -bigImg_position.y
      });
    },
    boundary: function boundary(x, y) {
      x = x <= 0 ? 0 : x;
      var maxx = this.smallBoxSize.width - this.cubeSize.width;
      x = x > maxx ? maxx : x;
      y = y <= 0 ? 0 : y;
      var maxy = this.smallBoxSize.height - this.cubeSize.width;
      y = y > maxy ? maxy : y;
      return {
        x: x,
        y: y
      };
    },
    getBigImgPosition: function getBigImgPosition(cube_position) {
      var x = Math.round(cube_position.x * this.bigBoxSize.width / this.cubeSize.width);
      var y = Math.round(cube_position.y * this.bigBoxSize.height / this.cubeSize.height);
      return {
        x: x,
        y: y
      };
    },
    changeImg: function changeImg(evt) {
      // var imgBtnList = this.seletion.children();
      var e = evt || window.event;
      var ele = e.target || e.srcElement;
      var url = $(ele).attr("src");
      var dataurl = $(ele).attr("data-src");
      var index = $(ele).parent().index();
      var imgBtnList = this.seletion.children("li");
      $(imgBtnList).eq(index).toggleClass("active").siblings().removeClass("active");
      this.smallImg.attr("src", url);
      this.bigImg.attr("src", dataurl);
    }
  });
  return new Magnifying();

  function getSize(ele) {
    return {
      width: parseInt(ele.width()),
      height: parseInt(ele.height())
    };
  }
});