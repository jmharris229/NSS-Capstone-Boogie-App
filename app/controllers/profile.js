app.controller('profileCtrl', 
	['$firebaseArray',
	'$firebaseObject',
	'fireAuth',
	'$routeParams',
	'$location',
	function($firebaseArray, object, fireAuth, $routeParams, $location){

		//get personal info
		var id = $routeParams.id;
		//reference to user info
		var userInfo = new Firebase("https://boogie.firebaseio.com/users/"+id);
		//user object
		this.me =  object(userInfo);

	}]);