var app = angular.module("myApp",[]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//').endSymbol('//');
});


app.controller("myCtrl", function($scope, $http){

    $scope.change1 = function () {
        $http.post("/lang",{'bookname': $scope.bookName,'authorname': $scope.authorName,'year': $scope.writtenYear,'favorite': $scope.favoVal,'read': $scope.readVal,'toberead': $scope.tobeVal}).then(successCallback, errorCallback);
        function successCallback(){
            $scope.lastName = "Your information saved";
            console.log($scope.favoVal + " " + $scope.tobeVal)

        }
        function errorCallback(){
            console.log("Error");

        }

    };
});


app.controller("myCtrlFav", function($scope, $http){

        $http.get('/jsondatas').then(successCallback, errorCallback);

        function successCallback(datas){
          $scope.books = datas.data;
          console.log(data);
        }
        function errorCallback(){
            console.log("Error");

        }


});


