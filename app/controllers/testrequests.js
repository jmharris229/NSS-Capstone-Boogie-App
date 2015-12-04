app.controller('searchconcertCtrl',
	function($q, bitreq){

		this.concerts = null;
		bitreq.getResults()
        .then(
            function (concertData) {
                // promise was fullfilled (regardless of outcome)
                // checks for information will be peformed here
                this.concerts = concertData;
            },
            function (error) {
                // handle errors here
                console.log(error.statusText);
            }
        );

		// this.concerts=null;
		// $.ajax({
		// 	url: 'http://api.bandsintown.com/artists/Phish/events.json?api_version=2.0&app_id=YOUR_APP_ID',
		// 	crossDomain : true,
		// 	dataType: 'jsonp'
		// })
		// 	.done(function(BITdata){
		// 		console.log('BIT data', BITdata);
		// 		this.concerts=BITdata;
		// 	}.bind(this))
	})
//shttps://api.fitbit.com/1/user/-/profile.json