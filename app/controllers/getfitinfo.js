app.controller('getfitbitdataCtrl', 
	['$location',
	function($location){

		this.fitbitrequest = function(){
			OAuth.initialize('j_EDxkRRXclXp8B6XZC4TnJUoB4');
			//Using popup
			OAuth.popup('fitbit')
	   		.done(function(result) {
					console.log(result);


					$location.path("/search");
      			//use result.access_token in your API request 
      			//or use result.get|post|put|del|patch|me methods (see below)
	    		})
	   		.fail(function (err) {
	   		//handle error with err
				});
		}
	}]);