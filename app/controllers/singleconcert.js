app.controller('concertCtrl',
	['$firebaseObject',
	'$firebaseArray',
	'fireAuth',
	'$routeParams',
	'$location',
	function($firebaseObject,$firebaseArray, fireAuth,$routeParams,$route,$location){

		var you = fireAuth.getAuth();
		console.log(you.uid)
		//creates reference to particular concert
		this.Id= $routeParams.id;
		console.log(this.Id);
		var ref = new Firebase("https://boogie.firebaseio.com/concerts/"+this.Id)

		//concert object and array
		// this.concertArray =$firebaseObject(ref);
		// console.log(this.concertArray);
		this.concert = $firebaseObject(ref);
		//concert step object
		// this.concertSteps = $firebaseObject(userRefFit);

		var initialSteps;
		//gets initial steps before concert
		this.startCount = function(){
			initialSteps = (Math.floor(Math.random()*50)+1)*100;
			ref.update({
				startSteps: initialSteps
			});

		}

		//gets steps after concert
		this.stopCount = function(){
			var postSteps = (Math.floor(Math.random()*50)+51)*100;
			var stepDifference = postSteps - this.concert.startSteps;
			ref.update({
				endSteps: postSteps,
				difference: stepDifference
			});
			calcRating(stepDifference, this.Id);
		}

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
			location.href = '/#/concerts/'+id;
		}

		//remove concert function
		this.removeConcert = function(concertId){
			this.concertArray.$remove(this.concertArray.$getRecord(concertId)).then(function(ref){
					}, 
					function(error){
						console.log(error);
					});
		}

	}
])