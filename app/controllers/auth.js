app.controller('authCtrl', 
	['$scope',
	'Authref',
	'$firebaseArray',
	'$location',
	function($scope,Authref, $currentAcct, $location){
		//login a user using facebook
		var fbid;

		var boogieRef = new Firebase("https://boogie.firebaseio.com/");

		boogieRef.onAuth(function (authData) {
			if ( authData ) {
					location.href = '/#/adddevice/';
			} else {
				console.log("User has logged out");
			}
		})



		$scope.fbLogin = function(){
			Authref.authWithOAuthPopup("facebook", function(error, authData) {
				if (error) {
			   	console.log("Login Failed!", error);
			  	} else {
			   	fbid = authData.uid;
			   	var newUserRef = new Firebase("https://boogie.firebaseio.com/users/"+authData.uid);
					newUserRef.set({
						name: authData.facebook.cachedUserProfile.first_name,
						gender: authData.facebook.cachedUserProfile.gender,
						pic: authData.facebook.cachedUserProfile.picture.data.url,
						uid: authData.uid
					});
			   	console.log("Authenticated successfully with payload:", authData);

			  }
			});
		};


	}]);




