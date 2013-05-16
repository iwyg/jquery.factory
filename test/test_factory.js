(function (undefined) {

    var assert = require("assert");
    var Factory = require("../src/jquery.factory").Factory;
    var Animal = Factory(function () {
        this.alive = true;
        }, {
        sleep: function () {
            if (this.alive) return 'zzz'
        },
        speak: function () {
            return 'blurp';
        }
    });

    var Mamel = Factory(Animal, function (name) {
        this.name = name || 'mamel';
        }, {
        breastFeed: function () {
            if (this.alive) return 'suckle'
        }
    });


    var Dog = Factory(Mamel, function () {
        this.smells = 'badly';
        }, {
        bark: function () {
            if (this.alive) return 'woof'
        }
    });

    var Foo = Dog.extend({bar: function () {
        return 'baz';
    }});
    var Bar = Foo.extend({baz: function () {
        return 'boom';
    }});

    var foo = new Foo;
    var bar = new Bar;

    var animal = new Animal();
    var cow = new Mamel('cow');
    var dog = new Dog('lucy');

    describe("Factory", function () {

        describe("Make constructor", function () {
            var Foo = Factory(null, function () {
            });

            it('should be a constructor', function () {
                assert.ok(typeof Foo.prototype === 'object');
            });

        });

        describe("Make prototype", function () {
            var Foo = Factory(function () {}, {
                foo: function () {
                    return 'foo';
                }
            });
            var Fam = Factory(Foo, function () {
                this.bar = 'bar';
            }, {
                getBar: function () {
                    return this.bar;
                }
            }
            );
            it('should inherit methods', function () {
                assert.ok(typeof Foo.prototype.foo === 'function');
            });

            it('should allow mutlible inheritance', function () {
                var fam = new Fam;
                assert.ok(fam instanceof Foo);
            });

            it('and should set methods', function () {
                var fam = new Fam;
                assert.equal('bar', fam.getBar());
            });

            it('and should inherit methods', function () {
                var fam = new Fam;
                assert.equal('foo', fam.foo());
            });
        });

        describe("#extend", function () {
            it('should; extend the given methods', function () {
                var Cow = Animal.extend({
                    speak: function () {
                        return 'moo';
                    }
                });
                assert.equal('moo', new Cow().speak());
            });
            it('should take another constructor', function (done) {
                var Cow = Animal.extend(function () {
                    this._done = true;
                }, {
                    success: function (done) {
                        if (!this.alive) {
                            throw 'failed to inherit parent constructor';
                        }
                        return this._done && done();
                    }
                });
                new Cow().success(done);
            });
            it('should allow object mixins', function () {
                var Cow = Animal.extend('foo', {
                        foo: function () {},
                        bar: function () {}
                });
                var cow = new Cow();
                assert.ok(typeof cow.foo === 'function' && typeof cow.bar !== 'function');
            });
        });

        describe("#create", function () {
            it('should create a object with inherited properties and methods', function () {
                var object = Factory.create({foo: function () {}});
                assert.ok(typeof object.foo === 'function');
            });
            it('should put members on the prototype', function () {
                var object = Factory.create({foo: function () {}});
                assert.ok(typeof object.__proto__.foo === 'function');
            });
        });
    });

}());
