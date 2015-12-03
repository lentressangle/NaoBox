var app = angular.module('mediator', []);

app.controller('ListContentController', ['$scope','$window', '$http', ListContentController]);


function ListContentController($scope,$window,$http) {
    adressEndpoint = "http://localhost:8000/api"
    $http({ method: 'GET', url: adressEndpoint + '/content/root' }).
      success(function (data, status, headers, config) {
        console.log(data['data']['folder']);
        $scope.listFolder = data['data']['folder'];
      });
}