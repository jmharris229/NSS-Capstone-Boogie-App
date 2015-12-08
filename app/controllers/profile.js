app.controller('profileCtrl', 
	['$firebaseArray',
	'$firebaseObject',
	'fireAuth',
	'$location',
	function($firebaseArray, object, fireAuth, $location){

		//get personal info
		var you = fireAuth.getAuth();
		var userInfo = new Firebase("https://boogie.firebaseio.com/users/"+you.uid);
		this.me =  object(userInfo);
		console.log(this.me.$id)

		//saved concerts
		var concertRef = new Firebase("https://boogie.firebaseio.com/concerts")
				.orderByChild("userId")
				.equalTo(this.me.$id);

		this.userConcerts = $firebaseArray(concertRef);


		this.gotoUser = function(id){
			console.log(id)
			$location.path('/user/'+id);
		}
	}]);