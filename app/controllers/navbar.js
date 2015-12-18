app.controller('navCtrl', 
	['$scope',
	'fireAuth',
	'$location',
	function($scope, fireAuth, $location){
 	
 		//gets current auth state of user
		var yourself = fireAuth.getAuth();
		$scope.you =yourself;

		//create ng-click function for redirect
		$scope.profile = function(){
			location.href = '/#/profile/'+yourself.uid;
		};

		//creates ng-click logout function
		$scope.logout = function(){
			fireAuth.unauth();
			$location.path('/#/');
		};
	}
	]
);