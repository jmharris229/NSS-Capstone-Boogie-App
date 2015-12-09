app.controller('savedconcertsCtrl', 
	['fireAuth',
	'$firebaseArray',
	function(fireAuth, $firebaseArray){
		var you = fireAuth.getAuth();

		//saved concerts
		var concertRef = new Firebase("https://boogie.firebaseio.com/concerts")
				.orderByChild("userId")
				.equalTo(you.uid);

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

		//redirect to a particular concert for a user
		this.gotoConcert = function(id){
			location.href='/#/concert/'+id;
		}
	}])