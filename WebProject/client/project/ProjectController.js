(function(){
    var app = angular.module("MyApp");
    
    var ProjectController = function ($scope, ProjectService, UserService,$window, $http,$stateParams) {
        
        //Vraca projekat za dati id
        
        var projectId = $stateParams.projectId;
        $scope.team = {};
        
        var onSuccess = function(response){	  
            $scope.project = response.data;
            $scope.team.team = $scope.project.usersOnProject;
	    };
		
        var onError = function(response){
            console.log(response.data);
            //alertifyy.error("ERROR");
        }
        
        $scope.getProject = function () {
              ProjectService.getProject(onSuccess,onError,projectId);
               
        }
        
        // trazi sve korisnike
        
        var onSuccess2 = function(response){	  
            $scope.allUsers = response.data;
	    };
		
        var onError2 = function(response){
            console.log(response.data);
            //alertifyy.error("ERROR");
        }
        $scope.getAllUsers = function() {
            UserService.getAllUsers(onSuccess2,onError2);
            //alert(JSON.stringify($scope.STATUS));
        }
        
        //Setovanje usersa za projekat
        var onSuccess3 = function (response) {
            $scope.team.team = response.data.usersOnProject;
            //$scope.project.usersOnProject = $scope.team;
            alert("Successfully set team");
            $window.location.reload();
        }
        
        var onError3 = function(response){
            console.log(response.data);
            //alertifyy.error("ERROR");
        }
        
        
        $scope.setUsersOnProject = function () {
            console.log($scope.team);
            var teamIDs = $scope.team.team.map(function(user) { return user._id;});
            ProjectService.setUsersOnProject(onSuccess3,onError3,projectId, teamIDs);
                
                        
        }
        
        //Reset usersa za project na stranici
        
        $scope.resetUsersOnProject = function () {
            $scope.team.team = $scope.project.usersOnProject;
        }
        

    }
    
    app.controller("ProjectController",ProjectController);
}());