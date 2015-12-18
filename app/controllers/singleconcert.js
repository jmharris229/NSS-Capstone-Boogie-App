 app.controller('concertCtrl',
	['$firebaseObject',
	'$firebaseArray',
	'fireAuth',
	'$routeParams',
	'$location',
	'$scope',
	function($firebaseObject,$firebaseArray, fireAuth, $routeParams, $location, $scope){
		
		//removes background image from page
		$('body').css('background-image', 'none');
		
		//gets current auth state for a user 
		var you = fireAuth.getAuth();
		
		//creates reference to particular concert
		this.Id= $routeParams.id;
		var rateId = $routeParams.id;

		//goes and grabs a particular concert based on firebase key id
		var ref = new Firebase("https://boogie.firebaseio.com/concerts/"+this.Id);

		//creates a snapshot of this concert so that the concert id can be taken
		this.attendees = [];
		
		//overall this function is used to create the leaderboard, this first function call creates a snapshot of all current saved concerts
		ref.once("value", function(snapshot) {

			//variable of saved concerts
  			var concertInfoId = snapshot.val().concertId;

  			//creates a new reference of all users that attended concert
  			var attendeesRef = new Firebase("https://boogie.firebaseio.com/concerts/");
  			attendeesRef.orderByChild("concertId").equalTo(concertInfoId).once("value", function(snapshot){

  				//loops through the snapshot on each concert
  				snapshot.forEach(function (concert) {

  					//creates a variable reference to that particular concert on that id
  					var attendeeRef = new Firebase("https://boogie.firebaseio.com/users/"+concert.val().userId);
  					
  					//updates the attendeeRef with concert steps and adds the value of difference
  					attendeeRef.update({concertSteps: concert.val().difference});
  					
  					//creates another snapshot with the attendeeref variable
  					attendeeRef.once("value", function(snapshot){
						var userInfo = snapshot.val();
						this.attendees.push(userInfo);
		  				$scope.$digest();
					}.bind(this));
  				}.bind(this));
  			}.bind(this),function(errorObject){
  			});
		}.bind(this), function (errorObject) {
		});

		//concert object and array
		this.concert = $firebaseObject(ref);

		this.backToConcerts = function(){
			location.href= "/#/concerts/"+you.uid;
		};

		//functionality for rating a concert
		var initialSteps;

		//gets initial steps before concert
		this.startCount = function(){
			initialSteps = (Math.floor(Math.random()*50)+1)*100;
			ref.update({
				startSteps: initialSteps
			});

		};

		//gets steps after concert
		this.stopCount = function(){
			var postSteps = (Math.floor(Math.random()*50)+51)*100;
			var stepDifference = postSteps - this.concert.startSteps;
			ref.update({
				endSteps: postSteps,
				difference: stepDifference
			});
			calcRating(stepDifference, this.Id);
		};

		//function to calculate the rating after stop count fires
		function calcRating(stepDifference, id){
			if(stepDifference<2000){
				this.rating = 1;
			}
			else if(stepDifference>2000 && stepDifference<4000){
				this.rating = 2;	
			}
			else if(stepDifference>4000 && stepDifference<6000){
				this.rating = 3;
			}
			else if(stepDifference>6000 && stepDifference<8000){
				this.rating = 4;
			}
			else if(stepDifference>8000 && stepDifference<10000){
				this.rating = 5;
			}
			//updates the rating with the new score
			ref.update({
				rating: this.rating
			});
			//adds to the users ratings section which is used for averaging
			var updateOverallScore = new Firebase("https://boogie.firebaseio.com/users/"+you.uid+"/ratings/");
			updateOverallScore.push(stepDifference);
			console.log("reached refresh");
			location.reload(true);
		}
	}
]);