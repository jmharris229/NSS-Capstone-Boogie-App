app.factory("Authref", ["$firebaseAuth",
	function($firebaseAuth){
		var ref = new Firebase("https://boogie.firebaseio.com");
		return ref;
	}
]);

app.factory("fireAuth", ["$firebaseAuth",
	function($firebaseAuth) {
		return new Firebase("https://boogie.firebaseio.com");
	}
]);