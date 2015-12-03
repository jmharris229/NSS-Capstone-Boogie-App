var app = angular.module('boogie', ['Auth', 'firebase', 'ngRoute']);


	app.config(
		['$routeProvider',
			function($routeProvider){
				$routeProvider
					.when('/',  {
						templateUrl: '/partials/login.html',
						controller: 'authCtrl'
					})
					.otherwise({ redirectTo: '/login'});
			}
		]
	);






// OAuth.initialize('j_EDxkRRXclXp8B6XZC4TnJUoB4');
// //Using popup
// function loginFitbit(){
// 	OAuth.popup('fitbit')
// 	   .done(function(result) {

// 		console.log(result);
//       //use result.access_token in your API request 
//       //or use result.get|post|put|del|patch|me methods (see below)
// 	    })
// 	   .fail(function (err) {
// 	   //handle error with err
// 	});
// }
