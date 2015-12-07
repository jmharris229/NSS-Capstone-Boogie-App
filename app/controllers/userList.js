app.controller('userListCtrl',
	['$firebaseArray',
	'fireAuth',
	function(userList, fireAuth){
		var ref = new Firebase("https://boogie.firebaseio.com/users/");
		this.users = userList(ref);
		console.log(this.users);

		this.addFriend = function(Id, name, pic){
			console.log("button clicked")
			var you = fireAuth.getAuth();
			var createFriend = new Firebase("https://boogie.firebaseio.com/users/"+you.auth.uid+"/friends/"+Id);
			createFriend.set({
				uid: Id,
				name: name,
				pic:pic
			});
		}
	}
	])