app.controller('navCtrl', 
	['$scope',
	'fireAuth',
	'$location',
	function($scope, fireAuth, $location){
 
		var yourself = fireAuth.getAuth();
		$scope.you =yourself;

		$scope.profile = function(){
			location.href = '/#/profile/'+yourself.uid;
		};
		$scope.logout = function(){
			fireAuth.unauth();
			$location.path('/#/');
		};
	}
	]
);