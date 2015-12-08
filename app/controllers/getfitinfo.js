app.controller('getfitbitdataCtrl', 
	['$location',
	'$http',
	function($location, $http){
		var boogieref = new Firebase("https://boogie.firebaseio.com/");
		this.fitbitrequest = function(){
			$location.path("/profile");
		}
		this.logout = function(){
			boogieref.unauth();
			$location.path('/#/')
		}
	}]);