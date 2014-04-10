/*! backchart - v0.2.1 - 2014-04-10
* Copyright (c) 2014 ; Licensed  */
!function(a,b,c){"use strict";if("function"==typeof define&&define.amd)define(function(){return c()});else if("undefined"!=typeof module&&module.exports)module.exports=c();else for(var d=b.split("."),e=a||this,f=0;f<d.length;f++){var g=d[f],h=e[g];e=e[g]=f===d.length-1?c():h||{}}}(this,"backchart.base.logger",function(){if(!window.console){var a=function(a){window.alert(a)};window.console={log:a,info:a,warn:a,debug:a,error:a}}return window.console}),function(a,b,c){"use strict";if("function"==typeof define&&define.amd)define(function(){return c()});else if("undefined"!=typeof module&&module.exports)module.exports=c();else for(var d=b.split("."),e=a||this,f=0;f<d.length;f++){var g=d[f],h=e[g];e=e[g]=f===d.length-1?c():h||{}}}(this,"backchart.base.loader",function(){var a=this,b=function(b,c){var d=[];if("function"==typeof define&&define.amd)require(b instanceof Array?b:[b],c);else if("undefined"!=typeof module&&module.exports)if(b instanceof Array){for(var e=0;e<b.length;e++)d.push(require(b[e]));c.apply(this,d)}else c.call(this,require(b));else{("string"==typeof b||b instanceof String)&&(b=[b]);for(var f=0;f<b.length;f++){var g=b[f],h=a;g=g.replace("/",".").split(".");for(var i=0;i<g.length;i++){var j=g[i],k=h[j];if(!k){d.push(null);break}i===g.length-1&&d.push(k),h=k}}c.apply(this,d)}};return b}),function(a,b,c){"use strict";if("function"==typeof define&&define.amd)define(["jquery","backbone"],function(a,b){return c(a,b)});else if("undefined"!=typeof module&&module.exports){var d=require("jquery"),e=require("backbone");module.exports=c(d,e)}else for(var f=b.split("."),g=a||this,h=0;h<f.length;h++){var i=f[h],j=g[i];g=g[i]=h===f.length-1?c(a.jQuery||window.jQuery,a.Backbone||window.Backbone):j||{}}}(this,"backchart.base.model",function(a,b){var c=b.Model.extend({});return c}),function(a,b,c){"use strict";if("function"==typeof define&&define.amd)define(["jquery","underscore","backbone","backchart.base/loader","backchart.base/logger"],function(a,b,d,e){return c(a,b,d,e)});else if("undefined"!=typeof module&&module.exports){var d=require("jquery"),e=require("backbone"),f=require("underscore");require("backchart.base/logger");var g=require("backchart.base/loader");module.exports=c(d,f,e,g)}else for(var h=b.split("."),i=a||this,j=0;j<h.length;j++){var k=h[j],l=i[k];i=i[k]=j===h.length-1?c(a.jQuery||window.jQuery,a._||window._,a.Backbone||window.Backbone,a.backchart.base.loader):l||{}}}(this,"backchart.base.collection",function(a,b,c,d){var e=this,f=c.Collection.extend({_backchart:!0,constructor:function(){var b=this;this.fileType=null,this.parseOptions=a.extend({sheetIndex:0},b.parseOptions);var f=c.ajax;this._BackboneAjax=function(g){if("POST"!==g.type&&"GET"!==g.type)return f.apply(c.$,arguments);var h=b.fileType;if(!h&&g.url){var i=g.url.split("."),j=i.length>0?i.pop():"";switch(j.toLowerCase()){case"csv":h="csv";break;case"tsv":h="tsv";break;case"xls":h="xls";break;case"xlsx":h="xlsx"}}"json"!==h&&"undefined"!=typeof g.dataType&&(g.dataType="text");var k=g.success;return g.success=function(c,f,g){if(!h){var i=g.getResponseHeader("content-type")||"";"text/csv"===i?h="csv":/\/tsv/.test(i)?h="tsv":/vnd\.ms\-excel/.test(i)?h="xls":/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet/.test(i)&&(h="xlsx")}return h?void d(["backchart.utils/jszip/jszip","backchart.utils/codepage/cptable"],function(a){e.JSZip=a,d("backchart.utils/parser",function(a){switch(h){case"csv":c=a.parseCSV(c);break;case"tsv":c=a.parseTSV(c);break;case"xls":c=a.parseXLS(c,b.parseOptions);break;case"xlsx":c=a.parseXLSX(c,b.parseOptions)}return k.call(b,c,f,g)})}):(c="string"==typeof c?a.parseJSON(c):c,k.call(b,c,f,g))},f.call(c.$,g)},c.Collection.apply(this,arguments)},sync:function(){var a=c.ajax;c.ajax=this._BackboneAjax;var b=c.sync.apply(this,arguments);return c.ajax=a,b},initialize:function(){return this._silence=!1,this._modelOptions={},c.Collection.prototype.initialize.apply(this,arguments)},setSilence:function(a){this._silence=a},set:function(b,d){var e=a.extend({silent:!0},d);if(this._silence===!0)return c.Collection.prototype.set.apply(this,[b,e]);this.setSilence(!0);var f=c.Collection.prototype.set.apply(this,[b,e]);return this.setSilence(!1),this.trigger("seted",this.models,this,d),f},remove:function(b,d){var e=a.extend({silent:!0},d);if(this._silence===!0)return c.Collection.prototype.remove.apply(this,[b,e]);this.setSilence(!0);var f=c.Collection.prototype.remove.apply(this,[b,e]);this.setSilence(!1);for(var g=b.length;g>=0;g--){var h=b[g];this._modelOptions[h]&&delete this._modelOptions[h]}return this.trigger("removed",this.models,this,d),f},reset:function(a,b){if(this._silence===!0)return c.Collection.prototype.reset.apply(this,arguments);this.setSilence(!0);var d=c.Collection.prototype.reset.apply(this,arguments);return this.setSilence(!1),this.trigger("reseted",this,b),d},getOptions:function(a){var b=this;if((a instanceof String||"string"==typeof a)&&(a=b.get(a)),a instanceof c.Model)for(var d=b.models.length-1;d>=0;d--){var e=b.models[d];if(e.cid===a.cid)return b._modelOptions[e.cid]||(b._modelOptions[e.cid]={}),b._modelOptions[e.cid]}return null},_setOptions:function(b,c){var d=this;return d._modelOptions[b.cid]=d._modelOptions[b.cid]?a.extend(d._modelOptions[b.cid],c):a.extend({},c),d._modelOptions[b.cid]},setOptions:function(a,b){var d=this;if((a instanceof String||"string"==typeof a)&&(a=d.get(a)),a instanceof c.Model)for(var e=d.models.length-1;e>=0;e--){var f=d.models[e];f.cid===a.cid&&d._setOptions(a,b)}return null},_setVisible:function(a,b){var d=this;if((a instanceof String||"string"==typeof a)&&(a=d.get(a)),a instanceof c.Model)for(var e=d.models.length-1;e>=0;e--){var f=d.models[e];if(f.cid===a.cid)return d._setoptions(a,{visible:b}),d.trigger("change:visible",b),a}return null},hide:function(a){return this._setVisible(a,!1)},show:function(a){return this._setVisible(a,!0)},isVisibled:function(a){var b=this.getOptions(a);return b&&b.visible===!1?!1:!0}});return f}),function(a,b,c){"use strict";if("function"==typeof define&&define.amd)define(["jquery","backbone","underscore"],function(a,b,d){return c(a,b,d)});else if("undefined"!=typeof module&&module.exports){var d=require("jquery"),e=require("underscore"),f=require("backbone");module.exports=c(d,f,e)}else for(var g=b.split("."),h=a||this,i=0;i<g.length;i++){var j=g[i],k=h[j];h=h[j]=i===g.length-1?c(a.jQuery||window.jQuery,a.Backbone||window.Backbone,a._||window._):k||{}}}(this,"backchart.base.view",function(a,b,c){var d=b.View.extend({tagName:"div",className:"backchart",_collectionPrefix:"_bcname",_viewPrefix:"_bcview",container:null,eventCallback:{"default":"render"},_getEventCallback:function(a){var b=this.eventCallback[a]||this.eventCallback["default"];return b?this[b]:this.render},setSilence:function(a){this._silence=a},_setVisible:function(a,c){var d=this;if("string"==typeof a||a instanceof String){var e=d._collectionOptions[a];e&&(e.visible=c)}else a instanceof b.Collection&&d.eachCollection(function(b,d,e,f){d===a&&(f.visible=c)});return d.render(),d},hide:function(a){return this._setVisible(a,!1)},show:function(a){return this._setVisible(a,!0)},isVisibled:function(a){var c=this;if("string"==typeof a||a instanceof String){var d=c._collectionOptions[a];return d?d.visible:!1}if(a instanceof b.Collection){var e={};return c.eachCollection(function(b,c,d,f){c===a&&(e[b]=f?f.visible:!1)}),e}},initialize:function(){var a=this;a._silence=!1,b.View.prototype.initialize.apply(this,arguments),a.collections={},a._collectionOptions={},a._collectionRenderOptions={},this.on("collection.on",function(b,c,d,e){e.renderAfterOn===!0&&a.render(!0)}),this.on("collection.off",function(){a.render(!0)})},__bce:function(a,b,d){var e=this;c.each(b,function(a){e.listenTo(d,a,e._getEventCallback(a))})},__ubce:function(a,b,d){var e=this;c.each(b,function(a){d.off(a,e._getEventCallback(a))})},_getBindEvents:function(a){var b=["set","add","change","destroy","reset","sort"];return"undefined"!=typeof a._backchart&&(b=["seted","removed","change","destroy","reseted","sort","change:visible"]),b},_bindCollectionEvent:function(a,b,c){c.silence!==!0&&this.__bce(a,this._getBindEvents(b),b)},_unbindColletionEvent:function(a,b){this.__ubce(a,this._getBindEvents(b),b)},_collectionHasBind:function(a){for(var b in this.collections)if(this.collections[b]===a)return!0;return!1},onCollection:function(a,d,e){d=d||{},e=e||{};var f=this,g=e.bid||c.uniqueId(f._collectionPrefix);if(!(!a instanceof b.Collection)){f._collectionHasBind(a)||(f._bindCollectionEvent(g,a,e),f.trigger("collection.bindEvent",a)),f.collections[g]=a;var h=c.clone(d);return f._collectionOptions[g]=e,f._collectionRenderOptions[g]=h,f.trigger("collection.on",g,a,h,e),g}},onCollections:function(a,b,d){var e=this;!a instanceof Array&&(a=[a]);var f={};return c.each(a,function(a){f[a]=e.onCollection(a,b,d)}),f},unCollection:function(a){var d=this,e=null;if("string"==typeof a||a instanceof String){if(e=d.collections[a]){delete d.collections[a];var f=d._collectionRenderOptions[a],g=d._collectionOptions[a];delete d._collectionRenderOptions[a],delete d._collectionOptions[a],d._collectionHasBind(e)||(d._unbindColletionEvent(a,e),d.trigger("collection.unbindEvent",e)),d.trigger("collection.off",a,e,f,g)}return e}if(a instanceof b.Collection){var h=[];e=a;for(var i in d.collections)d.collections[i]===e&&h.push(i);return c.each(h,function(a){d.unCollection(a)}),e}},clearCollection:function(){var a=this,b=c.keys(this.collections);return c.each(b,function(b){a.unCollection(b)}),this},eachCollection:function(a){var b=this;for(var c in b.collections)a.call(b.collections[c],c,b.collections[c],b._collectionRenderOptions[c],b._collectionOptions[c])},getCollection:function(a){var d=this;if("boolean"==typeof a&&a===!1)return c.uniq(c.values(d.collections));if("string"==typeof a||a instanceof String)return d.collections[a];if(a instanceof b.Collection){var e=[];return d.eachCollection(function(b){this===a&&e.push(b)}),e}var f={};return d.eachCollection(function(a){"undefined"==typeof f[this]&&(f[this]=[]),f[this].push(a)}),f},getOptions:function(a){var c=this,d=null;return"string"==typeof a||a instanceof String?c._collectionOptions[a]:a instanceof b.Collection?(d=[],c.eachCollection(function(b,c,e,f){c===a&&d.push(f)}),d):(d={},c.eachCollection(function(a,b,c,e){"undefined"==typeof d[this]&&(d[this]=[]),d[this].push(e)}),d)},getRenderOptions:function(a){var c=this,d=[];return"string"==typeof a||a instanceof String?c._collectionRenderOptions[a]:a instanceof b.Collection?(d=[],c.eachCollection(function(b,c,e){c===a&&d.push(e)}),d):(d={},c.eachCollection(function(a,b,c){"undefined"==typeof d[this]&&(d[this]=[]),d[this].push(c)}),d)},renderBefore:function(){var b=this;if(b.container)return b.$container=a(b.container),b.$container.is(":hidden")?!1:b._silence===!0?!1:!0},renderAfter:function(){return this.trigger.apply(this,["rendered"].concat(Array.prototype.slice.call(arguments,0))),a(this.container).trigger("backchart.rendered",arguments),this},elFillParents:function(){this.$el.css({width:this.width?this.width+"px":"100%",height:this.height?this.height+"px":"100%"})},getChartOptions:function(){return null}});return d}),function(a,b,c){"use strict";if("function"==typeof define&&define.amd)define(["jquery","../backchart.base/model"],function(a,b){return c(a,b)});else if("undefined"!=typeof module&&module.exports){var d=require("jquery"),e=require("../backchart.base/model");module.exports=c(d,e)}else for(var f=b.split("."),g=a||this,h=0;h<f.length;h++){var i=f[h],j=g[i];g=g[i]=h===f.length-1?c(a.jQuery||window.jQuery,a.backchart.base.model):j||{}}}(this,"backchart.amcharts.model",function(a,b){var c=b.extend({categoryField:null,valueField:null,colorField:null,dataDateFormat:null});return c}),function(a,b,c){"use strict";if("function"==typeof define&&define.amd)define(["jquery","../backchart.base/collection"],function(a,b){return c(a,b)});else if("undefined"!=typeof module&&module.exports){var d=require("jquery"),e=require("../backchart.base/collection");module.exports=c(d,e)}else for(var f=b.split("."),g=a||this,h=0;h<f.length;h++){var i=f[h],j=g[i];g=g[i]=h===f.length-1?c(a.jQuery||window.jQuery,a.backchart.base.collection):j||{}}}(this,"backchart.amcharts.collection",function(a,b){var c=b.extend({});return c}),function(a,b,c){"use strict";if("function"==typeof define&&define.amd)define(["jquery","../backchart.base/view","backbone","underscore","AmCharts","../backchart.base/logger"],function(a,b,d,e,f,g){return f=f||window.AmCharts,c(a,d,e,b,f,g)});else if("undefined"!=typeof module&&module.exports){var d=require("jquery"),e=require("../backchart.base/view"),f=require("backbone"),g=require("underscore"),h=require("AmCharts")||window.AmCharts,i=require("../backchart.base/logger");module.exports=c(d,f,g,e,h,i)}else for(var j=b.split("."),k=a||this,l=0;l<j.length;l++){var m=j[l],n=k[m];k=k[m]=l===j.length-1?c(a.jQuery||window.jQuery,a.Backbone||window.Backbone,a._||window._,a.backchart.base.view,a.amcharts||window.AmCharts):n||{}}}(this,"backchart.amcharts.view",function(a,b,c,d,e){var f=d.extend({graphsFieldsForConflictTest:["valueField","alphaField","bulletField","bulletSizeField","colorField","fillColorsField","labelColorField","lineColorField"],mergeData:"simple",keyFields:{serial:["categoryField"],pie:["titleField","valueField"]},constructor:function(){this.defaultGraphsOptions={balloonText:"<b>[[category]]: [[value]]</b>",valueField:"value"},this.multiValueAxes=!1,this.defaultAxesOptions={},this.defaultDateAxesOptions={equalSpacing:!0},this.defaultOptions={type:"serial"},d.apply(this,arguments)},initialize:function(b,c,e){return d.prototype.initialize.apply(this,arguments),this.defaultOptions=a.extend(!0,{},this.defaultOptions,b),this.defaultGraphsOptions=a.extend(!0,{},this.defaultGraphsOptions,c),this.defaultAxesOptions=a.extend(!0,{},this.defaultAxesOptions,e),this.__rendered=!1,this},__mergeToDataProvider:function(b,d,e,f){for(var g=this,h={},i=d.length-1;i>=0;i--){var j=d[i],k=-1;if("simple"===g.mergeData)k=i;else if("category"===g.mergeData)for(var l=e.length-1;l>=0;l--)if(e[l][b]instanceof Date&&j[b]instanceof Date&&e[l][b].valueOf()===j[b].valueOf()||e[l][b]===j[b]){k=l;break}if(k>=0&&j){for(var m in f){var n=f[m];if(j[n]&&"undefined"!=typeof e[k][n]){var o=h[n];o||(o=c.uniqueId(n),h[n]=o),j[o]=j[n],delete j[n]}}e[k]=a.extend(e[k],j)}else e.push(j)}for(var p in h)for(var q in f)f[q]===p&&(f[q]=h[p]);return f},_createGraph:function(b){var d=this,f=[],g=[],h=[];b.type||(b.type="serial");for(var i=d.keyFields[b.type]||[],j={},k=0;k<i.length;k++)j[i[k]]=b[i[k]]||"_"+i[k];return d.eachCollection(function(k,l,m){for(var n=[],o=a.extend(!0,{},d.defaultGraphsOptions,m.graph),p=l.model?new l.model:null,q={},r={},s=d.graphsFieldsForConflictTest.length-1;s>=0;s--){var t=d.graphsFieldsForConflictTest[s],u=l[t]||(p?p[t]:null);u&&(q[t]=u)}for(var v=0;v<i.length;v++){var w=i[v],x=p[w]||l[w]||b[w];x&&(r[w]=x,b[w]=j[w])}var y=!1;if(l.each(function(a){if(l.isVisibled(a)){var d=c.clone(a.attributes);for(var f in j){var g=r[f];g&&(d[j[f]]=a.get(g))}if("serial"===b.type&&(a.dataDateFormat||b.dataDateFormat))if(b.categoryAxis&&"undefined"!=typeof b.categoryAxis.parseDates){var h=a.dataDateFormat||b.dataDateFormat;if("undefined"==typeof d[i[0]])return;d[i[0]]=e.stringToDate(d[i[0]],h),y=!0}else console.warn("One model's category field is Date Object, but not set categoryAxis.parseDates");n.push(d)}}),h.length?q=d.__mergeToDataProvider(i[0],n,h,q):h=n,o=a.extend(o,q),y&&(b.categoryAxis=a.extend(!0,{},b.categoryAxis,d.defaultDateAxesOptions)),m.axes)if(d.multiValueAxes===!0){var z=a.extend(!0,{},d.defaultAxesOptions,m.axes);z.id=c.uniqueId("_axes"),g.push(z),o.valueAxis=z.id}else g.length?console.info("We has ignored one valueAxes configuration because the multiValueAxes option is false."):g.push(a.extend(!0,{},d.defaultAxesOptions,m.axes));f.push(o)}),b.dataProvider=h,b.valueAxes=g,b.graphs=f,b},transformOptions:function(a){var b=this;return a=b._createGraph(a)},render:function(b){var f=this,g=d.prototype.renderBefore.apply(f,arguments);if(!g)return!1;f.el.id||(f.el.id=c.uniqueId(f._viewPrefix||"_bcname"));var h=c.clone(f.defaultOptions);return h=f.transformOptions(h),f.__cOptions=h,f.Chart&&!b?(f.trigger("beforeValidateData",f,f.el.id,h.dataProvider),f.Chart.dataProvider=h.dataProvider,void f.Chart.validateData()):(f.trigger("beforeRender",f,f.el.id,h),f.$container.empty().append(f.$el.empty()),f.elFillParents(),f.Chart=e.makeChart(f.el.id,a.extend(!0,{},h)),f.Chart.write(f.el.id),d.prototype.renderAfter.apply(f,[f,f.el,f.Chart,h]))},getChartOption:function(){return this.__cOptions}});return f});