app.controller('userListCtrl',
	['$firebaseArray',
	'fireAuth',
	function(userList, fireAuth){

		//removes background image
		$('body').css('background-image', 'none');

		//gets firebase reference for all users
		var ref = new Firebase("https://boogie.firebaseio.com/users/");

		//bound variable for displaying all users
		this.users = userList(ref);

		//get current user auth state
		var you = fireAuth.getAuth();

		//gets users friends
		var userfriends = new Firebase("https://boogie.firebaseio.com/users/"+you.uid+"/friends");
		var friendlist = [];

		//create a users friends list
		userfriends.on("value", function(snapshot){
			var rawfriends = snapshot.val();
			for(var key in rawfriends){
				friendlist.push(key);
			}
		});

		//function to determine if a user is a friend and show or hide the add button
		this.isFriend = function(id){
			for(var i=0; i<friendlist.length; i++){
				if(friendlist[i] === id){
					return true;
				}
				return false;
			}
		};

		//function to add a friend on add button click
		this.addFriend = function(Id, name, pic){
			var createFriend = new Firebase("https://boogie.firebaseio.com/users/"+you.auth.uid+"/friends/"+Id);
			createFriend.set({
				uid: Id,
				name: name,
				pic:pic, 
				savedState: true
			});
		};

		//function to hide myself from user list
		this.hideYou = function(id){
			if(id === you.uid){
				return false;
			}
			return true;
		};
	}
]);