app.controller('profileCtrl', 
	['$firebaseArray',
	'$firebaseObject',
	'fireAuth',
	'$routeParams',
	'$location',
	function($firebaseArray, object, fireAuth, $routeParams, $location){

		//removes background image
		$('body').css('background-image', 'none');

		//get personal info
		var id = $routeParams.id;

		//reference to user info
		var userInfo = new Firebase("https://boogie.firebaseio.com/users/"+id);

		//user object
		this.me =  object(userInfo);

		//snapshot for overall rating
		var userInfoRatings = new Firebase("https://boogie.firebaseio.com/users/"+id+"/ratings/");
		var averageRatingsArray = [];
		userInfoRatings.once("value", function(snapshot){
			snapshot.forEach(function(childSnapshot){
				var childData = childSnapshot.val();
				averageRatingsArray.push(childData);
			});
			var total =0;
			//loops over averageratingsarray and creates a total
			for(var i=0;i<averageRatingsArray.length;i++){
				total += averageRatingsArray[i];
			}
			//bound variable to the dom and creates the average
			this.avg = Math.ceil(total/averageRatingsArray.length);
		}.bind(this));
	}]
);