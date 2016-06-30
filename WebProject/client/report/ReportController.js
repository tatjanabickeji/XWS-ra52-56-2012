(function(){
    var app = angular.module("MyApp");
    
    var ReportController = function ($scope,$rootScope, ProjectService,TaskService ,$http,$window) {
        
        var totalTasks = [];
        $scope.curUser = {};
         var onSuccess1 = function(response){	  
            $scope.projects = response.data;
	     };
		
        var onError1 = function(response){
            console.log(response.data);
            //alertifyy.error("ERROR");
        }
        
         $scope.getProjects = function () {
             ProjectService.getProjects(onSuccess1,onError1);    
         }
         
         $scope.setUser = function () {
             if ($scope.curUser) {
                  /// 5. IZVESTAJ
                
                var data5 = [];
                var now = new Date();
                var daysOfYear = [];
                
                for (var d = new Date($scope.curProject.createdAt); d <= now; d.setDate(d.getDate() + 1)) {
                    var completedOnThisDay = 0;
                    daysOfYear.push(d.getDate() + "/" + (d.getMonth()+1) + "/"+  d.getFullYear());
                    for (var i = 0; i < totalTasks.length; i++) {
                        var updatedAt = new Date(totalTasks[i].updatedAt);
                         if (d.getDate() == updatedAt.getDate() && 
                                d.getMonth() == updatedAt.getMonth() &&
                                d.getFullYear() == updatedAt.getFullYear()) {
                                
                                if (totalTasks[i].status.name == "Done" && totalTasks[i].assigned_to == $scope.curUser._id) {
                                    completedOnThisDay += 1;
                                }
                         }
                    }
                    data5.push(completedOnThisDay);   
                }
                
                
                
                    
                }
               $scope.labels5 = daysOfYear;
               $scope.data5 = [data5];
                /// KRAJ 5. IZVESTAJA
        }
         
         
         $scope.setProject = function () {
             if ($scope.curProject) {
                totalTasks = $scope.curProject.tasks;
                var usersOnProject = $scope.curProject.usersOnProject;
               
                var userInfo = [];
                /// 1. IZVESTAJ 
                                
                $scope.labels1 = usersOnProject.map(function(u){return u.username;});
                
                var data1 = [];
                for (var i = 0; i < usersOnProject.length; i++) {
                    var tasksForThisUser = [];
                    for (var j = 0; j < totalTasks.length; j++) {
                        if (usersOnProject[i]._id == totalTasks[j].assigned_to) {
                            tasksForThisUser.push(totalTasks[j]);
                        }
                    }
                    userInfo.push({userId : usersOnProject[i]._id, tasks : tasksForThisUser});
                    var percent = tasksForThisUser.length/totalTasks.length*100; 
                    data1.push(percent);    
                }
                var s = 0;
                for (var i in data1) {
                    s += data1[i];
                }
                // ako ima nedodeljenih zadataka
                if (s < 100) {
                    s = 100-s;
                    data1.push(s);
                    $scope.labels1.push("Unassigned");
                } 
                    
                
                $scope.data1 = data1;
                /// KRAJ 1. IZVESTAJA
                
                /// 2 IZVESTAJ
                $scope.labels2 = usersOnProject.map(function(u){return u.username;});
                var data2 = [];
                for (var i = 0; i < userInfo.length; i++) {
                    var completedTasks = 0;
                    for (var j = 0; j < userInfo[i].tasks.length; j++) {
                        if (userInfo[i].tasks[j].status.value == 3) {
                            completedTasks += 1;
                        } // STATUS DONE
                    }
                    var percentage = userInfo[i].tasks.length == 0 ? 0 : completedTasks/userInfo[i].tasks.length*100; 
                    data2.push(percentage);
                }
                 $scope.data2 = [data2];
                 $scope.options2 = { scaleOverride: true, scaleStartValue: 0, scaleSteps: 10, scaleStepWidth: 10 }
                /// KRAJ 2 IZVESTAJA
                //$scope.labels3 = usersOnProject.map(function(u){return u.username;});
                
                /// 3. IZVESTAJ
                var data3 = [];
                var now = new Date();
                var daysOfYear = [];
                for (var d = new Date($scope.curProject.createdAt); d <= now; d.setDate(d.getDate() + 1)) {
                    //var date = new Date(d);
                    var createdOnThisDay = 0;
                    daysOfYear.push(d.getDate() + "/" + (d.getMonth()+1) + "/"+  d.getFullYear());
                    for (var t = 0; t < totalTasks.length; t++) {
                        var createdAt = new Date(totalTasks[t].createdAt);
                        if (d.getDate() == createdAt.getDate() && 
                            d.getMonth() == createdAt.getMonth() &&
                            d.getFullYear() == createdAt.getFullYear()) {
                            createdOnThisDay += 1;        
                        }
                    }
                    
                    data3.push(createdOnThisDay);
                    
                }
                $scope.labels3 = daysOfYear;
                 $scope.data3 = [data3];
                /// KRAJ 3. IZVESTAJA
                
                /// 4. IZVESTAJ
                var data4 = [];
                var now = new Date();
                var daysOfYear = [];
                for (var d = new Date($scope.curProject.createdAt); d <= now; d.setDate(d.getDate() + 1)) {
                    //var date = new Date(d);
                    var completedOnThisDay = 0;
                    daysOfYear.push(d.getDate() + "/" + (d.getMonth()+1) + "/"+  d.getFullYear());
                    for (var i = 0; i < totalTasks.length; i++) {
                        var updatedAt = new Date(totalTasks[i].updatedAt);
                        if (totalTasks[i].status.name == "Done") {
                            if (d.getDate() == updatedAt.getDate() && 
                                d.getMonth() == updatedAt.getMonth() &&
                                d.getFullYear() == updatedAt.getFullYear()) {
                             
                                    completedOnThisDay += 1;        
                            }
                        }
                        
                    }
                    
                    data4.push(completedOnThisDay);
                    
                }
                $scope.labels4 = daysOfYear;
                $scope.data4 = [data4];
                /// KRAJ 4. IZVESTAJA
                
               
            }
         }
         
         
         
    }
    
    app.controller("ReportController", ReportController);
}());