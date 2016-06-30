(function() {
    var app = angular.module("MyApp");
    app.controller("HeaderController",function HeaderController($scope, $state) 
        { 
            $scope.isActive = function (viewLocation) { 
                return viewLocation === $state.current.name;
            };
        })
}())
