app.controller('logOutCtrl', 
	['fireAuth',
	'$location',
	function(){
			this.logout = function(){
			boogieref.unauth();
			$location.path('/#/')
		}
})