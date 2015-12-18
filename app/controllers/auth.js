app.controller('authCtrl', 
	['$scope',
	'Authref',
	'$firebaseArray',
	'$location',
	'$firebaseAuth',
	function($scope,Authref, $currentAcct, $location, $firebaseAuth){
		
		//sets the background image for the login screen
		$('body').css('background-image', 'url('+'../css/images/background_image.svg'+')');
		
		//login a user using facebook
		var fbid;
		var boogieRef = new Firebase("https://boogie.firebaseio.com/");

		//change in authentication state function
		boogieRef.onAuth(function (authData) {
			if ( authData ) {
					location.href = '/#/adddevice/';
			} else {
				console.log("User has logged out");
			}
		});

		//facebook login
		$scope.fbLogin = function(){
			Authref.authWithOAuthPopup("facebook", function(error, authData) {
				if (error) {
			   	console.log("Login Failed!", error);
			  	} else {
			   	fbid = authData.uid;
			   	//creates node in firebase with facebook user id
			   	var newUserRef = new Firebase("https://boogie.firebaseio.com/users/"+authData.uid);
					newUserRef.push({
						name: authData.facebook.cachedUserProfile.first_name,
						gender: authData.facebook.cachedUserProfile.gender,
						pic: authData.facebook.cachedUserProfile.picture.data.url,
						uid: authData.uid, 
						concertSteps: 0
					});
			  }
			});
		};

		//create a user with email
		$scope.CreateUser = function(){
			var boogieUsers = new Firebase("https://boogie.firebaseio.com");
			console.log($scope.user);
			boogieUsers.createUser({
				email: $scope.user.email,
				password: $scope.user.password
			}).then(function(error, userData){
				var ref = new Firebase("https://boogie.firebaseio.com/users/"+userData.uid);
				ref.set({
						name: "",
						gender: "",
						pic: "",
						uid: authData.uid
				});
				console.log("user created with id:" +userData.uid);
 					$scope.loginUser();
			}).catch(function(error){
				console.log("user not created with error:" +error);
			});
		};

		//login a user
		$scope.loginUser = function(){
			Authref.$authWithPassword({
				email: $scope.email,
				password: $scope.password
			}).then(function(userData){
				console.log("user logged in with id:" +userData.uid);
				location.href = '/#/adddevice/';
			}).catch(function(error){
				console.log("user not logged with error:" +error);
			});
		};
	}]);




