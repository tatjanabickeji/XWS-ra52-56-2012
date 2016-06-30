angular.module('MyApp')
.service('TaskService', function($http){
	return{
        
        getTasks: function(onSuccess,onError) {
            
            var req = {
                method : "GET",
                url: "/TaskService/tasks/",
                headers: {
                     'Content-Type': "application/json"
                         }
             }	

		    $http(req).then(onSuccess, onError);
        },
		
        getTask: function(onSuccess, onError,taskId){
		
		    var req = {
                method : "GET",
                url: "/TaskService/tasks/"+taskId,
                headers: {
                     'Content-Type': "application/json"
                         }
             }	

		    $http(req).then(onSuccess, onError);
	    },
    
        addTask : function(onSuccess,onError,data,projectId) {
        
            var req = {
              method : "POST",
               url: "/TaskService/task/"+projectId,
              headers: {
                     'Content-Type': "application/json"
                     },
              data : data
            }
        
          $http(req).then(onSuccess, onError);
        
        },
    
        changeTask : function(onSuccess,onError,data,taskId) {
            
            var req = {
                method : "POST",
                url: "/TaskService/changeTask/"+taskId,
                headers: {
                        'Content-Type': "application/json"
                        },
                data : data
            }
            
            $http(req).then(onSuccess, onError);
        }
    
  }
});