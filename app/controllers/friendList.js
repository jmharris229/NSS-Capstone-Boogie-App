app.controller('friendlistCtrl', 
	['fireAuth',
	'$firebaseArray',
	function(fireAuth, $firebaseArray){
		var you = fireAuth.getAuth();

		var friendsref = new Firebase("https://boogie.firebaseio.com/users/"+you.uid+"/friends/");

		this.friendsArray = $firebaseArray(friendsref); 

		this.gotoUser = function(id){
			console.log(id)
			location.href='/#/profile/'+id;
		}
	}])