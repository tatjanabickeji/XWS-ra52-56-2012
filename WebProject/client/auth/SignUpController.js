(function() {
    var app = angular.module("MyApp");
	
	app.controller(
         
    'SignUpController',function($scope, $state, AuthService) {
        
		var onSuccess = function(response){	  
			console.log(response.data);
			if(response.data.success==true){
				//alertifyy.success("Uspesno ste se prijavili!");
				$state.go('main');
			}else{
				//alertifyy.error("ERROR");
			}

		};
		
		var onError = function(response){
			console.log(response.data);
			//alertifyy.error("ERROR");
		}
			   
        $scope.signup = function(){
           if ($scope.password !== $scope.password2) {
               alert("Repeated password doesn't match original!");
           }
           else {
               AuthService.signup(
			   $scope.username, 
			   $scope.password, 
			   onSuccess
			   ,onError);
           }
  		};
    });
}());