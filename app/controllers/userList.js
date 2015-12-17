app.controller('userListCtrl',
	['$firebaseArray',
	'fireAuth',
	function(userList, fireAuth){

		$('body').css('background-image', 'none');
		var ref = new Firebase("https://boogie.firebaseio.com/users/");
		this.users = userList(ref);
		var you = fireAuth.getAuth();
		var userfriends = new Firebase("https://boogie.firebaseio.com/users/"+you.uid+"/friends");
		var friendlist = [];

		//create a users friends list
		userfriends.on("value", function(snapshot){
			var rawfriends = snapshot.val();
			for(var key in rawfriends){
				friendlist.push(key);
			}
		});

		this.isFriend = function(id){
			for(var i=0; i<friendlist.length; i++){
				if(friendlist[i] === id){
					return true;
				}
				return false;
			}
		};


		this.addFriend = function(Id, name, pic){
			var createFriend = new Firebase("https://boogie.firebaseio.com/users/"+you.auth.uid+"/friends/"+Id);
			createFriend.set({
				uid: Id,
				name: name,
				pic:pic, 
				savedState: true
			});
		};

		this.hideYou = function(id){
			if(id === you.uid){
				return false;
			}
			return true;
		};
	}
	]);