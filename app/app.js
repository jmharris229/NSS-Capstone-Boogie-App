var app = angular.module('boogie', ['Auth', 'firebase', 'ngRoute']);

	app.config(
		['$routeProvider',
			function($routeProvider){
				$routeProvider
					//route to login
					.when('/',  {
						templateUrl: '/partials/login.html',
						controller: 'authCtrl'
					})
					//route to add device page
					.when('/adddevice/',  {
						templateUrl: '/partials/addDevice.html',
						controller: 'getfitbitdataCtrl as GetfitbitdataCtrl'
					})
					.when('/search/',  {
						templateUrl: '/partials/search.html',
						controller: 'testCtrl'
					})
					.otherwise({ redirectTo: '/login'});
			}
		]
	);







