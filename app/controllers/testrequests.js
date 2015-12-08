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

      //user generated search
      $scope.searchBand = function(){
      	var bandname = $('#searchBandBar').val();
      	bitreq.getResultsSearch(bandname)
      		.then(
      			function(concertData){
      				console.log(concertData);
      				$scope.concerts = concertData;
      				// $route.reload();
      			},
      			function(error){
      				console.log(error);
      			});
      	}


      //saves a concert to users profile
      $scope.saveConcert = function(band, Id, title, date,venueObj){
      	var ref = new Firebase('https://boogie.firebaseio.com');
      	var authData = ref.getAuth();
      	console.log(authData);
      	var myConcerts = new Firebase("https://boogie.firebaseio.com/concerts/"+Id);
			myConcerts.set({
                        userId: authData.uid,
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






//shttps://api.fitbit.com/1/user/-/profile.json