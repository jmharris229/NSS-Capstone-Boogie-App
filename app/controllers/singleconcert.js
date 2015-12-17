 app.controller('concertCtrl',
	['$firebaseObject',
	'$firebaseArray',
	'fireAuth',
	'$routeParams',
	'$location',
	'$scope',
	function($firebaseObject,$firebaseArray, fireAuth, $routeParams, $location, $scope){
		
		$('body').css('background-image', 'none');
		var you = fireAuth.getAuth();
	//creates reference to particular concert
		this.Id= $routeParams.id;
		var rateId = $routeParams.id;
		var ref = new Firebase("https://boogie.firebaseio.com/concerts/"+this.Id);

		//creates a snapshot of this concert so that the concert id can be taken
		this.attendees = [];
		
		ref.once("value", function(snapshot) {
  			var concertInfoId = snapshot.val().concertId;
  			var attendeesRef = new Firebase("https://boogie.firebaseio.com/concerts/");
  			attendeesRef.orderByChild("concertId").equalTo(concertInfoId).once("value", function(snapshot){
  				var concertGoers = snapshot.val();

  				snapshot.forEach(function (concert) {

  					var attendeeRef = new Firebase("https://boogie.firebaseio.com/users/"+concert.val().userId);
  					attendeeRef.update({concertSteps: concert.val().difference});
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
		}

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
			ref.update({
				rating: this.rating
			});
			console.log("got to updateOverallScore");
			var updateOverallScore = new Firebase("https://boogie.firebaseio.com/users/"+you.uid+"/ratings/");
			updateOverallScore.push(stepDifference);
			console.log("reached refresh");
			location.reload(true);
		}

	}
]);