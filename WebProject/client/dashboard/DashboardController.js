(function(){
    var app = angular.module("MyApp");
    
    var DashboardController = function ($scope,$rootScope, ProjectService,TaskService ,$http,$window) {
         $scope.projectIds = [];
        // getTasks method
         var onSuccess1 = function(response){	  
         $scope.tasks = response.data;
	      	};
		
	      	var onError1 = function(response){
	     		console.log(response.data);
	    		//alertifyy.error("ERROR");
		      }
          
          $scope.getTasks = function () {
              TaskService.getTasks(onSuccess1,onError1);    
          }
          
          //$scope.getProjects();
          //end with getProjects method
        
        //addProject method
         var onSuccess2 = function(response){
           //$scope.getProjects();
            //alert('Uspesno dodat projekat');
            //$window.location.reload();
            $scope.projectIds.push(response.data._id);
	      	};
		
	      	var onError2 = function(response){
	     		console.log(response.data);
	    		//alertifyy.error("ERROR");
		      }
          
          $scope.getProjectForTask = function (taskId) {
              ProjectService.getProjectForTask(
                onSuccess2,
                onError2,
                taskId
                );    
          };
        
        
        $scope.filter = function (task) {
            var filter = $scope.taskFilter;
            if (filter == null) {
                return true;
            }
            return (
            filter.priority == null ||
            filter.priority.length == 0 || 
            filter.priority.
            map(function(p) { return p.value;}).
                indexOf(task.priority.value) != -1)
            &&
               (
            filter.status == null ||
            filter.status.length == 0 || 
            filter.status.
            map(function(s) { return s.value;}).
                indexOf(task.status.value) != -1);
        }
       
    };

    app.controller("DashboardController", DashboardController);
    
}());