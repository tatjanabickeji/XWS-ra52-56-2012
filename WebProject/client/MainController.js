(function() {
	
			
    var app = angular.module("MyApp",["ui.router", "ui.multiselect","chart.js"]);
         
    var MainController = function($scope, $rootScope, $http, AuthService, $location,$state) {
        
		
		
        var onSuccess = function(response){	  
			console.log(response.data);
			if(response.data.success==true){
				//alertifyy.success("WELCOME!");
				$rootScope.user = response.data.user;
			}else{
				//alertifyy.error("ERROR");
                $state.go('login');
			}

		};
		
		var onError = function(response){
			console.log(response.data);
			//alertifyy.error("ERROR");
		}
        
          AuthService.authenticate(onSuccess,onError);
    }

    app.run(function($rootScope, $http) {
		$http.get('/status').success(function(data) {
			$rootScope.STATUS = data;
		})
		
		$http.get('/priority').success(function(data) {
			$rootScope.PRIORITY = data;
		})
	}).controller("MainController",MainController);
    
    
}());