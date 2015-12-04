app.controller('searchconcertCtrl',
	function($scope, $q, bitreq){

		this.concerts = null;
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
	})
//shttps://api.fitbit.com/1/user/-/profile.json