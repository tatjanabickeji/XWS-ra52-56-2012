(function(){
    var app = angular.module("MyApp");
    
    var TaskController = function ($scope, TaskService,ProjectService,UserService, $http,$stateParams,$window) {
        
       
        var projectId = $stateParams.projectId;
        var taskId = $stateParams.taskId;
        
         
        //vraca projekat kome pripada ovaj task
         var onSuccess0 = function(response){	  
            $scope.project = response.data;
	    };
        var onError0 = function(response){
            console.log(response.data);
            //alertify.error("ERROR");
        };
        $scope.getProject = function () {
            ProjectService.getProject(onSuccess0, onError0, projectId);
        }
        
       
        
        
        //Vraca task za dati id
        var onSuccess = function(response){	  
            $scope.task = response.data;
            
            var taskC = {};
            taskC.title = $scope.task.title;
            taskC.description = $scope.task.description;
            taskC.status = $scope.task.status;
            taskC.priority = $scope.task.priority;
            taskC.deadline = new Date($scope.task.deadline);
            taskC.assigned_to = $scope.task.assigned_to;
            
            $scope.taskChange = taskC;
            
	    };
		
        var onError = function(response){
            console.log(response.data);
            //alertify.error("ERROR");
        };
        
        $scope.getTask = function () {
              TaskService.getTask(
                  onSuccess,
                  onError,
                  taskId
                  );
        };
        
        //Dodavanje Taska
        
         var onSuccess1 = function(response) {
            //$scope.project = response.data;
            $window.location.reload();
        };
        
         var onError1 = function(response){
            console.log(response.data);
            //alertify.error("ERROR");
        };
        
        $scope.addTask = function () {
            if ($scope.newTask.assigned_to == undefined) {
                $scope.newTask.assigned_to = null;
            }
            
            var now = new Date();
            var deadline = new Date($scope.newTask.deadline);
            if( deadline < now){
                alert('Chosen deadline is in the past. Try again.');            
            }
            else if (deadline > new Date($scope.project.deadline)){
                alert('Chosen deadline exceeds the deadline of project. Try again.');
            }
            else {
              TaskService.addTask(
              onSuccess1,
              onError1,
              $scope.newTask,
              projectId
              );  
            }
              
               
        };
        
        // Izmena Taska
        
        var onSuccess2 = function(response) {
            $scope.task = response.data;
            alert("Succesfully edited task")
        };
         var onError2 = function(response){
            console.log(response.data);
            //alertify.error("ERROR");
        };
        
        $scope.changeTask = function () {
           
           //Ukoliko se nista ne promeni da ne cuva bez veze
           //novu verziju.
              
           var taskCh = $scope.taskChange;
           var changes = false;
           
           var now = new Date();
            var deadline = new Date(taskCh.deadline);
            if( deadline < now){
                alert('Chosen deadline is in the past. Try again.');            
            }
            else if (deadline > new Date($scope.project.deadline)){
                alert('Chosen deadline exceeds the deadline of project. Try again.');
            }
           else {
            for(var prop_i in $scope.taskChange){
               if (!changes) {
                   for(var prop_j in $scope.task){
                        if(prop_i == prop_j){
                            if (prop_i == "status" || prop_i == "priority") {
                                if ($scope.taskChange[prop_i].value != $scope.task[prop_j].value) {
                                    changes = true;
                                }
                            }
                            else if (prop_i == "assigned_to") {
                                if ($scope.taskChange[prop_i] == null && $scope.task[prop_j] == null) {
                                    
                                }
                                else if ($scope.taskChange[prop_i] == null || $scope.task[prop_j] == null) {
                                    changes = true;
                                }
                                else if ( typeof $scope.task[prop_j] === 'string') {
                                    changes = !($scope.taskChange[prop_i]._id == $scope.task[prop_j]); 
                                }
                                else if ($scope.taskChange[prop_i].username != $scope.task[prop_j].username) {
                                    changes = true;
                                } 
                            }
                            else {
                                if(JSON.stringify($scope.taskChange[prop_i]) != JSON.stringify($scope.task[prop_j])) {
                                    changes = true;   
                                }
                            }
                            break;
                        }
                    }
               }
               else break;
           }
           if(!changes){
               alert('No changes!');
           }
           else{
               
               TaskService.changeTask(
                    onSuccess2,
                    onError2,
                    taskCh,
                    taskId
                    );
           }    
           }
           
           
        };
        
    }
    
    app.controller("TaskController",TaskController);
}());