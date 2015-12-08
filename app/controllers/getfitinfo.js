app.controller('getfitbitdataCtrl', 
	['$location',
	'$http',
	function($location, $http){
		console.log("hi there")
		this.fitbitrequest = function(){
			
			$location.path("/profile");
		}
	}]);