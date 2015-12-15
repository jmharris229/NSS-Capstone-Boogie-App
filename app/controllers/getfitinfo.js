app.controller('getfitbitdataCtrl', 
	['$location',
	'fireAuth',
	'$http',
	function($location, fireAuth,$http){
		var boogieref = new Firebase("https://boogie.firebaseio.com/");

		$('body').css('background-image', 'none');
		var you = fireAuth.getAuth();
		this.fitbitrequest = function(){
			$location.path("/profile/"+you.uid);
		};
		this.logout = function(){
			boogieref.unauth();
			$location.path('/#/');
		};
	}]);