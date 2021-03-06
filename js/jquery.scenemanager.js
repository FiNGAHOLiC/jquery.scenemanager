/*!
 * jquery.scenemanager.js
 *
 * @modified  2013/04/11
 * @requires  jQuery 1.7.x or later
 * @version   1.0.8
 * @author    FiNGAHOLiC
 * @link      https://github.com/FiNGAHOLiC/jquery.scenemanager
 * @license   The MIT License
 *
 */

;(function($, window, document, undefined){

	var $window = $(window);
	var $document = $(document);

	// returns a randon v4 UUID
	// https://gist.github.com/jed/982883
	var b = function(a){ return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b) };

	var SceneManager = function(){
		this.uuid = b();
		this.scenes = [];
		this.$queue = $({});
		this.endPosY = 0;
		this.triggerPosY = 0;
		this.options = $.extend({}, this.options);
		this.initialize.apply(this, arguments);
	};

	(function(_){
		_.options = {
			proximity: 1,
			waypoint: '50%',
			suffix: '.scenemanager'
		};
		_.initialize = function(options){
			this.setOptions(options);
			this.setProperties();
			return this;
		};
		_.setOptions = function(options){
			$.extend(this.options, options);
			return this;
		};
		_.setProperties = function(){
			this.setEndPos();
			this.setTriggerPos();
			return this;
		};
		_.setEndPos = function(){
			var windowHeight = $window.height();
			this.endPosY = $document.height() - windowHeight;
			return this;
		};
		_.setTriggerPos = function(){
			var windowHeight = $window.height();
			var start = this.options.waypoint;
			var type = $.type(start);
			this.triggerPosY = (type === 'number')
				? start
				: (type === 'string')
					? windowHeight * (parseInt(start) / 100)
					: 0;
			return this;
		};
		_.bindEvents = function(){
			var suffix = this.options.suffix + this.uuid;
			$window
				.on('resize' + suffix, $.proxy(function(){
					this.resetScenePosY();
					this.setEndPos();
					this.setTriggerPos();
					this.checkQueue();
				}, this))
				.on('scroll' + suffix, $.proxy(function(){
					this.checkQueue();
				}, this));
			return this;
		};
		_.unbindEvents = function(){
			var suffix = this.options.suffix + this.uuid;
			$window
				.off('resize' + suffix)
				.off('scroll' + suffix);
			return this;
		};
		_.resetScenePosY = function(){
			for(var i = 0, l = this.scenes.length; i < l; i++){
				this.scenes[i]['posY'] = this.returnScrollTop(
					this.scenes[i]['$scene']
				);
			};
			return this;
		};
		_.checkQueue = function(){
			for(var i = 0, l = this.scenes.length; i < l; i++){
				var scene = this.scenes[i];
				if(!scene['complete']){
					if(this.returnCurrentPosY(scene['posY'])){
						this.addQueue(
							scene['$scene'],
							scene['elems'],
							scene['method']
						);
						scene['complete'] = true;
					};
				};
			};
			this.checkQueueLength();
			return this;
		};
		_.returnCurrentPosY = function(posY){
			var scrollTop = $window.scrollTop();
			return (posY - this.triggerPosY) < scrollTop || (scrollTop / this.endPosY) >= this.options.proximity;
		};
		_.addQueue = function($scene, elems, method){
			this.$queue.queue($.proxy(function(){
				method($scene, elems, this.$queue);
			}, this));
			return this;
		};
		_.checkQueueLength = function(){
			var complete = 0;
			for(var i = 0, l = this.scenes.length; i < l; i++){
				if(this.scenes[i]['complete']) complete++;
			};
			if(complete === this.scenes.length) this.unbindEvents();
			return this;
		};
		_.returnScrollTop = function($scene){
			return $scene.length ? $scene.offset().top : 0;
		};
		_.returnSceneElement = function($scene, obj){
			var elems = {};
			for(var prop in obj) elems[prop] = $scene.find(obj[prop]);
			return elems;
		};
		_.add = function(setting){
			var s = setting;
			var $scene = $(s.sceneSelector);
			var elems = this.returnSceneElement($scene, s.sceneObject);
			var posY = this.returnScrollTop($scene);
			this.scenes.push({
				$scene: $scene,
				elems: elems,
				method: s.sceneFn,
				posY: posY,
				complete: false
			});
			this.sortScenes();
			return this;
		};
		_.sortScenes = function(){
			this.scenes.sort(function(a, b){
				return parseInt(a.posY, 10) - parseInt(b.posY, 10);
			});
			return this;
		};
		_.fire = function(){
			this.bindEvents();
			this.checkQueue();
			return this;
		};
	}(SceneManager.prototype));

	$.scenemanager = function(options){
		return new SceneManager(options);
	};

})(jQuery, window, this.document);


