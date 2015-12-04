var app = angular.module('mediator', []);

app.controller('ListContentController', ['$scope','$window', '$http', ListContentController]);
app.controller('CreateFolderController', ['$scope','$window', '$http', CreateFolderController]);


/*** Can list and browse files ans folders ***/

function ListContentController($scope,$window,$http) {

    /*
        GET content list of root directory
    */
    adressEndpoint = "http://localhost:8000/api/content/";
    $http({ method: 'GET', url: adressEndpoint + 'root/1/' }).
      success(function (data, status, headers, config) {
        $scope.listFolder = data.data.folder;
        $scope.current = "root";
        $scope.root = true;
        $scope.pager = data.data.pager;
      });

    /*
        GET content list of clicked directory
    */
    $scope.goTo = function(relative_path, name) {
        adress = relative_path.replace(/^\//, '') + encodeURIComponent(name); // remove first '/'
        $http({ method: 'GET', url: adressEndpoint + adress + '/1/'}).success(function (data, status, headers, config) {
            $scope.listFolder = data.data.folder;
            $scope.root = false;
            $scope.parent_path = data.data.folder[0][0].parent_path;
            $scope.pager = data.data.pager;
            if($scope.parent_path === "") {
                $scope.parent_path = "/root";
            }
            $scope.current_path = adress;
        });
    };

    /*
        GET content of parent folder
    */
    $scope.previous = function(parent_path) {
        $scope.goTo(parent_path, '');
    }
}


/*** Can create an folder in current path ***/

function CreateFolderController($scope,$window,$http) {


    /*
        to create a new folder in current path
    */
    $scope.create_folder = function(name, path) {
        console.log(path + "/" + name);
        adressEndpoint = "http://localhost:8000/api"
        $http.post(adressEndpoint + "/fileops/create_folder", {path: path + "/" + name }).success(function(data, status, headers, config) {
            console.log(data);
        });
    }
}
