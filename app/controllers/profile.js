app.controller('profileCtrl', 
	['$firebaseArray',
	'$firebaseObject',
	'fireAuth',
	'$routeParams',
	'$location',
	function($firebaseArray, object, fireAuth, $routeParams, $location){

		//get personal info
		// var you = fireAuth.getAuth();
		var id = $routeParams.id;
		//reference to user info
		var userInfo = new Firebase("https://boogie.firebaseio.com/users/"+id);
		//user object
		this.me =  object(userInfo);

		//saved concerts
		var concertRef = new Firebase("https://boogie.firebaseio.com/concerts")
				.orderByChild("userId")
				.equalTo(this.me.$id);

		this.userConcerts = $firebaseArray(concertRef);
		console.log("saved concerts:", this.userConcerts);


		//reference to concert steps
		var userRefFit = new Firebase("https://boogie.firebaseio.com/users/"+id+"/concertSteps/"+this.Id);
		//concert object
		this.fitInfo = object(userRefFit);

		this.gotoconcert = function(songId){
			$location.path('/concerts/'+songId);
		}

		//remove concert function
		this.removeConcert = function(concertId){
			console.log(concertId)
			this.userConcerts.$remove(this.userConcerts.$getRecord(concertId)).then(function(ref){
					}, 
					function(error){
						console.log(error);
			});
		}
	}]);