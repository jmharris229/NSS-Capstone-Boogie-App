var app = angular.module('boogie', ['firebase', 'ngRoute']);

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
					.when('/profile/:id',  {
						templateUrl: '/partials/userprofile.html',
						controller: 'profileCtrl as ProfileCtrl'
					})
					.when('/concerts/:id',  {
						templateUrl: '/partials/concert.html',
						controller: 'concertCtrl as ConcertCtrl'
					})
					.when('/users/',  {
						templateUrl: '/partials/users.html',
						controller: 'userListCtrl as UserListCtrl'
					})
					.when('/friends/',  {
						templateUrl: '/partials/friends.html',
						controller: 'friendlistCtrl as FriendlistCtrl'
					})
					.when('/concerts/', {
						templateUrl:'/partials/savedConcerts.html',
						controller: 'savedconcertsCtrl as SavedconcertCtrl'
					})
					// .when('/user/:id',  {
					// 	templateUrl: '/partials/otheruser.html',
					// 	controller: 'userCtrl as UserCtrl'
					// })
					.when('/search/',  {
						templateUrl: '/partials/search.html',
						controller: 'searchconcertCtrl'
					})
					.otherwise({ redirectTo: '/'});
			}
		]
	);







