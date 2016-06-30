(function() {
    var app = angular.module("MyApp");
    
    app.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');
    $stateProvider.state('main', 
        {//naziv stanja!
        url: '/main',
        views: {
            header:{
                templateUrl: 'header/headerL.html',
                controller: 'AuthController'
            },
            content: {
              templateUrl: 'dashboard/dashboard.html',
              controller: 'DashboardController'
            }
        }
        })
        .state('login',{//naziv stanja!
        url: '/login',
        views: {
            header:{
                templateUrl: 'header/headerNL.html',
                controller: 'AuthController'
            },
            content: {
              templateUrl: 'auth/templates/signUp.html',
              controller: 'SignUpController'
            }
        }            
        })  
        .state('projects',{//naziv stanja!
        url: '/projects',
        views: {
            header:{
                templateUrl: 'header/headerL.html',
                controller: 'AuthController'
            },
            content: {
              templateUrl: 'project/templates/projects.html',
              controller: 'ProjectsController'
            }
        }            
        })
        .state('project',{//naziv stanja!
        url: '/projects/:projectId',
        views: {
            header:{
                templateUrl: 'header/headerL.html',
                controller: 'AuthController'
            },
            content: {
              templateUrl: 'project/templates/project.html',
              controller: 'ProjectController'
            }
        }            
        })
        .state('task', {
            url: '/projects/:projectId/tasks/:taskId',
            views: {
                header:{
                    templateUrl: 'header/headerL.html',
                    controller: 'AuthController'
                },
                content: {
                    templateUrl: 'task/templates/task.html',
                    controller: 'TaskController'
                }
            }  
        }
            
        )
        .state('reports', {
            url: '/reports',
            views: {
                header:{
                    templateUrl: 'header/headerL.html',
                    controller: 'AuthController'
                },
                content: {
                    templateUrl: 'report/reports.html',
                    controller: 'ReportController'
                }
            }  
        });
    });
}())