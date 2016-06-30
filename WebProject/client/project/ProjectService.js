angular.module('MyApp')
.service('ProjectService', function($http){
	return{
		getProjects: function(onSuccess, onError){
		
		var req = {
                method : "GET",
                url: "/ProjectService/projects",
                headers: {
                     'Content-Type': "application/json"
                         }
            }	

		$http(req).then(onSuccess, onError);
		
		},
		
        addProject: function (onSuccess,onError,data) {
            
            var req = {
                method : 'POST',
                url: '/ProjectService/addProject',
                data : data,
                headers : {'Content-Type': "application/json"}
            }
            
         $http(req).then(onSuccess, onError);
        },
        getProject: function(onSuccess, onError,id){
		
		var req = {
                method : "GET",
                url: "/ProjectService/projects/"+id,
                headers: {
                     'Content-Type': "application/json"
                         }
            }	

		$http(req).then(onSuccess, onError);
		
		},
        
        getProjectForTask: function(onSuccess, onError,taskID){
		
		var req = {
                method : "GET",
                url: "/ProjectService/getProjectForTask/"+taskID,
                headers: {
                     'Content-Type': "application/json"
                         }
            }	

		$http(req).then(onSuccess, onError);
		
		},
        
		setUsersOnProject: function (onSuccess,onError,projectId,data) {
            var req = {
                method : "POST",
                url : '/ProjectService/setUsersOnProject/'+projectId,
                data : data,
                headers : {'Content-Type': "application/json"}
            }
            
           $http(req).then(onSuccess,onError);
        }
		
			

	}
});