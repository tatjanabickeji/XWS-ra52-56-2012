angular.module('MyApp')
.service('CommentService', function($http){
	return{
		
        getComments: function(onSuccess, onError,taskId){
		
		    var req = {
                method : "GET",
                url: "/CommentService/comments/"+taskId,
                headers: {
                     'Content-Type': "application/json"
                         }
             }	

		    $http(req).then(onSuccess, onError);
	    },
    
        addComment : function(onSuccess,onError,data,taskId) {
        
            var req = {
              method : "POST",
               url: "/CommentService/addComment/"+taskId,
              headers: {
                     'Content-Type': "application/json"
                     },
              data : {text:data}
            }
        
          $http(req).then(onSuccess, onError);
        
        },
    
        changeComment : function(onSuccess,onError,data) {
            
            var req = {
                method : "POST",
                url: "/CommentService/changeComment",
                headers: {
                        'Content-Type': "application/json"
                        },
                data : data
            }
            
            $http(req).then(onSuccess, onError);
        },
        
        deleteComment : function(onSuccess,onError,data,commentId) {
            
            var req = {
                method : "Delete",
                url: "/CommentService/comment/"+commentId,
                headers: {
                        'Content-Type': "application/json"
                        },
                data : data
            }
            
            $http(req).then(onSuccess, onError);
        }
    
  }
});