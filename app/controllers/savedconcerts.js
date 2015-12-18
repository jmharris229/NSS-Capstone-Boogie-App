app.controller('savedconcertsCtrl', 
	['fireAuth',
	'$firebaseArray',
	'$routeParams',
	function(fireAuth, $firebaseArray,$routeParams){
		
		//removes background image
		$('body').css('background-image', 'none');

		//gets user id
		var you = $routeParams.id;
		var me = fireAuth.getAuth();

		this.authObj = you;
		this.me = me.uid;

		//gets saved concerts for current user
		var concertRef = new Firebase("https://boogie.firebaseio.com/concerts")
				.orderByChild("userId")
				.equalTo(you);

		//users concert array
		this.userConcerts = $firebaseArray(concertRef);

		//remove concert function
		this.removeConcert = function(concertId){
			console.log(concertId);
			this.userConcerts.$remove(this.userConcerts.$getRecord(concertId)).then(function(ref){
					}, 
					function(error){
						console.log(error);
			});
		};

		//ng hide on delete button 
		this.hideDelete = function(){
			if(you.uid){
				return false;
			}
		};

		//redirect to a particular concert for a user
		this.gotoConcert = function(id){
			location.href='/#/concert/'+id;
		};
	}]);