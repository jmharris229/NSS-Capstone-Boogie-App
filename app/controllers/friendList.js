app.controller('friendlistCtrl', 
	['fireAuth',
	'$firebaseArray',
	'$routeParams',
	function(fireAuth, $firebaseArray, $routeParams){
		
		$('body').css('background-image', 'none');
		var you = $routeParams.id;
		var friendsref = new Firebase("https://boogie.firebaseio.com/users/"+you+"/friends/");

		this.friendsArray = $firebaseArray(friendsref); 
		console.log(this.friendsArray);

		this.gotoUser = function(id){
			location.href='/#/profile/'+id;
		};
	}]);