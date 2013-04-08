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
var scenes = $.scenemanager({
	proximity: 1,
	waypoint: '50%',
	suffix: '.scenemanager'
});
```

### Add scene

```javascript
scenes.add({

	// scene selector
	sceneSelector: '#scene1',

	// register elements using in the scene
	sceneObject: {
		$heading: '.heading',
		$paragraph1: '.paragraph1',
		$paragraph2: '.paragraph2'
	},

	// scene animation
	sceneFn: function($scene, elems, $queue){
		// $scene: jQuery object with scene
		// elems: object with registered elements above
		// $queue: queue
		elems.$heading.fadeIn(500, function(){
			elems.$paragraph1.fadeIn(500, function(){
				elems.$paragraph2.fadeIn(500, function(){
					// Go to next scene
					$queue.dequeue();
				});
			});
		});
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
