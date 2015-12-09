app.controller('navCtrl', 
	['$scope',
	'fireAuth',
	'$location',
	function($scope, fireAuth, $location){

		var you = fireAuth.getAuth();

		$scope.profile = function(){
			console.log(you.uid);
			location.href = '/#/profile/'+you.uid;
		}
		$scope.logout = function(){
			fireAuth.unauth();
			$location.path('/#/')
		}
	}
	]
);