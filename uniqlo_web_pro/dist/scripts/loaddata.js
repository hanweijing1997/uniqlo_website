"use strict";

define(["jquery"], function ($) {
  return {
    init: function init(url) {
      return $.ajax(url, {
        dataType: "json"
      });
    }
  };
});