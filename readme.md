# A Klass Factory 

### Example usage
also see docs/jQuery.html

	var Animal = $.factory(null, function () {
		  this.alive = true;
	 }, {
		 sleep: function () {
		   if (this.alive) return 'zzz';
	   }
	 });


	 var Mamel = $.factory(Animal, function (name) {
		  this.name = name || 'mamel';
	 }, {
		 breastFeeds: function () {
		   if (this.alive) return 'suckle';
	   }
	 });

	 var Dog = $.factory(Mamel, function () {
	   this.smells = 'badly';
	 }, {
		 bark: function () {
		   if (this.alive) return 'woof';
		  }
	 });


	var microbe = new Animal();
	microbe.alive // true
	microbe.sleep(); // zzz

	var higherAnimal = new Mamel('cow');
	higherAnimal.name // cow
	higherAnimal.alive; // true
	higherAnimal.sleep(); // zzz
	higherAnimal.breastFeeds(); // suckle

	var lucy = new Dog('lucy');
	lucy.name // lucy
	lucy.alive; // true
	lucy.smells; // badly
	lucy.sleep(); // zzz
	lucy.breastFeeds(); // suckle
	lucy.bark(); // woof

