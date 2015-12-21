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
		
		//removes background image
		$('body').css('background-image', 'none');

		//gets current auth
		var you = fireAuth.getAuth();

		//retrives list of all saved concerts
		var savedConcerts = new Firebase("https://boogie.firebaseio.com/concerts/");
		
		//variable for saved concert ids
		var concertListKeys = [];

		//variable for search result ids
		var concertIdList = [];

		//variable for saving search results to after promise
		var searchResults;

		//call to retrieve all saved concerts then cycles through each one and push to concertidlist
  		savedConcerts.orderByChild("userId").equalTo(you.uid).once("value", 
  			function(snapshot){
	  			 snapshot.forEach(function(snapshot){
	  			 	concertIdList.push({id: snapshot.val().concertId, name: snapshot.val().bandName.toLowerCase(), saved:snapshot.val().saveState});
	  			 });
  			});

      //user generated search
      $scope.searchBand = function(){
      	var bandname = $('#searchBandBar').val().toLowerCase();
      	$("#searchConcerts").removeClass("searchMiddle");
      	$("#searchSection").addClass("topSearch");
      	$(".findaConcerthead").css("display","none");
      	$("#searchBandBar").css("margin-top", "37.5px");

			(function() {        
			   var timer;
			   $(window).bind('scroll',function () {
			       clearTimeout(timer);
			       timer = setTimeout( refresh , 150 );
			       $("#searchSection").fadeOut("fast");
			   });
			   var refresh = function () { 
			       // do stuff
			       $("#searchSection").fadeIn("fast");
			   };
			})();
      	bitreq.getResultsSearch(bandname)
      		.then(
      			function(concertData){
      				//post promise determines if the results came back with nothing
      				if(concertData.length === 0){
      					$scope.concerts = concertData;
      					$scope.message = "no concerts found";
      				}else{	
      					//consearcharray = a list of saved ids	
	      				var conSearchArray = [];
	      				$scope.message = bandname.toUpperCase();

	      				//loops over concertidlist and checks to see for each if the current search name equals the iterations name, then push to consearcharray
	      				for(var i=0; i<concertIdList.length;i++){
	      					if(concertIdList[i].name === bandname){
	      						conSearchArray.push(concertIdList[i].id);
	      					}
	      				}

	      				//this for loop loops through each iteration in concertdata, which is the results of the search and pushes the id to concertdataIds
	      				var concertDataIds = [];
	      				for(var j =0; j<concertData.length;j++){
	      					concertDataIds.push(concertData[j].id);
	      				}

	      				//using lodash this compares concertdataids and consearcharray and removes any duplicates between the two. 
	      				var differenceArray = _.difference(concertDataIds, conSearchArray);

	      				//this for loop loops through the difference array, then on the concertdata and determines if there's a match in ids, if so it push the concert data information to the final filtered array
	      				var finalFilteredArray = [];
	      				for(var k=0; k<differenceArray.length;k++){
	      					for(var l=0; l<concertData.length;l++){
	      						if(differenceArray[k] === concertData[l].id){
	      							finalFilteredArray.push(concertData[l]);
	      						}
	      					}
	      				}
	      				//bound variable of search data to display
	      				$scope.concertsArray = finalFilteredArray;
						}
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
      };
	}]);

