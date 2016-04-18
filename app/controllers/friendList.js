app.controller('friendlistCtrl', 
	['fireAuth',
	'$firebaseArray',
	'$routeParams',
	function(fireAuth, $firebaseArray, $routeParams){
		
		//removes background image
		$('body').css('background-image', 'none');

		//grabs route params id and uses it to grabs specific persons friends list
		var you = $routeParams.id;
		var friendsref = new Firebase("https://boogie.firebaseio.com/users/"+you+"/friends/");

		this.friendsArray = $firebaseArray(friendsref); 

		this.gotoUser = function(id){
			location.href='/#/profile/'+id;
		};
	}]
);