angular.module('MyApp')
.service('AuthService', function($http){
	return{
		signin: function(username, password, onSuccess, onError){
		
		var req = {
                method : "POST",
                url: "/AuthService/signIn",
                headers: {
                     'Content-Type': "application/json"
                         },
                data: {"username" : username, "password" : password}
            }	

		$http(req).then(onSuccess, onError);
		
		},
		signup: function(username, password, onSuccess, onError){

		var req = {
		    method: 'POST',
		    url: '/AuthService/signUp',
		    headers: {
		        'Content-Type': 'application/json'
		    },
		    data: { 
		    	username: username,
		    	password: password
		    }
		}
		$http(req).then(onSuccess, onError);

		},
        signout: function(onSuccess, onError){

		var req = {
		    method: 'POST',
		    url: '/AuthService/signOut'
		}	

		$http(req).then(onSuccess, onError);

        },
        authenticate: function(onSuccess, onError){
        
        var req = {
		    method: 'GET',
		    url: '/AuthService/auth'
		}	

		$http(req).then(onSuccess, onError);
		

        }
	}
});