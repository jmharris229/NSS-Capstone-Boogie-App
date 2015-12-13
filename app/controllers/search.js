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
		$scope.ad;
  		savedConcerts.orderByChild("userId").equalTo(you.uid).once("value", 
  			function(snapshot){
	  			 // var rawConcerts = snapshot.val();
	  			 snapshot.forEach(function(snapshot){
	  			 	concertIdList.push({id: snapshot.val().concertId, name: snapshot.val().bandName.toLowerCase(), saved:snapshot.val().saveState});
	  			 })
  			});

      //user generated search
      $scope.searchBand = function(){
      	var bandname = $('#searchBandBar').val().toLowerCase();
      	bitreq.getResultsSearch(bandname)
      		.then(
      			function(concertData){
      				if(concertData.length === 0){
      					$scope.concerts = concertData;
      					$scope.message = "no concerts found";
      				}else{		
	      				var conSearchArray = [];
	      				$scope.message = "";
	      				for(var i=0; i<concertIdList.length;i++){
	      					if(concertIdList[i].name === bandname){
	      						conSearchArray.push(concertIdList[i].id);
	      					}
	      				}
	      				var filteredArray = [];
	      				for(var i = 0; i<1;i++){
	      					console.log(conSearchArray[0]);
	      					for(var j=0; j<concertData.length;j++){
	      						if(conSearchArray[0] !== concertData[j].id){
	      								filteredArray.push(concertData[j]);										
	      						}else{
	      							console.log("match", conSearchArray[0], concertData[j].id)
	      						}
	      					}
	      				}
	      				var secondfilter = [];
	      				if(conSearchArray.length>1){
		      				for(var i=0;i<1;i++){
		      					for(var j=0;j<filteredArray.length; j++){
		      						if(conSearchArray[1] !== filteredArray[j].id){
		      								secondfilter.push(filteredArray[j]);										
		      						}else{
		      							console.log("match", conSearchArray[0], filteredArray[j].id)
		      						}
		      					}
		      				}
	      				$scope.concertsArray = secondfilter;	
	      				}else{
	      					$scope.concertsArray = filteredArray;	
	      				}
	      				console.log($scope.concertsArray);


						};
	      				// var combined = _.uniq(concertData.concat(concertIdList), 'id');
	      				// console.log(combined)


      				
      			},
      			function(error){
      				console.log(error);
      			});
      	};

      	//go to a single concert detail
      	$scope.goToConcert = function(songId){
      		$location.path('/concerts/'+songId);
      	};


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


      };
	}]);

