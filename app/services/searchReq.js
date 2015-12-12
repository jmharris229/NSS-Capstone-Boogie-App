app.service("bitreq", function ($http, $q) {
 

    //creates pre generated api call with phish as criteria
    this.getResults = function () {
        return $http.jsonp('http://api.bandsintown.com/artists/Phish/events.json?api_version=2.0&app_id=YOUR_APP_ID'+ '&callback=JSON_CALLBACK')
            .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                // promise is returned
                return deferred.promise;
            }, function (response) {
                // the following line rejects the promise 
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            });
    };

    //makes api call with user search critieria
    this.getResultsSearch = function(bandname){
        var deferred = $q.defer();
        return $http.jsonp('http://api.bandsintown.com/artists/'+bandname+'/events.json?api_version=2.0&app_id=YOUR_APP_ID'+ '&callback=JSON_CALLBACK')
            .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                // promise is returned
                return deferred.promise;
            }, function (response) {
                // the following line rejects the promise 
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            });
    }
});