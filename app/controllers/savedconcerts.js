app.controller('savedconcertsCtrl', 
	['fireAuth',
	'$firebaseArray',
	'$routeParams',
	function(fireAuth, $firebaseArray,$routeParams){
		var you = $routeParams.id
		var me = fireAuth.getAuth();

		this.authObj = you;
		this.me = me.uid;
		//saved concerts
		var concertRef = new Firebase("https://boogie.firebaseio.com/concerts")
				.orderByChild("userId")
				.equalTo(you);

		//users concert array
		this.userConcerts = $firebaseArray(concertRef);

		//remove concert function
		this.removeConcert = function(concertId){
			console.log(concertId)
			this.userConcerts.$remove(this.userConcerts.$getRecord(concertId)).then(function(ref){
					}, 
					function(error){
						console.log(error);
			});
		}

		//ng hide 
		this.hideDelete = function(){
			if(you.uid){
				return false;
			}
		}

		//redirect to a particular concert for a user
		this.gotoConcert = function(id){
			location.href='/#/concert/'+id;
		}
	}])