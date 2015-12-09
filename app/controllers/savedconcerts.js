app.controller('savedconcertsCtrl', 
	['fireAuth',
	'$firebaseArray',
	function(fireAuth, $firebaseArray){
		var you = fireAuth.getAuth();

		//saved concerts
		var concertRef = new Firebase("https://boogie.firebaseio.com/concerts")
				.orderByChild("userId")
				.equalTo(you.uid);

		this.userConcerts = $firebaseArray(concertRef);

		this.gotoconcert = function(songId){
			$location.path('/concerts/'+songId);
		}

		//remove concert function
		this.removeConcert = function(concertId){
			console.log(concertId)
			this.userConcerts.$remove(this.userConcerts.$getRecord(concertId)).then(function(ref){
					}, 
					function(error){
						console.log(error);
			});
		}

		this.gotoConcert = function(id){
			location.href='/#/concert/'+id;
		}
	}])