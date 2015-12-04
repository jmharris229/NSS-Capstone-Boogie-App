app.factory("Authref", ["$firebaseAuth",
	function($firebaseAuth){
		var ref = new Firebase("https://boogie.firebaseio.com");
		return ref;
	}
]);