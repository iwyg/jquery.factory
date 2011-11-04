(function ($, undefined) {


	/**
     * @namespace
	 * @name jQuery
	 */
	var jQuery = $,
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

	/**
	 * A Klass Constructor Factory
	 * @name factory
	 * @param {Function} parent parent constructor
	 * @param {Function} constructor klass constructor
	 * @param {Object} methods klass prototype
	 * @return {Function} constructor function
	 * @function
	 * @memberof jQuery
	 *
	 * @example
	 *
	 *  var Animal = $.factory(null, function () {
	 *      this.alive = true;
	 *  }, {
	 *      sleep: function () {
	 *	        if (this.alive) return 'zzz';
	 *	 }
	 *  });
	 *
	 *
	 *  var Mamel = $.factory(Animal, function (name) {
	 *	    this.name = name || 'mamel';
	 *  }, {
	 *      breastFeeds: function () {
	 *	        if (this.alive) return 'suckle';
	 *		}
	 *  });
	 *
	 *  var Dog = $.factory(Mamel, function () {
	 *		this.smells = 'badly';
	 *  }, {
	 *      bark: function () {
	 *	        if (this.alive) return 'woof';
	 *	    }
	 *  });
	 *
	 *
	 * var microbe = new Animal();
	 * microbe.alive // true
	 * microbe.sleep(); // zzz
	 *
	 * var higherAnimal = new Mamel('cow');
	 * higherAnimal.name // cow
	 * higherAnimal.alive; // true
	 * higherAnimal.sleep(); // zzz
	 * higherAnimal.breastFeeds(); // suckle
	 *
	 * var lucy = new Dog('lucy');
	 * lucy.name // lucy
	 * lucy.alive; // true
	 * lucy.smells; // badly
	 * lucy.sleep(); // zzz
	 * lucy.breastFeeds(); // suckle
	 * lucy.bark(); // woof
	 *
	 */

	jQuery.factory = (function () {
		var O = Object.prototype,
		_hasProp = O.hasOwnProperty;
		/*
		function curry(parent) {
			return function () {
				parent.apply(this, arguments);
			};
		}
		*/
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
}(this.jQuery));

