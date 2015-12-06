app.controller('getfitbitdataCtrl', 
	['$location',
	'$http',
	function($location, $http){

		this.fitbitrequest = function(){
			OAuth.initialize('j_EDxkRRXclXp8B6XZC4TnJUoB4');
			//Using popup
			// OAuth.popup('fitbit')
	  //  		.done(function(result) {
			// 		console.log(result.oauth_token);

			// 		// $http({

			// 		// 	method: 'POST', 
			// 		// 	url: 'https://api.fitbit.com/oauth2/token', 
			// 		// 	headers:{
			// 		// 		'Authorization': 'Basic '+ result.oauth_token+'=',
			// 		// 		'Content-Type': application/x-www-form-urlencoded,
			// 		// 		'client_id=22B3GD&grant_type=authorization_code&redirect_uri=https://oauth.io/auth'
			// 		// 	}
			// 		// })

			// 		$location.path("/search");
   //    			//use result.access_token in your API request 
   //    			//or use result.get|post|put|del|patch|me methods (see below)
	  //   		})
	  //  		.fail(function (err) {
	  //  		console.log(err);
			// 	});
		$location.path("/profile");
		}
	}]);