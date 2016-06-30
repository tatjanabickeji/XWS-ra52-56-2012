angular.module('MyApp')
.service('UserService', function($http){
	return{
		getAllUsers: function(onSuccess, onError){
		
		var req = {
                method : "GET",
                url: "/UserService/users",
                headers: {
                     'Content-Type': "application/json"
                         }
            }	

		$http(req).then(onSuccess, onError);
		
		}
	}
});