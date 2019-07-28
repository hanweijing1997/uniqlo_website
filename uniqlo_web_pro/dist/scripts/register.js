"use strict";

define(["jquery"], function ($) {
  var registerBtn = $(".register_btn");
  var username = $("#userid");
  var password = $("#pwd");
  var repass = $("#pwd_repeat");
  var verify = [0, 0, 0];
  username.on("blur", function () {
    $(".error_msg").eq(0).css("display", "none");
    var reg = /^1[3-9]\d{9}$/;
    var val = this.value;

    if (reg.test(val)) {
      verify[0] = 1;
      $(".error_msg").eq(1).css("display", "none");
      return 0;
    }

    verify[0] = 0;
    $(".error_msg").eq(1).css("display", "block").children(".error_msg_con").html("手机号输入有误");
  });
  password.on("blur", function () {
    var reg = /^[\!\@\#\$\%\^\&\*\(\)\-a-z0-9_]{6,20}$/i;
    var val = this.value;

    if (reg.test(val)) {
      verify[1] = 1;
      $(".error_msg").eq(2).css("display", "none");
      return 0;
    }

    verify[1] = 0;
    $(".error_msg").eq(2).css("display", "block").children(".error_msg_con").html("密码为6到20位的字符数字组合，可包含特殊符号");
  });
  repass.on("blur", function () {
    var val = this.value;

    if (val === password.val()) {
      verify[2] = 1;
      $(".error_msg").eq(3).css("display", "none");
      return 0;
    }

    verify[2] = 0;
    $(".error_msg").eq(3).css("display", "block").children(".error_msg_con").html("您两次输入的密码不一致，请重新输入");
  });
  registerBtn.on("click", function () {
    var s = verify.every(function (item) {
      return item === 1;
    });

    if (s) {
      $.ajax("../php/register.php", {
        data: {
          username: username.val(),
          password: password.val()
        },
        type: "POST",
        dataType: "json"
      }).done(function (res) {
        console.log(res);

        switch (res.stateCode) {
          case 1:
            $(".error_msg").eq(0).css("display", "none");
            location.href = "./login.html";
            break;

          case 2:
            $(".error_msg").eq(0).css("display", "block").children(".error_msg_con").html("用户名已存在啦，请重新输入");
            password.val("");
            repass.val("");
            break;

          case 3:
            $(".error_msg").eq(0).css("display", "block").children(".error_msg_con").html("！注册失败");
            password.val("");
            repass.val("");
            break;

          case 0:
            $(".error_msg").eq(0).css("display", "block").children(".error_msg_con").html("服务连接失败，刷新试试");
            password.val("");
            repass.val("");
            break;
        }
      }).fail(function (res) {
        $(".error_msg").eq(0).css("display", "block").children(".error_msg_con").html("数据请求失败了");
        password.val("");
        repass.val("");
      });
    }
  });
});