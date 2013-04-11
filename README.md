# jquery.scenemanager.js

jquery.scenemanager.js is a simple scene manager plugin.

This plugin makes easy to execute function when the top of element reaches the waypoint (default waypoint is the middle of viewport).

## Demo

http://fingaholic.github.com/jquery.scenemanager/

## Usage

### Options

* **proximity** `Integer` How close to the scrollbar is to the bottom of the element (default value is 1)
* **waypoint** `Integer` or `String` How far from the top of the window \[pixels or percentage of the viewport's height\] (default value is '50%')
* **suffix** `String` Plugin suffix (default value is '.scenemanager')

### Queueing function

Although there is a possibility that each function would start at the same time when you scroll rapidly, this plugin ensures that **each function runs in sequence** by using jQuery queue() and dequeue().

### Create scenes instance

```javascript
var scenes = $.scenemanager();
```

### Add scene

```javascript
scenes.add({

	// scene selector
	sceneSelector: '#scene1',

	// register elements
	sceneObject: {
		$title: '.title', // equal to $('#scene1').find('.title')
		$anim1: '.anim1', // equal to $('#scene1').find('.anim1')
		$anim2: '.anim2', // equal to $('#scene1').find('.anim2')
		$anim3: '.anim3', // equal to $('#scene1').find('.anim3')
		$anim4: '.anim4', // equal to $('#scene1').find('.anim4')
		$anim5: '.anim5'  // equal to $('#scene1').find('.anim5')
	},

	// scene function
	sceneFn: function($scene, elems, $queue){
		// $scene: jQuery object
		// elems: object that you registered above
		// $queue: queue of functions
		var anim0 = function(){ elems.$title.fadeOut(500, anim1); };
		var anim1 = function(){ elems.$anim1.fadeIn(500, anim2); };
		var anim2 = function(){ elems.$anim2.fadeIn(500, anim3); };
		var anim3 = function(){ elems.$anim3.fadeIn(500, anim4); };
		var anim4 = function(){ elems.$anim4.fadeIn(500, anim5); };
		var anim5 = function(){
			elems.$anim5.fadeIn(500, function(){
				// dequeue the next function
				$queue.dequeue();
			});
		};
		anim0();
	}

});
```

### 3. Fire

```javascript
scenes.fire();
```

## Requirements

jQuery 1.7.x or later.

## Browsers

IE6+ and other new browsers.

## License

Licensed under the MIT license.

## Thanks

djot
