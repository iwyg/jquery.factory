#Minimal, light weight KlassFactory on top of jQuery

[![Build Status](https://secure.travis-ci.org/iwyg/jquery.factory.png?branch=master)](https://travis-ci.org/iwyg/jquery.factory)
 

### Example usage

#### Creating a constructor

```js
	var Engine = $.Factory(function (ps) {
		this.ps = ps;
	}, {
		getPower: function () {
			return this.ps
		}
	});

```

#### inheritance

```js
	var VEight = $.Factory(Engine, function (ps) {
		this.turbo = ps++;
	}, {
		getTurbo: function () {
			return this.turbo
		}
	});
	
	// or in a more convinent way
	
	var VEight = Engine.extend(function (ps) {
		this.turbo = ps++;
	}, {
		getTurbo: function () {
			return this.turbo
		}
	});

```

#### mixins

```js
	var mixin = {
		foo: function () {
			return 'foo';
		},
		bar: function () {…}
	};
	
	var VEight = Engine.extend('foo', mixin);
	var machine = new VEight(20);	
	
	console.log(machine.foo())                     // "foo"
	console.log(typeof machine.bar === 'function') // false

```