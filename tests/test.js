(function (test, ok, equal) {
	var Animal= $.factory(null, function () {
		this.alive = true;
		}, {
		sleep: function () {
			if (this.alive) return 'zzz'
		}
	});

	var Mamel= $.factory(Animal, function (name) {
		this.name = name || 'mamel';
		}, {
		breastFeed: function () {
			if (this.alive) return 'suckle'
		}
	});

	var Dog = $.factory(Mamel, function () {
		this.smells = 'badly';
		}, {
		bark: function () {
			if (this.alive) return 'woof'
		}
	});

	var a = new Animal();
	var m = new Mamel('cow');
	var d = new Dog('lucy');

	test('$.factory Class Animal - no inheritance', function () {
		ok(a instanceof Animal, 'instance of Animal');
		ok(a.alive, 'animal alive');
		ok(a.sleep(), 'animal sleep');
	});

	test('$.factory Class Mamel - inherits form Animal', function () {
		ok(m instanceof Animal, 'instance of Animal');
		ok(m instanceof Mamel, 'instance of Mamel');
		ok(m.alive, 'alive');
		equal(m.sleep(), 'zzz', 'expect speep to be zzz');
		equal(m.breastFeed(), 'suckle', 'expect speep to be suckle');
		equal(m.name, 'cow', 'expect name to be cow');
	});

	test('$.factory Class Dog - inherits form Mamel', function () {
		ok(d instanceof Animal, 'instance of Animal');
		ok(d instanceof Mamel, 'instance of Mamel');
		ok(d instanceof Dog, 'instance of Dog');
		ok(d.alive, 'alive');
		equal(m.sleep(), 'zzz', 'expect speep to be zzz');
		equal(m.breastFeed(), 'suckle', 'expect speep to be suckle');
		equal(d.name, 'lucy', 'expect name to be lucy');
		equal(d.smells, 'badly', 'expect smell to be badly');
	});


	test('$.factory prototype equality', function () {
		equal(d.sleep, Animal.prototype.sleep, 'expect method sleep of Dog instance to be Animal.prototype.sleep');
		equal(d.breastFeed, Mamel.prototype.breastFeed, 'expect method breastFeed of Dog instance to be Mamel.prototype.breastFeed');
	});
}(this.test, this.ok, this.equal));
