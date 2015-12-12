app.controller('userListCtrl',
	['$firebaseArray',
	'fireAuth',
	function(userList, fireAuth){
		var ref = new Firebase("https://boogie.firebaseio.com/users/");
		this.users = userList(ref);
		var you = fireAuth.getAuth();

		this.addFriend = function(Id, name, pic){
			var createFriend = new Firebase("https://boogie.firebaseio.com/users/"+you.auth.uid+"/friends/"+Id);
			createFriend.set({
				uid: Id,
				name: name,
				pic:pic, 
				savedState: true
			});
		}

		this.hideYou = function(id){
			if(id === you.uid){
				return false
			}
			return true
		}
	}
	])