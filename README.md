# TypedJS

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](http://azenox.fr/)

Typed.js - Typewriting Javascript Library

## Getting Started

Demo: [https://azenox.fr/demo/typed.html](https://azenox.fr/demo/typed.html) 

### Install

You can get it from my server (not 100% uptime so careful)  

[http://azenox.fr/lib/Typed.js](http://azenox.fr/lib/Typed.js)  
[http://azenox.fr/lib/Typed.min.js](http://azenox.fr/lib/Typed.min.js)

Or just download the file and import it  
```html
<script src="path/to/Typed.js"></script>
```

### Usage

Here is a basic usage:
```javascript
  let element = document.querySelector('#element');

  new Typed(element)
      .type("Hello World !")
      .run();
```

#### Options


<table class="table table-bordered table-striped">
	<thead>
		<tr>
			<th style="width: 100px;">Name</th>
			<th style="width: 100px;">Default Value</th>
			<th>description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>blink</td>
			<td>true</td>
			<td>Should the script have to add a blinker</td>
		</tr>
		<tr>
			<td>blinkClasses</td>
			<td>[]</td>
			<td>You can give specific classes to the blinker</td>
		</tr>
		<tr>
			<td>blinkSpeed</td>
			<td>600</td>
			<td>Speed (in milliseconds) of the blinker</td>
		</tr>
		<tr>
			<td>printErrors</td>
			<td>false</td>
			<td>Print Errors in console or not</td>
		</tr>
	</tbody>
</table>


#### Methods

<table class="table table-bordered table-striped">
	<thead>
		<tr>
			<th style="width: 100px;">Name</th>
			<th style="width: 100px;">Parameters</th>
			<th style="width: 100px;">Default Value</th>
			<th>description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>.type()</td>
			<td>str</td>
			<td>*none*</td>
			<td>The string to write</td>
		</tr>
		<tr>
			<td></td>
			<td>style</td>
			<td>Empty Object</td>
			<td>The style of the passed str. It must be an object. The keys have to be Javascript style properties (Ex: {fontWeight: "bold", color: "#f44336"})</td>
		</tr>
		<tr>
			<td></td>
			<td>delay</td>
			<td>100</td>
			<td>Delay (in milliseconds) between each character</td>
		</tr>
		<tr>
			<td>.pause()</td>
			<td>delay</td>
			<td>*none*</td>
			<td>You can add a delay (in milliseconds) to wait between animations</td>
		</tr>
		<tr>
			<td>.delete()</td>
			<td>length</td>
			<td>*none*</td>
			<td>Number of chars you want to remove</td>
		</tr>
		<tr>
			<td></td>
			<td>delay</td>
			<td>100</td>
			<td>Delay (in milliseconds) between each character</td>
		</tr>
		<tr>
			<td>.run()</td>
			<td>callback</td>
			<td>*none*</td>
			<td>You can pass a callback function</td>
		</tr>
	</tbody>
</table>

  
Here is an advanced usage you can do with all methods:
```javascript
    new Typed(element, {
        blink: true,
        printErrors: false,
        blinkClasses: ["blinker"],
        blinkSpeed: 600
    })
	.type("Hello World !", {color:"#3f51b5"})
	.pause(2000)
	.delete(12)
	.pause(1000)
	.type("How are ", {color: "#ff9800"})
	.type("you", {color: "#F44336"})
	.type("?", {color: "#ff9800"})
	.run();
```

By the way, as you seen, you can chain all methods.


## Versions
**Dernière version :** 1.0

## License

You can use this project as you want. Copy it, modify it, redistribute it...

