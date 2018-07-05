var app = angular.module("myApp",[]);



app.controller("myCtrl", function($scope, $http){

    $scope.change1 = function () {
        $http.post("/lang",{'bookname': $scope.bookName,'authorname': $scope.authorName,'year': $scope.writtenYear}).then(successCallback, errorCallback);
        function successCallback(){
            $scope.lastName = "Your information saved";

        }
        function errorCallback(){
            console.log("Error");

        }

    };
});


