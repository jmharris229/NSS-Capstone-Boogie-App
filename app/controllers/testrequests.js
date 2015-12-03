app.controller('testCtrl',
	function(){

		$.ajax({
				url:'https://api.fitbit.com/1/user/-/profile.json',
				crossDomain : true,
				dataType: 'jsonp'
			})
			.done(function(userData){
				console.log("fitbit data", userData);
			});
		$.ajax({
			url: 'http://api.bandsintown.com/artists/Skrillex.json?api_version=2.0&app_id=YOUR_APP_ID',
			crossDomain : true,
			dataType: 'jsonp'
		})
			.done(function(BITdata){
				console.log('BIT data', BITdata);
			})
	})