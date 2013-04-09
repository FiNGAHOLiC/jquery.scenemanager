# jquery.scenemanager.js

jquery.scenemanager.js is a simple scene manager plugin.

## Demo

http://fingaholic.github.com/jquery.scenemanager/

## Usage

### Options

* **proximity** `Integer` How close to the scrollbar is to the bottom of the element (default value is 1)
* **waypoint** `Integer` or `String` How far from the top of the window \[pixels or percentage of the viewport's height\] (default value is '50%')
* **suffix** `String` Plugin suffix (default value is '.scenemanager')

### Create scenes instance

```javascript
var scenes = $.scenemanager();
```

### Add scene

```javascript
scenes.add({

	// scene selector
	sceneSelector: '#scene1',

	// register elements using in the scene
	sceneObject: {
		$title: '.title',
		$anim1: '.anim1',
		$anim2: '.anim2',
		$anim3: '.anim3',
		$anim4: '.anim4',
		$anim5: '.anim5'
	},

	// scene animation
	sceneFn: function($scene, elems, $queue){
		// $scene: jQuery object with scene
		// elems: object with registered elements above
		// $queue: queue
		var anim0 = function(){ elems.$title.fadeOut(500, anim1); };
		var anim1 = function(){ elems.$anim1.fadeIn(500, anim2); };
		var anim2 = function(){ elems.$anim2.fadeIn(500, anim3); };
		var anim3 = function(){ elems.$anim3.fadeIn(500, anim4); };
		var anim4 = function(){ elems.$anim4.fadeIn(500, anim5); };
		var anim5 = function(){
			elems.$anim5.fadeIn(500, function(){
				// Go to next scene
				$queue.dequeue();
			});
		};
		anim0();
	}

});
```
Doesn't need queueing animations, execute `$queue.dequeue();` first;

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
