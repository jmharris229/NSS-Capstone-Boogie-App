var auth = angular.module('Auth', ['firebase']);

auth.factory("Authref", ["$firebaseAuth",
	function($firebaseAuth){
		var ref = new Firebase("https://boogie.firebaseio.com");
		return ref;
	}
]);

app.controller('authCtrl', 
	['$scope',
	'Authref',
	'$firebaseArray',
	'$location',
	function($scope,Authref, $currentAcct, $location){
		//login a user using facebook
		$scope.fbLogin = function(){
			Authref.authWithOAuthPopup("facebook", function(error, authData) {
				if (error) {
			   	console.log("Login Failed!", error);
			  	} else {
			   	console.log("Authenticated successfully with payload:", authData);
			   	//set new user in Firebase
			   	var newUserRef = new Firebase("https://boogie.firebaseio.com/users/"+authData.uid+"/userinfo");
					newUserRef.set({
						name: authData.facebook.cachedUserProfile.first_name,
						gender: authData.facebook.cachedUserProfile.gender,
						pic: authData.facebook.cachedUserProfile.picture.data.url,
						uid: authData.uid
					});
				//redirect to add device partial
				$location.path("/addDevice/");
			  }
			});
		};
	}]);




