'use strict';

angular.module('MyApp')
    .controller('SignOutController', function ($scope, AuthService, $location, $state) {

		//button clicked
	    $scope.signout = function(){

		   AuthService.signout(
			   function(response){
				   console.log(response.data.msg);
				   	$state.go('login');
			   }
			   ,function(response){
					console.log(response.data.msg);
			   });
  		};



    });