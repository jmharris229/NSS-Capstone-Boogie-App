app.service("bitreq", function ($http, $q) {
 
    var deferred = $q.defer();
 
    this.getResults = function () {
        return $http.jsonp('http://api.bandsintown.com/artists/Phish/events.json?api_version=2.0&app_id=YOUR_APP_ID'+ '&callback=JSON_CALLBACK')
            .then(function (response) {
                // promise is fulfilled
                console.log(response.data)
                deferred.resolve(response.data);
                // promise is returned
                return deferred.promise;
            }, function (response) {
                // the following line rejects the promise 
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            })
        ;
    };
});