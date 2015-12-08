app.controller('concertCtrl',
	['$firebaseObject',
	'fireAuth',
	'$routeParams',
	'$location',
	function($firebaseObject,fireAuth,$routeParams,$location){

		this.selectedSong = {};

		this.Id= $routeParams.id;
		console.log(this.Id);
		var ref = new Firebase("https://boogie.firebaseio.com/concerts/"+this.Id);
			
		this.concert = $firebaseObject(ref);
		console.log(this.concerts);

	}
])