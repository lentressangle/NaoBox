var app = angular.module('mediator', []);

app.controller('ListContentController', ['$scope','$window', '$http', ListContentController]);


function ListContentController($scope,$window,$http) {

    /*
        GET content list of root directory
    */
    adressEndpoint = "http://localhost:8000/api/content"
    $http({ method: 'GET', url: adressEndpoint + '/root' }).
      success(function (data, status, headers, config) {
        $scope.listFolder = data['data']['folder'];
        $scope.current = "root";
        $scope.root = true;
      });

    /*
        GET content list of clicked directory
    */
    $scope.goTo = function(relative_path, name) {
        adress = relative_path + name; // remove fisrt '/'
        $http({ method: 'GET', url: adressEndpoint + adress}).success(function (data, status, headers, config) {
            $scope.listFolder = data['data']['folder'];
            $scope.root = false;
            $scope.parent_path = data['data']['folder'][0][0]['parent_path'];
            if($scope.parent_path == "") {
                $scope.parent_path = "/root";
            }
        });
    }

    /*
        GET content of parent folder
    */
    $scope.previous = function(parent_path) {
        $scope.goTo(parent_path, '');
    }

}