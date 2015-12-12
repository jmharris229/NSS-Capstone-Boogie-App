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
		var searchResults;
		$scope.added;
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

  //	hides a concert from view if already added to list of concerts
  		$scope.testConcert = function(conId){





  			// console.log(searchResults)
  			// for(var i = 0; i<searchResults.length; i++){
  			// 	console.log(conId, searchResults[i]);
  			// 	if(conId === searchResults[i].id){
  			// 		console.log("false")
  			// 		return false;
  			// 	}
  			// 	console.log("True")
  			// 	return true
  			// }
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
	      				 searchResults = concertData;
      					console.log(concertData);
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
				venueState: venueObj.region
			});
			var userConcerts = new Firebase("https://boogie.firebaseio.com/users/"+you.uid+"/concerts/");
      	userConcerts.push(Id);

	  //    	var userConcerts = new Firebase("https://boogie.firebaseio.com/users/"+you.uid+"/concerts/");
			// var concertList = [];
			// var concertIdList = [];

			// //create a users friends list
			// userConcerts.on("value", function(snapshot){
			// 	var rawAddConcerts = snapshot.val();
			// 	snapshot.forEach(function(childSnapshot){
			// 		var childData = childSnapshot.val();
			// 		concertIdList.push(childData);

			// 	})
			// 	console.log(concertIdList)
			// 	for(var i=0; i<concertIdList.length; i++){

			// 	if(concertIdList[i] ===){
			// 		return false;
			// 	}
			// 	return true
			// }	
			// });


      }
	}])

