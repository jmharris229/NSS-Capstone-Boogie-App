app.controller('searchconcertCtrl',
	['$scope',
	'$q',
	'bitreq',
	'Authref',
	'fireAuth',
	'$firebaseArray',
	function($scope, $q, bitreq, fireAuth, Authref,$acctInfo){
		//initial search of phish
		bitreq.getResults()
        .then(
            function (concertData) {
            	console.log(concertData)
                // promise was fullfilled (regardless of outcome)
                // checks for information will be peformed here
                $scope.concerts = concertData;
            },
            function (error) {
                // handle errors here
                console.log(error.statusText);
            }
        );

      //user generated search
      $scope.searchBand = function(){
      	var bandname = $('#searchBandBar').val();
      	bitreq.getResultsSearch(bandname)
      		.then(
      			function(concertData){
      				console.log(concertData);
      				$scope.concerts = concertData;
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
      	var myConcerts = new Firebase("https://boogie.firebaseio.com/users/"+authData.uid+"/myconcerts/"+Id);
			myConcerts.set({
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