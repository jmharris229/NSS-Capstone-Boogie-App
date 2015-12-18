app.controller('getfitbitdataCtrl', 
	['$location',
	'fireAuth',
	'$http',
	function($location, fireAuth,$http){
		var boogieref = new Firebase("https://boogie.firebaseio.com/");

		//removes the background image
		$('body').css('background-image', 'none');

		//gets current auth state of user
		var you = fireAuth.getAuth();

		//will request fitbit auth and then redirect to profile, currently only redirects to profile
		this.fitbitrequest = function(){
			$location.path("/profile/"+you.uid);
		};
	}]);