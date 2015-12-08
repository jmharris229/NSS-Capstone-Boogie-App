app.controller('concertCtrl',
	['$firebaseObject',
	'fireAuth',
	'$routeParams',
	'$location',
	function($firebaseObject,fireAuth,$routeParams,$location){

		//creates reference to particular concert
		this.Id= $routeParams.id;
		console.log(this.Id);
		var ref = new Firebase("https://boogie.firebaseio.com/concerts/"+this.Id);
			
		//concert object
		this.concert = $firebaseObject(ref);
		console.log(this.concerts);

		//gets initial steps before concert
		this.startCount = function(){
			var initialSteps = (Math.floor(Math.random()*50)+1)*100;
		}

		//gets steps after concert
		this.stopCount = function(){
			var postSteps = (Math.floor(Math.random()*50)+51)*100;
		}

	}
])