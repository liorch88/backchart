/*! Backchart - v0.1.0 - 2014-02-13
* https://github.com/xch89820/backchart
* Copyright (c) 2014 xu.chenhui; Licensed MIT */
!function(a,b,c){"use strict";if("function"==typeof define&&define.amd)define(["jquery","backbone"],function(a,b){return c(a,b)});else if("undefined"!=typeof module&&module.exports){var d=require("jquery"),e=require("backbone");module.exports=c(d,e)}else for(var f=b.split("."),g=a.jQuery||a.ender||a.$||a||this,h=0;h<f.length;h++){var i=f[h];g=g[i]=h===f.length-1?c(a.jQuery||window.jQuery,a.Backbone||window.Backbone):{}}}(this,"backchart.base.model",function(a,b){var c=b.Model.extend({});return c});