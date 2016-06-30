(function(){
    var app = angular.module("MyApp");
    
    var CommentController = function ($scope,CommentService,TaskService,ProjectService,UserService, $http,$stateParams) {
        
        //$scope.editMode = false;
        $scope.commentChange = {};
        ///var projectId = $stateParams.projectId;
        var taskId = $stateParams.taskId;
        
         //Vraca komentare za dati taskId
        
        var onSuccess = function(response){	  
          //  $scope.comments = response.data;
	    };
		
        var onError = function(response){
            console.log(response.data);
            alertify.error("ERROR");
        };
        
        $scope.getComments = function () {
              CommentService.getComments(
                  onSuccess,
                  onError,
                  taskId
                  );
        };
        
        //Dodavanje komentara
        
         var onSuccess1 = function(response) {
            $scope.task = response.data;
            delete $scope.newComment;
        };
        
         var onError1 = function(response){
            console.log(response.data);
            alertify.error("ERROR");
        };
        
        $scope.addComment = function () {
              CommentService.addComment(
              onSuccess1,
              onError1,
              $scope.newComment,
              taskId
              );
               
        };
        
        // Izmena komentara
        
        var onSuccess2 = function(response) {
            // u response je promenjeni komentara
            // task na scope-u mora da se update-uje
            var comment = response.data;
            for (var i = 0; i < $scope.task.comments.length; i++) {
                if ($scope.task.comments[i]._id === comment._id) {
                    $scope.task.comments[i].text = comment.text;
                    break;
                }
            }
        };
         var onError2 = function(response){
            console.log(response.data);
            //alertify.error("ERROR");
        };
        
        $scope.changeComment = function (comment, commentChangeText) {
               
               var data = {commentID:comment._id, text:commentChangeText};
               CommentService.changeComment(
                    onSuccess2,
                    onError2,
                    data
               )
              $scope.disableEditMode(comment);
        };
        
        $scope.enableEditMode = function (comment) {
            comment.editMode = true;
            $scope.commentChange.text = comment.text;
            //$scope.editMode = true;
            
        }
        
        
        $scope.disableEditMode = function (comment) {
            comment.editMode = false;
            //$scope.editMode = false;
        }
        
         // Brisanje komentara
        
        var onSuccess3 = function(response) {
            $scope.task = response.data;
        };
         var onError3 = function(response){
            console.log(response.data);
            alertify.error("ERROR");
        };
        
        $scope.deleteComment = function (commentId) {
               
               var data = {'taskID' : taskId}; 
                       
               CommentService.deleteComment(
                    onSuccess3,
                    onError3,
                    data,
                    commentId
               )
           
        };
        
        
    }
    
    app.controller("CommentController",CommentController);
}());