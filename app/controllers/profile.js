app.controller('profileCtrl', 
	['$firebaseArray',
	'$firebaseObject',
	'fireAuth',
	'$routeParams'
	'$location',
	function($firebaseArray, object, fireAuth, $routeParams, $location){

		//get personal info
		// var you = fireAuth.getAuth();
		var id = $routeParams.id;
		var userInfo = new Firebase("https://boogie.firebaseio.com/users/"+id);
		this.me =  object(userInfo);
		console.log(this.me.$id)

		//saved concerts
		var concertRef = new Firebase("https://boogie.firebaseio.com/concerts")
				.orderByChild("userId")
				.equalTo(this.me.$id);

		this.userConcerts = $firebaseArray(concertRef);

		this.gotoconcert = function(songId){
			$location.path('/concerts/'+songId);
		}

		this.gotoUser = function(id){
			$location.path('/user/'+id);
		}
	}]);