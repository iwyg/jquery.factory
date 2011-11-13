//## A Klass Constructor Factory
// jquery.factory.js 1.0.2
// © 2011 Thomas Appel, (http://thomas-appel.com)
// jquery.factory.js is dual licensed under the
// [MIT](http://dev.thomas-appel.com/licenses/mit.txt) and
// [GPL](http://dev.thomas-appel.com/licenses/gpl.txt) license.

(function (root, undefined) {

	var jQuery, $,

	// creates an empty object. See [factory.createObject](#section-6)
	objectCreate = (function () {
		if (typeof Object.create === 'undefined') {

			return (function () {
				function F() {}
				return function (obj) {
					F.prototype = obj;
					return new F();
				};
			} ());
		} else {
			return Object.create;
		}
	}());

	// Make sure this plays nicely if jquery is loaded via AMD
	jQuery = $ = (typeof require === 'function' && (require('jquery').$ || require('jquery'))) || root.jQuery;

	// ### The Klass Constructor
	// - namespace: jQuery
	// - name factory
	//
	jQuery.factory = (function () {
		var O = Object.prototype,
		_hasProp = O.hasOwnProperty;

		function init(constr, __super) {
			return function () {
				__super.apply(this, arguments);
				constr.apply(this, arguments);
			};
		}

		function mixin(strg, obj) {
			var i = 0, l, method,
			newObj = {};
			strg = strg.split(' ');
			l = strg.length;

			for (; i < l; i++) {
				method = strg[i];
				if (_hasProp.call(obj, method)) {
					newObj[method] = obj[method];
				}
			}
			return newObj;
		}

	// - prameters:
	//		- parent: the parent Contructur which should be extended. Note,
	//		that it has to be a contructur function build with jquery.factory
	//		- constructor: (type: Function) the actual constructor function. Put your
	//		initializing code here
	//		- methods: (type: Object or String) an Object which becomes the contructor prototype
	//		- obj: (type: Object) Additional, for creating Mixins. The Object you want to lend methods and
	//		properties form. Note: if you set the 'obj' param, pass param 'methods' as string representing the method/property names of the 'obj' object separated by a single space
	//

		return function (parent, constructor, methods, obj) {
			var prototype = objectCreate(parent && parent.prototype || O),
			__super;
			methods = typeof methods !== 'string' ? methods : mixin(methods, obj);
			$.extend(prototype, methods);
			prototype.constructor = init(constructor, __super = parent ? parent.prototype.constructor : prototype.constructor);
			prototype.__super = __super;
			constructor = prototype.constructor;
			constructor.prototype = prototype;
			return constructor;
		};
	}());

	// ### factory.createObject
	// static method
	//
	// creates an Empty Object
	//
	// - parameters:
	//		- obj: (type: Object). obj will be added to the Object’s prototype chain
	//
	jQuery.factory.createObject = objectCreate;

	// -----------------------------------------------------------------------------
	//
	// ### basic example usage:
	//
	//
	//     var Animal = $.factory(null, function () {
	//         this.alive = true;
	//     }, {
	//         sleep: function () {
	//	           if (this.alive) return 'zzz';
	//	    }
	//     });
	//
	//
	//     var Mamel = $.factory(Animal, function (name) {
	//	       this.name = name || 'mamel';
	//     }, {
	//         breastFeeds: function () {
	//	           if (this.alive) return 'suckle';
	//	       }
	//     });
	//
	//     var Dog = $.factory(Mamel, function () {
	//	       this.smells = 'badly';
	//     }, {
	//         bark: function () {
	//	           if (this.alive) return 'woof';
	//	       }
	//     });
	//
	//
	//     var microbe = new Animal();
	//     microbe.alive // true
	//     microbe.sleep(); // zzz
	//
	//     var higherAnimal = new Mamel('cow');
	//     higherAnimal.name // cow
	//     higherAnimal.alive; // true
	//     higherAnimal.sleep(); // zzz
	//     higherAnimal.breastFeeds(); // suckle
	//
	//     var lucy = new Dog('lucy');
	//     lucy.name // lucy
	//     lucy.alive; // true
	//     lucy.smells; // badly
	//     lucy.sleep(); // zzz
	//     lucy.breastFeeds(); // suckle
	//     lucy.bark(); // woof
	//
	//
	// ### Create Mixins, part 1
	//
	//		var myMethods= {
	//			call: function (name) {
	//				alert(name);
	//			},
	//			die: function () {
	//				return false;
	//			}
	//		},
	//		myOtherMethofs = {
	//			setName: function (name) {
	//				this.name = name;
	//			}
	//		};
	//
	//	    $.factory(null, function() {}, {
	//			call: myMethods.call,
	//			die: myMethods.die,
	//			setName: myOtherMethofs.setName
	//      });
	//
	// ### Create Mixins, part II: just pass property/method names and their corresponding Object
	//
	//		$.factory(null, contructor, 'call die', myMethods);
	//
}(this));

