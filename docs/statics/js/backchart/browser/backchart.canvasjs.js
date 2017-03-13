/*! backchart - v0.2.1 - 2017-03-13
* Copyright (c) 2017 ; Licensed  */
!function(a,b,c){"use strict";if("function"==typeof define&&define.amd)define(function(){return c()});else if("undefined"!=typeof module&&module.exports&&"function"==typeof require)module.exports=c();else for(var d=b.split("."),e=a||this,f=0;f<d.length;f++){var g=d[f],h=e[g];e=e[g]=f===d.length-1?c():h||{}}}(this,"backchart.base.logger",function(){if(!window.console){var a=function(a){window.alert(a)};window.console={log:a,info:a,warn:a,debug:a,error:a}}return window.console}),function(a,b,c){"use strict";if("function"==typeof define&&define.amd)define(function(){return c()});else if("undefined"!=typeof module&&module.exports&&"function"==typeof require)module.exports=c();else for(var d=b.split("."),e=a||this,f=0;f<d.length;f++){var g=d[f],h=e[g];e=e[g]=f===d.length-1?c():h||{}}}(this,"backchart.base.loader",function(){var a=this,b=function(b,c){var d=[];if("function"==typeof define&&define.amd)require(b instanceof Array?b:[b],c);else if("undefined"!=typeof module&&module.exports&&"function"==typeof require)if(b instanceof Array){for(var e=0;e<b.length;e++)d.push(require(b[e]));c.apply(this,d)}else c.call(this,require(b));else{("string"==typeof b||b instanceof String)&&(b=[b]);for(var f=0;f<b.length;f++){var g=b[f],h=a;g=g.replace("/",".").split(".");for(var i=0;i<g.length;i++){var j=g[i],k=h[j];if(!k){d.push(null);break}i===g.length-1&&d.push(k),h=k}}c.apply(this,d)}};return b}),function(a,b,c){"use strict";if("function"==typeof define&&define.amd)define(["jquery","backbone"],function(a,b){return c(a,b)});else if("undefined"!=typeof module&&module.exports&&"function"==typeof require){var d=require("jquery"),e=require("backbone");module.exports=c(d,e)}else for(var f=b.split("."),g=a||this,h=0;h<f.length;h++){var i=f[h],j=g[i];g=g[i]=h===f.length-1?c(a.jQuery||window.jQuery,a.Backbone||window.Backbone,a.Application||window.Application||a.Backbone||window.Backbone):j||{}}}(this,"backchart.base.model",function(a,b,c){var d=c.Model.extend({});return d}),function(a,b,c){"use strict";if("function"==typeof define&&define.amd)define(["jquery","underscore","backbone","backchart.base/loader","backchart.base/logger"],function(a,b,d,e){return c(a,b,d,e)});else if("undefined"!=typeof module&&module.exports&&"function"==typeof require){var d=require("jquery"),e=require("backbone"),f=require("underscore");require("backchart.base/logger");var g=require("backchart.base/loader");module.exports=c(d,f,e,g)}else for(var h=b.split("."),i=a||this,j=0;j<h.length;j++){var k=h[j],l=i[k];i=i[k]=j===h.length-1?c(a.jQuery||window.jQuery,a._||window._,a.Backbone||window.Backbone,a.Application||window.Application||a.Backbone||window.Backbone,a.backchart.base.loader):l||{}}}(this,"backchart.base.collection",function(a,b,c,d,e){var f=d.Collection.extend({_backchart:!0,constructor:function(){d.Collection.apply(this,arguments)},initialize:function(){return this._silence=!1,this._modelOptions={},d.Collection.prototype.initialize.apply(this,arguments)},setSilence:function(a){this._silence=a},set:function(b,d){var e=a.extend({silent:!0},d);if(this._silence===!0)return c.Collection.prototype.set.apply(this,[b,e]);this.setSilence(!0);var f=c.Collection.prototype.set.apply(this,[b,e]);return this.setSilence(!1),this.trigger("seted",this.models,this,d),f},remove:function(b,d){var e=a.extend({silent:!0},d);if(this._silence===!0)return c.Collection.prototype.remove.apply(this,[b,e]);this.setSilence(!0);var f=c.Collection.prototype.remove.apply(this,[b,e]);this.setSilence(!1);for(var g=b.length;g>=0;g--){var h=b[g];this._modelOptions[h]&&delete this._modelOptions[h]}return this.trigger("removed",this.models,this,d),f},reset:function(a,b){if(this._silence===!0)return c.Collection.prototype.reset.apply(this,arguments);this.setSilence(!0);var d=c.Collection.prototype.reset.apply(this,arguments);return this.setSilence(!1),this.trigger("reseted",this,b),d},getOptions:function(a){var b=this;if((a instanceof String||"string"==typeof a)&&(a=b.get(a)),a instanceof c.Model)for(var d=b.models.length-1;d>=0;d--){var e=b.models[d];if(e.cid===a.cid)return b._modelOptions[e.cid]||(b._modelOptions[e.cid]={}),b._modelOptions[e.cid]}return null},_setOptions:function(b,c){var d=this;return d._modelOptions[b.cid]?d._modelOptions[b.cid]=a.extend(d._modelOptions[b.cid],c):d._modelOptions[b.cid]=a.extend({},c),d._modelOptions[b.cid]},setOptions:function(a,b){var d=this;if((a instanceof String||"string"==typeof a)&&(a=d.get(a)),a instanceof c.Model)for(var e=d.models.length-1;e>=0;e--){var f=d.models[e];f.cid===a.cid&&d._setOptions(a,b)}return null},_setVisible:function(a,b){var d=this;if((a instanceof String||"string"==typeof a)&&(a=d.get(a)),a instanceof c.Model)for(var e=d.models.length-1;e>=0;e--){var f=d.models[e];if(f.cid===a.cid)return d._setoptions(a,{visible:b}),d.trigger("change:visible",b),a}return null},hide:function(a){return this._setVisible(a,!1)},show:function(a){return this._setVisible(a,!0)},isVisibled:function(a){var b=this.getOptions(a);return b&&b.visible===!1?!1:!0}});return f}),function(a,b,c){"use strict";if("function"==typeof define&&define.amd)define(["jquery","backbone","underscore"],function(a,b,d){return c(a,b,d)});else if("undefined"!=typeof module&&module.exports&&"function"==typeof require){var d=require("jquery"),e=require("underscore"),f=require("backbone");module.exports=c(d,f,e)}else for(var g=b.split("."),h=a||this,i=0;i<g.length;i++){var j=g[i],k=h[j];h=h[j]=i===g.length-1?c(a.jQuery||window.jQuery,a.Backbone||window.Backbone,a._||window._,a.Application||window.Application||a.Backbone||window.Backbone):k||{}}}(this,"backchart.base.view",function(a,b,c,d){var e=d.View.extend({tagName:"div",className:"backchart",_collectionPrefix:"_bcname",_viewPrefix:"_bcview",container:null,eventCallback:{"default":"render"},_getEventCallback:function(a){var b=this.eventCallback[a]||this.eventCallback["default"];return b?this[b]:this.render},setSilence:function(a){this._silence=a},_setVisible:function(a,b){var c=this;if("string"==typeof a||a instanceof String){var e=c._collectionOptions[a];e&&(e.visible=b)}else a instanceof d.Collection&&c.eachCollection(function(c,d,e,f){d===a&&(f.visible=b)});return c.render(),c},hide:function(a){return this._setVisible(a,!1)},show:function(a){return this._setVisible(a,!0)},isVisibled:function(a){var b=this;if("string"==typeof a||a instanceof String){var c=b._collectionOptions[a];return c?c.visible:!1}if(a instanceof d.Collection){var e={};return b.eachCollection(function(b,c,d,f){c===a&&(e[b]=f?f.visible:!1)}),e}},initialize:function(){var a=this;a._silence=!1,b.View.prototype.initialize.apply(this,arguments),a.collections={},a._collectionOptions={},a._collectionRenderOptions={},this.on("collection.on",function(b,c,d,e){e.renderAfterOn===!0&&a.render(!0)}),this.on("collection.off",function(){a.render(!0)}),this.on("destroyed",function(){a.clearCollection(),a.Chart&&a.Chart.clear()})},__bce:function(a,b,d){var e=this;c.each(b,function(a){e.listenTo(d,a,e._getEventCallback(a))})},__ubce:function(a,b,d){var e=this;c.each(b,function(a){d.off(a,e._getEventCallback(a))})},_getBindEvents:function(a){var b=["set","add","change","destroy","reset","sort"];return"undefined"!=typeof a._backchart&&(b=["seted","removed","change","destroy","reseted","sort","change:visible"]),b},_bindCollectionEvent:function(a,b,c){c.silence!==!0&&this.__bce(a,this._getBindEvents(b),b)},_unbindColletionEvent:function(a,b){this.__ubce(a,this._getBindEvents(b),b)},_collectionHasBind:function(a){for(var b in this.collections)if(this.collections[b]===a)return!0;return!1},onCollection:function(a,b,e){b=b||{},e=e||{};var f=this,g=e.bid||c.uniqueId(f._collectionPrefix);if(!(!a instanceof d.Collection)){f._collectionHasBind(a)||(f._bindCollectionEvent(g,a,e),f.trigger("collection.bindEvent",a)),f.collections[g]=a;var h=c.clone(b);return f._collectionOptions[g]=e,f._collectionRenderOptions[g]=h,f.trigger("collection.on",g,a,h,e),g}},onCollections:function(a,b,d){var e=this;!a instanceof Array&&(a=[a]);var f={};return c.each(a,function(a){f[a]=e.onCollection(a,b,d)}),f},unCollection:function(a){var b=this,e=null;if("string"==typeof a||a instanceof String){if(e=b.collections[a]){delete b.collections[a];var f=b._collectionRenderOptions[a],g=b._collectionOptions[a];delete b._collectionRenderOptions[a],delete b._collectionOptions[a],b._collectionHasBind(e)||(b._unbindColletionEvent(a,e),b.trigger("collection.unbindEvent",e)),b.trigger("collection.off",a,e,f,g)}return e}if(a instanceof d.Collection){var h=[];e=a;for(var i in b.collections)b.collections[i]===e&&h.push(i);return c.each(h,function(a){b.unCollection(a)}),e}},clearCollection:function(){var a=this,b=c.keys(this.collections);return c.each(b,function(b){a.unCollection(b)}),this},eachCollection:function(a){var b=this;for(var c in b.collections)a.call(b.collections[c],c,b.collections[c],b._collectionRenderOptions[c],b._collectionOptions[c])},getCollection:function(a){var b=this;if("boolean"==typeof a&&a===!1)return c.uniq(c.values(b.collections));if("string"==typeof a||a instanceof String)return b.collections[a];if(a instanceof d.Collection){var e=[];return b.eachCollection(function(b){this===a&&e.push(b)}),e}var f={};return b.eachCollection(function(a){"undefined"==typeof f[this]&&(f[this]=[]),f[this].push(a)}),f},getOptions:function(a){var b=this,c=null;return"string"==typeof a||a instanceof String?b._collectionOptions[a]:a instanceof d.Collection?(c=[],b.eachCollection(function(b,d,e,f){d===a&&c.push(f)}),c):(c={},b.eachCollection(function(a,b,d,e){"undefined"==typeof c[this]&&(c[this]=[]),c[this].push(e)}),c)},getRenderOptions:function(a){var b=this,c=[];return"string"==typeof a||a instanceof String?b._collectionRenderOptions[a]:a instanceof d.Collection?(c=[],b.eachCollection(function(b,d,e){d===a&&c.push(e)}),c):(c={},b.eachCollection(function(a,b,d){"undefined"==typeof c[this]&&(c[this]=[]),c[this].push(d)}),c)},renderBefore:function(){var b=this;if(b.container)return b.$container=a(b.container),b.$container.is(":hidden")?!1:b._silence===!0?!1:!0},renderAfter:function(){return this.trigger.apply(this,["rendered"].concat(Array.prototype.slice.call(arguments,0))),a(this.container).trigger("backchart.rendered",arguments),this},elFillParents:function(){this.$el.css({width:this.width?this.width+"px":"100%",height:this.height?this.height+"px":"100%"})},getChartOptions:function(){return null}});return e}),function(a,b,c){"use strict";if("function"==typeof define&&define.amd)define(["jquery","../backchart.base/model"],function(a,b){return c(a,b)});else if("undefined"!=typeof module&&module.exports&&"function"==typeof require){var d=require("jquery"),e=require("../backchart.base/model");module.exports=c(d,e)}else for(var f=b.split("."),g=a||this,h=0;h<f.length;h++){var i=f[h],j=g[i];g=g[i]=h===f.length-1?c(a.jQuery||window.jQuery,a.backchart.base.model):j||{}}}(this,"backchart.canvasjs.model",function(a,b){var c=b.extend({_setAlias:function(a,b,c){"undefined"!=typeof a[b]&&(a[c]=a[b])},constructor:function(a,c){return c=c||{},c.parse=this.parse,b.prototype.constructor.apply(this,[a,c])},parse:function(a){return this.xField&&(this._setAlias(a,this.xField,"x"),this.timestamp&&(a.x=1e3*a.x)),this.yField&&this._setAlias(a,this.yField,"y"),this.labelField&&("string"==typeof this.labelField?this._setAlias(a,this.labelField,"label"):"function"==typeof this.labelField&&this.labelField.call(a)),a}});return c}),function(a,b,c){"use strict";if("function"==typeof define&&define.amd)define(["jquery","../backchart.base/collection"],function(a,b){return c(a,b)});else if("undefined"!=typeof module&&module.exports&&"function"==typeof require){var d=require("jquery"),e=require("../backchart.base/collection");module.exports=c(d,e)}else for(var f=b.split("."),g=a||this,h=0;h<f.length;h++){var i=f[h],j=g[i];g=g[i]=h===f.length-1?c(a.jQuery||window.jQuery,a.backchart.base.collection):j||{}}}(this,"backchart.canvasjs.collection",function(a,b){var c=b.extend({});return c}),function(a,b,c){"use strict";if("function"==typeof define&&define.amd)define(["jquery","../backchart.base/view","backbone","underscore","CanvasJS"],function(a,b,d,e,f){return f=f||window.CanvasJS,c(a,d,e,b,f)});else if("undefined"!=typeof module&&module.exports&&"function"==typeof require){var d=require("jquery"),e=require("../backchart.base/view"),f=require("backbone"),g=require("underscore"),h=require("CanvasJS")||window.CanvasJS;module.exports=c(d,f,g,e,h)}else for(var i=b.split("."),j=a||this,k=0;k<i.length;k++){var l=i[k],m=j[l];j=j[l]=k===i.length-1?c(a.jQuery||window.jQuery,a.Backbone||window.Backbone,a._||window._,a.backchart.base.view,a.CanvasJS||window.CanvasJS):m||{}}}(this,"backchart.canvasjs.view",function(a,b,c,d,e){var f=d.extend({defaultRenderOptions:{type:"column"},initialize:function(b,c){return d.prototype.initialize.apply(this,arguments),this.defaultOptions=a.extend(!0,{},this.defaultOptions,b),this.defaultRenderOptions=a.extend(!0,{},this.defaultRenderOptions,c),this},transformData:function(b,d){var e=this,f=[],g=a.extend(!0,{},e.defaultRenderOptions,d);return b.each(function(a){if(b.isVisibled(a)){var d=c.clone(a.attributes);f.push(d)}}),g.dataPoints=f,g},render:function(){var a=this,b=d.prototype.renderBefore.apply(a,arguments);if(!b)return!1;a.el.id||(a.el.id=c.uniqueId(a._viewPrefix||"_bcname"));var f=c.clone(a.defaultOptions);return f.data=[],a.eachCollection(function(b,c,d,e){c._silence||e.visible===!1||f.data.push(a.transformData(c,d))}),a.trigger("beforeRender",a,a.el.id,f),a.$container.empty().append(a.$el.empty()),a.elFillParents(),a.Chart=new e.Chart(a.el.id,f),a.__cOptions=f,a.Chart.render(),d.prototype.renderAfter.apply(a,[a,a.el,a.Chart,f])},getChartOption:function(){return this.__cOptions}});return f});