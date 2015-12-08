app.controller('profileCtrl', 
	['$firebaseArray',
	'$firebaseObject',
	'fireAuth',
	'$location',
	function($userAcct, object, fireAuth, $location){

		//get personal info
		var you = fireAuth.getAuth();
		console.log(you);
		var userInfo = new Firebase("https://boogie.firebaseio.com/users/"+you.uid);
		this.me =  object(userInfo);


		// var concertRef = new Firebase("https://boogie.firebaseio.com/concerts")
		// 		.orderByChild("uid")
		// 		.equalTo(this.me);

		// this.userConcerts = $firebaseArray(concertRef);

		

		this.logout = function(){
			console.log("user unauthed")
		}

		this.gotoUser = function(id){
			console.log(id)
			$location.path('/user/'+id);
		}
	}]);