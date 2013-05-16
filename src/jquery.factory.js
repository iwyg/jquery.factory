/**
 * A Klass Constructor Factory
 *
 * jquery.factory.js 1.0.2
 *
 * © 2011 Thomas Appel <http://thomas-appel.com>
 *
 * jquery.factory.js is dual licensed under the
 * MIT <http://dev.thomas-appel.com/licenses/mit.txt> and
 * GPL <http://dev.thomas-appel.com/licenses/gpl.txt> license.
 *
 */

(function (global, undefined) {
    'use strict';
    var jQuery, $,
    extend, exports,
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
    jQuery = $ = (typeof require !== 'undefined' || (global.define && global.define.amd)) ? require('jQuery') : global.jQuery;

    // ### The Klass Constructor
    // - namespace: jQuery
    // - name factory
    //
    var Factory = (function () {
        var O = Object.prototype,
        _hasProp = O.hasOwnProperty;

        function init(constr, __super__) {
            return function () {
                __super__.apply(this, arguments);
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
    //      - parent: the parent Constructur which should be extended. Note,
    //      that it has to be a constructur function build with jquery.factory
    //      - constructor: (type: Function) the actual constructor function. Put your
    //      initializing code here
    //      - methods: (type: Object or String) an Object which becomes the constructor prototype
    //      - obj: (type: Object) Additional, for creating Mixins. The Object you want to lend methods and
    //      properties form. Note: if you set the 'obj' param, pass param 'methods' as string representing the method/property names of the 'obj' object separated by a single space
    //

        return function (parent, constructor, methods, obj) {
            var prototype = objectCreate(parent && parent.prototype || O),
            __super__;

            methods = (typeof parent === 'function' && typeof constructor === 'object') ? constructor : methods;
            methods = typeof methods !== 'string' ? methods : mixin(methods, obj);
            constructor = typeof constructor === 'object' ? function () {} : constructor;

            $.extend(prototype, methods);

            prototype.constructor = init(constructor, __super__ = parent ? parent.prototype.constructor : prototype.constructor);
            prototype.__super__ = __super__;
            constructor = prototype.constructor;
            constructor.prototype = prototype;
            constructor.extend = extend;
            return constructor;
        };
    }());

    extend = function (constructor, prototype, mixin) {

        if (typeof constructor !== 'function') {
            mixin = prototype;
            prototype = constructor;
            constructor = this;
        }

        return Factory(this.prototype.constructor || null, constructor, prototype, mixin);
    };

    Factory.create = objectCreate;
    exports = {
        Factory: Factory,
    };
    if (typeof global.define === 'function') {
        global.define('jquery.factory', ['jquery'], function ($) {
            $.Factory = $.extend($, exports);
        });
    } else if (typeof module !== undefined) {
        module.exports = exports;
    } else {
        $.Factory = $.extend($, exports);
    }
}(this));
