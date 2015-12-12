app.controller('searchconcertCtrl',
	['$scope',
	'$q',
	'bitreq',
	'Authref',
	'fireAuth',
	'$firebaseArray',
	'$route',
	'$location',
	'$routeParams',
	function($scope, $q, bitreq, fireAuth, Authref,$acctInfo,$route,$location,$routeParams){
		var you = fireAuth.getAuth();
		var savedConcerts = new Firebase("https://boogie.firebaseio.com/concerts/");
		var concertListKeys = [];
		var concertIdList = [];
  		savedConcerts.orderByChild("userId").equalTo(you.uid).once("value", 
  			function(snapshot){
	  			 var rawConcerts = snapshot.val();
	  			 for(key in rawConcerts){
	  			 	concertListKeys.push(key);
	  			 }
	  			 for(var i= 0; i<concertListKeys.length;i++){
	  			 	var concert = new Firebase("https://boogie.firebaseio.com/concerts/"+concertListKeys[i]);
	  			 	concert.on("value", function(snapshot){
	  			 		concertIdList.push(snapshot.val().concertId);
	  			 	}) 	
	  			 }
  			});

  		$scope.testConcert = function(conId){
  			for(var i = 0; i<concertIdList.length; i++){
  				if(conId === concertIdList[i]){
  					return false;
  				}
  				return true
  			}
  		}

      //user generated search
      $scope.searchBand = function(){
      	var bandname = $('#searchBandBar').val();
      	bitreq.getResultsSearch(bandname)
      		.then(
      			function(concertData){
      				if(concertData.length === 0){
      					$scope.concerts = concertData;
      					$scope.message = "no concerts found"
      				}else{					
	      				$scope.concerts = concertData;
	      				 $scope.message = ""
	      				// $route.reload();
      				}
      			},
      			function(error){
      				console.log(error);
      			});
      	}

      	//go to a single concert detail
      	$scope.goToConcert = function(songId){
      		$location.path('/concerts/'+songId);
      	}


      //saves a concert to users profile
      $scope.saveConcert = function(band, Id, title, date,venueObj){
      	var ref = new Firebase('https://boogie.firebaseio.com');
      	var authData = ref.getAuth();
      	var myConcerts = new Firebase("https://boogie.firebaseio.com/concerts/");
			myConcerts.push({
            userId: authData.uid,
            saveState: true,
				concertId: Id,
				bandName: band,
				concertName: title,
				concertDate: date,
				startSteps:0,
				endSteps:0,
				difference: 0,
				venueName: venueObj.name,
				venueLat: venueObj.latitude,
				venueLong: venueObj.longitude,
				venueCity: venueObj.city,
				venueCountry: venueObj.country
			});
      }
	}])

