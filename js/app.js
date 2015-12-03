var app = angular.module('mediator', []);

app.controller('ListContentController', ['$scope','$window', '$http', ListContentController]);


function ListContentController($scope,$window,$http) {

    /*
        GET content list of root directory
    */
    adressEndpoint = "http://localhost:8000/api/content/"
    $http({ method: 'GET', url: adressEndpoint + 'root' }).
      success(function (data, status, headers, config) {
        console.log(data['data']['folder']);
        $scope.listFolder = data['data']['folder'];
      });

    /*
        GET content list of clicked directory
    */
    $scope.goTo = function(folder) {
        console.log(folder);
        $http({ method: 'GET', url: adressEndpoint + folder['relative_path'].substring(1) + "/" + folder['name'] }).success(function (data, status, headers, config) {
            console.log(data['data']['folder']);
            $scope.listFolder = data['data']['folder'];
        });

    }

}