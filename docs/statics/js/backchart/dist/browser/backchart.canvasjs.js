/*! backchart - v0.1.0 - 2014-02-24 *//*! backchart - v0.1.0 - 2014-02-24 */(function(root, name, factory) {
	"use strict";
	if (typeof define === 'function' && define.amd) {
		define(['jquery','backbone'], function($, Backbone) {
			return factory($, Backbone);
		});
	}else if(typeof module !== 'undefined' && module.exports){
		var $ = require("jquery"),
		Backbone = require("backbone");
		module.exports = factory($, Backbone);
	}else{
		var namespaces = name.split("."),
		//scope = (root.jQuery || root.ender || root.$ || root || this);
		scope = root || this;
		for (var i=0; i<namespaces.length; i++) {
			var p = namespaces[i],
				ex = scope[p];
			scope = scope[p] = (i === namespaces.length - 1) ?
				factory(
					(root.jQuery || window.jQuery), 
				    (root.Backbone || window.Backbone)
				):
				(ex || {});
		}
	}
}(this, "backchart.base.model", function($, Backbone) {
	/**
	* Backbone chart base model
	* @module base/model
	* @requires jquery
	* @requires backbone
	* @this {Backbone.Model}
	*/                     
	var chartBaseModel = Backbone.Model.extend(
		/** @lends module:base/model.prototype */
		{});
	return chartBaseModel;
}));

(function(root, name, factory) {
	"use strict";
	if (typeof define === 'function' && define.amd) {
		define(['jquery','backbone'], function($, Backbone) {
			return factory($, Backbone);
		});
	}else if(typeof module !== 'undefined' && module.exports){
		var $ = require("jquery"),
		Backbone = require("backbone");
		module.exports = factory($, Backbone);
	}else{
		var namespaces = name.split("."),
		//scope = (root.jQuery || root.ender || root.$ || root || this);
		scope = root || this;
		for (var i=0; i<namespaces.length; i++) {
			var p = namespaces[i],
				ex = scope[p];
			scope = scope[p] = (i === namespaces.length - 1) ? 
				factory(
					(root.jQuery || window.jQuery),
					(root.Backbone || window.Backbone)
				):
				(ex || {});
		}
	}
}(this, "backchart.base.collection",function($, Backbone) {   
	/**
	 * Backbone chart base collection 
	 * @module base/collection
	 * @requires jquery
	 * @requires backbone
	 * @this {Backbone.Collection}
	 */
	var exports = Backbone.Collection.extend(
		/** 
		* @lends module:base/collection.prototype 
		*/
		{
		/**
		 * A significant that indicate this class is Backchart collection
		 * @type {boolean}
		 * @static
		 */
		_backchart : true,
        /**
         * initialize
         * @return {Backbone.Collection}
         */
		initialize: function(){
			this._silence = false;
			return Backbone.Collection.prototype.initialize.apply(this, arguments);
		},
		/**
		 * Set the silence flag.If you want to set lots of data to append, you can set it to true for ban the collection creating seted, removed and reseted event.If you set the flag to true, please recover the flag to false after you finished your work.
         *
         * @param {boolean} flag
         * @return
         */
		setSilence : function(flag){
			this._silence = flag;
		},
		/**
		 * Override collection set function and trigger seted event after processing has done.
		 * When these function processing, collection will enter the "silence" model for avoiding to render chart repeatedly.
		 * @see {@link http://backbonejs.org/#Collection-set Set}
		 *
         * @param {(Backbone.Model[]|String[])} models
         * @param {Object} options
		 * @fires Backbone.Collection#seted
         * @return
         */
		set : function(models, options){
			if (this._silence === true){
				return Backbone.Collection.prototype.set.apply(this, arguments);

			}
			this.setSilence(true);
			var result = Backbone.Collection.prototype.set.apply(this, arguments);
			this.setSilence(false);
			this.trigger('seted', this.models, this, options);
			return result;
		},
		/**
		 * Override collection remove function and trigger removed event after processing has done.
		 * When these function processing, collection will enter the "silence" model for avoiding to render chart repeatedly.
		 * @see {@link http://backbonejs.org/#Collection-remove Remove}
		 *
		 * @param {(Backbone.Model[]|String[])} models
         * @param {Object} options
		 * @fires Backbone.Collection#removed
         * @return
         */
		remove: function(models, options){
			if (this._silence === true){
				return Backbone.Collection.prototype.remove.apply(this, arguments);
			}
			this.setSilence(true);
			var result = Backbone.Collection.prototype.remove.apply(this, arguments);
			this.setSilence(false);
			this.trigger('removed', this.models, this, options);
			return result;
		},
		/**
		 * Override collection reset function and trigger reseted event after processing has done.
		 * When these function processing, collection will enter the "silence" model for avoiding to render chart repeatedly.
		 * @see {@link http://backbonejs.org/#Collection-reset Reset}
		 *
		 * @param {(Backbone.Model[]|String[])} models
         * @param {Object} options
		 * @fires Backbone.Collection#reseted
         * @return
         */
		reset: function(models, options){
			if (this._silence === true){
				return Backbone.Collection.prototype.reset.apply(this, arguments);
			}
			this.setSilence(true);
			var result = Backbone.Collection.prototype.reset.apply(this, arguments);
			this.setSilence(false);
			this.trigger('reseted', this, options);
			return result;
		}
	});
	return exports;
}));

(function(root, name, factory) {
	"use strict";
	if (typeof define === 'function' && define.amd) {
		define(['jquery','backbone',"underscore"], function($, Backbone, _) {
			return factory($, Backbone, _);
		});
	}else if(typeof module !== 'undefined' && module.exports){
		var $ = require("jquery"),
		_ = require("underscore"),
		Backbone = require("backbone");
		module.exports = factory($, Backbone, _);
	}else{
		var namespaces = name.split("."),
		//scope = (root.jQuery || root.ender || root.$ || root || this);
		scope = root || this;
		for (var i=0; i<namespaces.length; i++) {
			var p = namespaces[i],
				ex = scope[p];
			scope = scope[p] = (i === namespaces.length - 1) ?
				factory(
					(root.jQuery || window.jQuery),
					(root.Backbone || window.Backbone),
					(root._ || window._)
				):
				(ex || {});
		}
	}
}(this, "backchart.base.view", function($, Backbone, _) {
    /**
	 * Backbone chart base view
	 * @module base/view
	 * @requires jquery
	 * @requires backbone
     * @this {Backbone.View}
     */
	var chartBaseView = Backbone.View.extend(
		/** 
		* @lends module:base/view.prototype 
		*/
		{
		tagName: "div",
		/**
		* The element default class name
		* @type {string}
		*/ 
		className: "backchart",
		/**
		* The collection bind ID prefix
		* @type {string}
		* @protected
		*/
		_collectionPrefix : "_cname",
		/**
		 * The element which the view's element append to.
		 * @type {element}
		 */
		container: null,
		/**
		 * To define the callback of event which has listened to collection
		 * @type {Object}
		 * @example <caption>Appoint to the callback of set event</caption>
		 * eventCallback :{
		 *   "set" : "setCallback"
		 * }
		 */
		eventCallback: {
			"default" : "render"
		},
        /**
         * _getEventCallback
		 *
		 * @private
		 * @description return the callback event from eventCallback
         * @param {string} eventName
         * @return {function} callback function
         */
		_getEventCallback: function(eventName){
			var callbackName = this.eventCallback[eventName] || this.eventCallback["default"];
			return callbackName ? this[callbackName] : this.render;
		},
		/**
		 * The silence flag which can suspend responding events from all bind collections when be set to true.
		 * It can be used when you refresh or set lots of data to avoid to draw repeatedly.
		 * Normally ,chart will be rendered many times because sync/set function will create many add/remove events in backbone when batch processing. You can set it to true for closing auto-redraw in view.
		 * If you set the flag personally ,you should remember recover it to default after all operation has done.
		 *
		 * @param {boolean} flag
		 */
		setSilence: function(flag){
			this._silence = flag;
		},
		/**
		 * Collection is visible or not
		 *
		 * @private
		 * @param  {(string|backchart.base.collection|Backbone.Collection)} bindIdOrCollection
		 *    If it's a string ,will hide the graph that the bind ID correspond with.
		 *    If it's a Collection instance, will hide all graphs rendered by this data source.
		 * @return {backchart.base.view} this instance
		 */
		_setVisible: function(bindIdOrCollection, visible){
			var me = this;
			if (typeof bindIdOrCollection === "string" || bindIdOrCollection instanceof String){
				var bc = me._collectionOptions[bindIdOrCollection];
				if (bc){
					bc.visible = visible;
				}
			}else if (bindIdOrCollection instanceof Backbone.Collection){
				me.eachCollection(function(uid, collection, rdOptions, options){
					if (collection === bindIdOrCollection){
						options.visible = visible;
					}
				});
			}
			me.render();
			return me;
		},
		/**
		 * Hide a set of data graph
		 * @param  {(string|backchart.base.collection|Backbone.Collection)} bindIdOrCollection
		 * @return {backchart.base.view} this instance
		 */
		hide: function(bindIdOrCollection){
			return this._setVisible(bindIdOrCollection, false);
		},
		/**
		 * Show a set of data points
		 * @param  {(string|backchart.base.collection|Backbone.Collection)} bindIdOrCollection
		 * @return {backchart.base.view} this instance
		 */
		show: function(bindIdOrCollection){
			return this._setVisible(bindIdOrCollection, true);
		},
		/**
		 * Check a graph visible status
		 * @param  {(string|backchart.base.collection|Backbone.Collection)} bindIdOrCollection
		 * @return {boolean}
		 */
		isVisibled: function(bindIdOrCollection){
			var me = this;
			if (typeof bindIdOrCollection=== "string" || bindIdOrCollection instanceof String){
				var bc = me._collectionOptions[bindIdOrCollection];
				return bc ? bc.visible : false;
			}else if (bindIdOrCollection instanceof Backbone.Collection){
				var Options = {};
				me.eachCollection(function(uid, collection, renderOption, options){
					if (collection === bindIdOrCollection){
						Options[uid] = options ? options.visible : false;
					}
				});
				return Options;
			}
		},
		/**
		 * initialize
         * @return {Backbone.View}
		 */
		initialize: function(){
			var me = this;
			me._silence = false;
			Backbone.View.prototype.initialize.apply(this, arguments);

			//initialize collections
			me.collections = {};
			me._collectionOptions = {};
			me._collectionRenderOptions = {};

			//bind on and off events
			this.on("collection.on", function(unid, collection, renderOpt, options){
				if (options.renderAfterOn === true){
					me.render();
				}
			});
			this.on("collection.off", function(){
				me.render();
			});
		},
		__bce: function(unid, evearr, collection){
			var me = this;
			_.each(evearr, function(eve){
				me.listenTo(collection, eve, me._getEventCallback(eve));
				//collection.on(eve+":"+unid, me._getEventCallback(eve));
				//collection.on(eve, me._getEventCallback(eve));
			});
		},
		__ubce: function(unid, evearr, collection){
			var me = this;
			_.each(evearr, function(eve){
				//collection.off(eve+":"+unid, me._getEventCallback(eve));
				collection.off(eve, me._getEventCallback(eve));
			});
		},
		_getBindEvents:function(collection){
			var listenEvents = ['set','add','change','destroy','reset','sort'];
			if (typeof collection._backchart !== "undefined"){
				listenEvents = ['seted','removed','change','destroy','reseted','sort',"change:visible"];
			}
			return listenEvents;
		},
        /**
		 * Listen to one collection events
         *
		 * @protected
         * @param {string} unid
		 * @param  {(backchart.base.collection|Backbone.Collection)} collection
         * @param {Object} options
         */
		_bindCollectionEvent: function(unid, collection, options){
			if (options.silence === true){
				return;
			}
			this.__bce(unid, 
					   this._getBindEvents(collection),
					   collection);
		},
		/**
		 * Remove listener on one collection
         *
		 * @protected
         * @param {string} unid
		 * @param  {(backchart.base.collection|Backbone.Collection)} collection
         */
		_unbindColletionEvent: function(unid, collection){
			this.__ubce(unid, 
						this._getBindEvents(collection),
						collection);
		},
        /**
         * Determine whether an collection has be listened to
         *
		 * @param  {(backchart.base.collection|Backbone.Collection)} collection
         * @return {boolean}
         */
		_collectionHasBind: function(collection){
			for(var uid in this.collections){
				if (this.collections[uid] === collection){
					return true;
				}
			}
			return false;
		},
		/**
		 * Bind one collection to this view
		 * The collection will be listened to the following events if it's inherit from backchart.base.collection.
		 * 'seted','removed','change','destroy','reseted','sort','change:visible'
		 * Otherwise, the following events will be listend to.
		 * 'set','add','change','destroy','reset','sort'
		 *
		 * @param {(backchart.base.collection|Backbone.Collection)} collection
		 * @param {Object} renderOptions render chart options which based what chart library you used.
		 * @param {Object} options
		 * @param {string} [options.bid] a unique id as the bind ID
		 * @param {boolean} [options.silence=false] not responded to any event from this collection
		 * @param {boolean} [options.visible=true] Display or not, you can use hide/show function to dynamic control.
		 * @param {boolean} [options.renderAfterOn=false] redraw the chart after finished to bind.
		 * @return {string} a bind ID
		 */
		onCollection: function(collection, renderOptions, options){
			renderOptions = renderOptions || {};
			options = options || {};
			var me = this,
			unid =	options.bid || _.uniqueId(me._collectionPrefix);

			if (!collection instanceof Backbone.Collection){
				return;
			}	    
			//bind collection
			if (!me._collectionHasBind(collection)){
				me._bindCollectionEvent(unid, collection, options);
				me.trigger("collection.bindEvent", collection);
			}
			//add collection to my collections
			me.collections[unid] = collection;

			//set render options
			var _rdOptions = _.clone(renderOptions);
			me._collectionOptions[unid] = options;
			me._collectionRenderOptions[unid] = _rdOptions;
			//trigger collection.add event
			me.trigger("collection.on", unid, collection, _rdOptions, options);
			return unid;
		},
		/**
		 * Bind one or more collections
         *
		 * @param {(backchart.base.collection[]|Backbone.Collection[])} collections
         * @param {Object} renderOptions same as onCollection
         * @param {Object} options same as onCollection
		 * @return {Object} The key of this return is the collection instance and the value is the bind ID assigned.
         */
		onCollections: function(collections, renderOptions, options){
			var me = this;
			if (!collections instanceof Array){
				collections = [collections];
			}
			var bid = {};
			_.each(collections, function(collection){
				bid[collection] = me.onCollection(collection, renderOptions, options);
			});
			return bid;
		},
		/**
		 * Remove one collection from the view
		 * @param {(string|backchart.base.collection|Backbone.Collection)} unid pass the bind ID or collection instance in here.If convey a collection instance to, we will remove all bind configure about this collection.
		 * @return {(backchart.base.collection|Backbone.Collection)} the collection instance or null
		 */
		unCollection: function(unid){
			var me = this,
			collection = null;
			if (typeof unid === "string" || unid instanceof String){
				collection = me.collections[unid];
				if (collection){
					delete me.collections[unid];
					var _rdOptions = me._collectionRenderOptions[unid];
					var _options = me._collectionOptions[unid];
					delete me._collectionRenderOptions[unid];
					delete me._collectionOptions[unid];
					/*
					 * If collection not exist in this
					 */
					if (!me._collectionHasBind(collection)){
						me._unbindColletionEvent(unid, collection);
						me.trigger("collection.unbindEvent", collection);
					}
					me.trigger("collection.off", unid, collection, _rdOptions, _options);
				}
				return collection;
			}else if (unid instanceof Backbone.Collection){
				var removeUnids = [];
				collection = unid;
				for(var uid in me.collections){
					if (me.collections[uid] === collection){
						removeUnids.push(uid);
					}
				}
				_.each(removeUnids, function(unid){
					me.unCollection(unid);
				});
				return collection;
			}
		},
		/**
		 * Remove all collections has binded to the view
		 *
         * @return {backchart.base.view} this instance
		 */
		clearCollection: function(){
			var me = this;
			var unids = _.keys(this.collections);
			_.each(unids, function(unid){
				me.unCollection(unid);
			});
			return this;
		},
		/**
		 * A generic iterator function, which can be used to seamlessly iterate collection has binded in this view
		 * This function same as the [jQuery.each]{@link https://api.jquery.com/jQuery.each/} function.The callback is passed an bind ID, the instance of collection, the render options and the config options.The this always as an collection currently in callback function.
		 * @param {eachCallback} eachcb - The callback that handles the response.
		 */
		eachCollection: function(fn){
			var me = this;
			for(var uid in me.collections){
				fn.call(me.collections[uid], uid, me.collections[uid], me._collectionRenderOptions[uid], me._collectionOptions[uid]);
			}
		},
		/**
		* The callback of eachCollection
		* @callback eachCallback
		* @param {string} bid the bind ID
		* @param {(backchart.base.collection|Backbone.Collection)} collection the collection instance
		* @param {Object} renderOptions same as onCollection
        * @param {Object} options same as onCollection
		*/

		/**
		 * Get collections by bind ID or get bind IDs by collection
		 *   If it's Boolean type and false, will return a Array contained all collections binded in this view
		 *   If it's String type ,will return the representative collection.
		 *   If it's a instance of Backbone.Collection, will return a Array contained all bind IDs
		 *   else return a map ,key is collections ,values is uid array corresponded
		 * @param {(boolean|string|backchart.base.collection|Backbone.Collection)} bindIDOrCollection 
		 * @return {(backchart.base.collection[]|Backbone.Collection[]|backchart.base.collection|Backbone.Collection|string[]|Object)}
		 */
		getCollection: function(getBindID){
			var me = this;
			if (typeof getBindID === "boolean" && getBindID === false){
				return _.uniq(_.values(me.collections));
			}else if (typeof getBindID === "string" || getBindID instanceof String){
				return me.collections[getBindID];
			}else if (getBindID instanceof Backbone.Collection){
				var uids = [];
				me.eachCollection(function(uid){
					if (this === getBindID){
						uids.push(uid);
					}
				});
				return uids;
			}else{
				var cols = {};
				me.eachCollection(function(uid){
					if (typeof cols[this] === "undefined"){
						cols[this] = [];
					}
					cols[this].push(uid);
				});
				return cols;
			}
		},
		/**
		 * Get collection's option by bind ID or collection instance
		 *   If it's String type ,will return the representative collection's options.
		 *   If it's a instance of Backbone.Collection, will return a Array contained all options
		 *   else return a map ,key is collection instance ,values is its options
		 * @param {(string|backchart.base.collection|Backbone.Collection)} bindIDOrCollection 
		 * @return {(Object[]|Object)}
		 */

		getOptions: function(getBindID){
			var me = this,
			Options = null;
			if (typeof getBindID === "string" || getBindID instanceof String){
				return me._collectionOptions[getBindID];
			}else if (getBindID instanceof Backbone.Collection){
				Options = [];
				me.eachCollection(function(uid, collection, renderOption, options){
					if (collection === getBindID){
						Options.push(options);
					}
				});
				return Options;
			}else{
				Options = {};
				me.eachCollection(function(uid, collection, renderOption, options){
					if (typeof Options[this] === "undefined"){
						Options[this] = [];
					}
					Options[this].push(options);
				});
				return Options;
			}
		},
		/**
		 * Get collection's renderOptions by bind ID or collection instance
		 *   If it's String type ,will return the representative collection's options.
		 *   If it's a instance of Backbone.Collection, will return a Array contained all options
		 *   else return a map ,key is collection instance ,values is its options
		 * @param {(string|backchart.base.collection|Backbone.Collection)} bindIDOrCollection 
		 * @return {(Object[]|Object)}
		 */
		getRenderOptions : function(getBindID){
			var me = this,
			renderOptions = [];
			if (typeof getBindID === "string" || getBindID instanceof String){
				return me._collectionRenderOptions[getBindID];
			}else if (getBindID instanceof Backbone.Collection){
				renderOptions = [];
				me.eachCollection(function(uid, collection, renderOption){
					if (collection === getBindID){
						renderOptions.push(renderOption);
					}
				});
				return renderOptions;
			}else{
				renderOptions = {};
				me.eachCollection(function(uid, collection, renderOption){
					if (typeof renderOptions[this] === "undefined"){
						renderOptions[this] = [];
					}
					renderOptions[this].push(renderOption);
				});
				return renderOptions;
			}

		},
		/**
		 * The default function should be invoke before rendered.All View class inherited MUST call this function before call the render.
		 * If the function return false, you should give up the rendering process immediately.
		 * Here is a example:
		 * @example
		 *   baseview.extend({
		 *    ...
		 *    render : function(){
		 *       var baserender = baseview.prototype.renderBefore.apply(me, arguments);
		 *       if (!baserender){
		 *           return false;
		 *       }
		 *    }
		 *    ...
		 *  });
		 *                                           }
		 */
		renderBefore : function(){
			var me = this;
			//initialization container
			if (!me.container) {
				return;
			}
			me.$container = $(me.container);
			if (me.$container.is(":hidden")){
				return false;
			}
			if (me._silence === true){
				return false;
			}
			return true;
		},
		/**
		 * All inherit render function should send the unity of event after rendered chart.
		 * Here is a example:
		 * @example
		 *  baseview.extend({
		 *    ...
		 *    render : function(){
		 *    	//implement rendered
		 *    	return baseview.prototype.renderAfter.apply(this, [this, this.el, chart object, renderOptions]);
		 *		...
		 *    }
		 *    ...
		 *  });
		 */   
		renderAfter : function(){
			this.trigger.apply(this, ["view.rendered"].concat(arguments));
			$(this.container).trigger("backchart.rendered",arguments);
			return this;
		},
		elFillParents : function(){
			this.$el.css({
				width: "100%",
				height:"100%"
			});
		}
	});
	return chartBaseView;
}));

(function(root, name, factory) {
	"use strict";
	if (typeof define === 'function' && define.amd) {
		define(['jquery','../backchart.base/model'], function($, base) {
			return factory($, base);
		});
	}else if(typeof module !== 'undefined' && module.exports){
		var $ = require("jquery"),
		base = require("../backchart.base/model");
		module.exports = factory($, base);
	}else{
		var namespaces = name.split("."),
		scope = root || this;
		for (var i=0; i<namespaces.length; i++) {
			var p = namespaces[i],
				ex = scope[p];
			scope = scope[p] = (i === namespaces.length - 1) ?
				factory(
					(root.jQuery || window.jQuery),
					 root.backchart.base.model
				):
				(ex || {});
		}
	}
}(this, "backchart.canvasjs.model", function($, basemodel) {
	/**
	* Backbone chart CanvasJS model
	* @module canvasjs/model
	* @requires jquery
	* @requires base/model  
	* @this {Backbone.Model}
	*/ 
	var backchartCanvasJSModel = basemodel.extend(
		/** @lends module:canvasjs/model.prototype */
		{
		_setAlias: function(obj, key, alias){
			if (typeof obj[key] !== "undefined"){
				obj[alias] = obj[key];
			}
		},
		constructor: function(attributes, options){
			options = options || {};
			options.parse = this.parse;
			return basemodel.prototype.constructor.apply(this, [attributes, options]);
		},
        /**
         * The default parse function
		 *
		 * Here is some fast assignment method existed ,you can set the "x" field via declaration attribute called xField
		 * The follow example list all fast assignment attributes.
         * @example
		 * xFiled : x
		 * yField : y
		 * labelField : label
         * @param {Object} response
         * @return {Object}
         */
		parse: function(response){
			if (this.xField){
				this._setAlias(response, this.xField, 'x');
				if (this.timestamp){
					response['x'] = response['x'] * 1000;
				}
			}
			if (this.yField){
				this._setAlias(response, this.yField, 'y');
			}
			if (this.labelField){
				if (typeof this.labelField === "string"){
					this._setAlias(response, this.labelField, 'label');
				}else if (typeof this.labelField === "function"){
					this.labelField.call(response);
				}
			}
			return response;
		}
	});
	return backchartCanvasJSModel;
}));


(function(root, name, factory) {
	"use strict";
	if (typeof define === 'function' && define.amd) {
		define(['jquery','../backchart.base/collection'], function($, base) {
			return factory($, base);
		});
	}else if(typeof module !== 'undefined' && module.exports){
		var $ = require("jquery"),
		base = require("../backchart.base/collection");
		module.exports = factory($, base);
	}else{
		var namespaces = name.split("."),
		//scope = (root.jQuery || root.ender || root.$ || root || this),
		scope = root || this;
		for (var i=0; i<namespaces.length; i++) {
			var p = namespaces[i],
				ex = scope[p];
			scope = scope[p] = (i === namespaces.length - 1) ?
				factory(
					(root.jQuery || window.jQuery),
					root.backchart.base.collection
				):
				(ex || {});
		}
	}
}(this, "backchart.canvasjs.collection", function($, basecollection) {
	/**
	 * Backbone chart CanvasJS collection 
	 * @module canvasjs/collection
	 * @requires jquery
	 * @requires base/backbone
	 * @this {Backbone.Collection}
	 */
	var exports = basecollection.extend(
		/** 
		* @lends module:canvasjs/collection.prototype 
		*/
		{});
	return exports;
}));

(function(root, name, factory) {
	"use strict";
	if (typeof define === 'function' && define.amd) {
		define(['jquery','../backchart.base/view','backbone',"underscore","CanvasJS"], function($, base, Backbone, _, canvasjs) {
			canvasjs = canvasjs || window.CanvasJS;
			return factory($, Backbone, _, base, canvasjs);
		});
	}else if(typeof module !== 'undefined' && module.exports){
		var $ = require("jquery"),
		base = require("../backchart.base/view"),
		Backbone = require("backbone"),
		_ = require("underscore"),
		canvasjs = require("CanvasJS") || window.CanvasJS;
		module.exports = factory($, Backbone, _, base, canvasjs);
	}else{
		var namespaces = name.split("."),
			//scope = (root.jQuery || root.ender || root.$ || root || this),
			scope = root || this;
		for (var i=0; i<namespaces.length; i++) {
			var p = namespaces[i],
				ex = scope[p];
			scope = scope[p] = (i === namespaces.length - 1) ?
				factory(
					(root.jQuery || window.jQuery),
					(root.Backbone|| window.Backbone),
					(root._ || window._),
					root.backchart.base.view,
					(root.CanvasJS || window.CanvasJS)
				):
				(ex || {}); 
		}
	}
}(this, "backchart.canvasjs.view", function($, Backbone, _, baseview, CanvasJS) {
	/**
	 * Backbone chart CanvasJS view
	 * @module canvasjs/view
	 * @requires jquery
	 * @requires base/view
	 * @requires backbone
	 * @requires CanvasJS 
     * @this {Backbone.View}
     */
	var backchartCanvasJSView = baseview.extend(
		/** 
		* @lends module:canvasjs/view.prototype 
		*/
		{
		/**
		 * The default render options
		 * @static
		 */
		defaultRenderOptions :{
			type: "column"
		},
		/**
		 * initialize
         * @return {Backbone.View}
		 */
		initialize: function(defaultOptions, defaultRenderOptions) {
			baseview.prototype.initialize.apply(this, arguments);
			this.defaultOptions = $.extend(true, {}, this.defaultOptions, defaultOptions);
			this.defaultRenderOptions = $.extend(true, {}, this.defaultRenderOptions, defaultRenderOptions);
		},
		/**
		 * Transform the renderOptions to the options of CanvasJS
         *
		 * @param {(backchart.base.collection|Backbone.Collection)} collection
         * @param {Object} renderOptions
         * @return {Object} the options that can be accepted by CanvasJS library
         */
		transformData: function(collection, renderOptions){
			var me = this,
			dataPoints = [],
			ro = $.extend(true, {}, me.defaultRenderOptions, renderOptions);
			collection.each(function(model) {
				if (collection.isVisibled(model)){
					var dataPoint = _.clone(model.attributes);
					dataPoints.push(dataPoint);
				}
			});
			ro.dataPoints = dataPoints;
			return ro;
		},
        /**
         * The render function
         *
         * @return {Object} this instance
         */
		render: function(){
			var me = this;
			var rret = baseview.prototype.renderBefore.apply(me, arguments);
			if (!rret){
				return false;
			}
			//initialization el id 
			if (!me.el.id){
				me.el.id = _.uniqueId("backchartel");
			}
			var renderOptions = _.clone(me.defaultOptions);
			renderOptions.data = [];
			me.eachCollection(function(uid, collection, renderOption, options){
				if (collection._silence || options.visible === false){
					return;
				}
				renderOptions.data.push(me.transformData(collection, renderOption));
			});

			me.$container.empty().append(me.$el.empty());
			me.elFillParents();
			me.Chart = new CanvasJS.Chart(me.el.id, renderOptions);
			me.Chart.render();

			return baseview.prototype.renderAfter.apply(me, [me, me.el, me.Chart, renderOptions]);
		}
	});
	return backchartCanvasJSView;
}));