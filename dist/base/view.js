/*! Backchart - v0.1.0 - 2014-02-13
* https://github.com/xch89820/backchart
* Copyright (c) 2014 xu.chenhui; Licensed MIT */
!function(a,b,c){"use strict";if("function"==typeof define&&define.amd)define(["jquery","backbone","underscore"],function(a,b,d){return c(a,b,d)});else if("undefined"!=typeof module&&module.exports){var d=require("jquery"),e=require("underscore"),f=require("backbone");module.exports=c(d,f,e)}else for(var g=b.split("."),h=a.jQuery||a.ender||a.$||a||this,i=0;i<g.length;i++){var j=g[i];h=h[j]=i===g.length-1?c(a.jQuery||window.jQuery,a.Backbone||window.Backbone,a._||window._):{}}}(this,"backchart.base.view",function(a,b,c){var d=b.View.extend({tagName:"div",className:"backchart",_collectionPrefix:"_cname",container:null,eventCallback:{"default":"render"},_getEventCallback:function(a){var b=this.eventCallback[a]||this.eventCallback["default"];return b?this[b]:this.render},setSilence:function(a){this._silence=a},_setVisible:function(a,c){var d=this;if("string"==typeof a||a instanceof String){var e=d._collectionOptions[a];e&&(e.visible=c)}else a instanceof b.Collection&&d.eachCollection(function(b,d,e,f){d===a&&(f.visible=c)});return d.render(),d},hide:function(a){return this._setVisible(a,!1)},show:function(a){return this._setVisible(a,!0)},isVisibled:function(a){var c=this;if("string"==typeof a||a instanceof String){var d=c._collectionOptions[a];return d?d.visible:!1}if(a instanceof b.Collection){var e={};return c.eachCollection(function(b,c,d,f){c===a&&(e[b]=f?f.visible:!1)}),e}},initialize:function(){var a=this;a._silence=!1,b.View.prototype.initialize.apply(this,arguments),a.collections={},a._collectionOptions={},a._collectionRenderOptions={},this.on("collection.on",function(b,c,d,e){e.renderAfterOn===!0&&a.render()}),this.on("collection.off",function(){a.render()})},__bce:function(a,b,d){var e=this;c.each(b,function(a){e.listenTo(d,a,e._getEventCallback(a))})},__ubce:function(a,b,d){var e=this;c.each(b,function(a){d.off(a,e._getEventCallback(a))})},_getBindEvents:function(a){var b=["set","add","change","destroy","reset","sort"];return"undefined"!=typeof a._backchart&&(b=["seted","removed","change","destroy","reseted","sort"]),b},_bindCollectionEvent:function(a,b,c){c.silence!==!0&&this.__bce(a,this._getBindEvents(b),b)},_unbindColletionEvent:function(a,b){this.__ubce(a,this._getBindEvents(b),b)},_collectionHasBind:function(a){for(var b in this.collections)if(this.collections[b]===a)return!0;return!1},onCollection:function(a,d,e){d=d||{},e=e||{};var f=this,g=e.bid||c.uniqueId(f._collectionPrefix);if(!(!a instanceof b.Collection)){f._collectionHasBind(a)||(f._bindCollectionEvent(g,a,e),f.trigger("collection.bindEvent",a)),f.collections[g]=a;var h=c.clone(d);return f._collectionOptions[g]=e,f._collectionRenderOptions[g]=h,f.trigger("collection.on",g,a,h,e),g}},onCollections:function(a,b,d){var e=this;!a instanceof Array&&(a=[a]);var f={};return c.each(a,function(a){f[a]=e.onCollection(a,b,d)}),f},unCollection:function(a){var d=this,e=null;if("string"==typeof a||a instanceof String){if(e=d.collections[a]){delete d.collections[a];var f=d._collectionRenderOptions[a],g=d._collectionOptions[a];delete d._collectionRenderOptions[a],delete d._collectionOptions[a],d._collectionHasBind(e)||(d._unbindColletionEvent(a,e),d.trigger("collection.unbindEvent",e)),d.trigger("collection.off",a,e,f,g)}return e}if(a instanceof b.Collection){var h=[];e=a;for(var i in d.collections)d.collections[i]===e&&h.push(i);return c.each(h,function(a){d.unCollection(a)}),e}},clearCollection:function(){var a=this,b=c.keys(this.collections);return c.each(b,function(b){a.unCollection(b)}),this},eachCollection:function(a){var b=this;for(var c in b.collections)a.call(b.collections[c],c,b.collections[c],b._collectionRenderOptions[c],b._collectionOptions[c])},getCollection:function(a){var d=this;if("boolean"==typeof a&&a===!1)return c.uniq(c.values(d.collections));if("string"==typeof a||a instanceof String)return d.collections[a];if(a instanceof b.Collection){var e=[];return d.eachCollection(function(b){this===a&&e.push(b)}),e}var f={};return d.eachCollection(function(a){"undefined"==typeof f[this]&&(f[this]=[]),f[this].push(a)}),f},getOptions:function(a){var c=this,d=null;return"string"==typeof a||a instanceof String?c._collectionOptions[a]:a instanceof b.Collection?(d=[],c.eachCollection(function(b,c,e,f){c===a&&d.push(f)}),d):(d={},c.eachCollection(function(a,b,c,e){"undefined"==typeof d[this]&&(d[this]=[]),d[this].push(e)}),d)},getRenderOptions:function(a){var c=this,d=[];return"string"==typeof a||a instanceof String?c._collectionRenderOptions[a]:a instanceof b.Collection?(d=[],c.eachCollection(function(b,c,e){c===a&&d.push(e)}),d):(d={},c.eachCollection(function(a,b,c){"undefined"==typeof d[this]&&(d[this]=[]),d[this].push(c)}),d)},render:function(){var b=this;if(b.container)return b.$container=a(b.container),b.$container.is(":hidden")?!1:b._silence===!0?!1:!0},renderEvents:function(){this.trigger.apply(this,["view.rendered"].concat(arguments)),a(this.container).trigger("backchart.rendered",arguments)},elFillParents:function(){this.$el.css({width:"100%",height:"100%"})}});return d});