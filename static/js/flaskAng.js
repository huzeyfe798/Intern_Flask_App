var app = angular.module("myApp",[]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//').endSymbol('//');
});


app.controller("myCtrl", function($scope, $http){

    $scope.change1 = function () {
        $http.post("/post",{'bookname': $scope.bookName,'authorname': $scope.authorName,'year': $scope.writtenYear,'favorite': $scope.favoVal,'read': $scope.readVal,'toberead': $scope.tobeVal}).then(successCallback, errorCallback);
        function successCallback(){
            console.log("Post successs");

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
        }
        function errorCallback(){
            console.log("Error");

        }

        $scope.changedatabase = function (a){

            var b = $scope.books.indexOf(a);

            $scope.books[b].toberead = false;
            $scope.books[b].read = true;

            $http.post("/postall",$scope.books).then(successCallback, errorCallback);
            function successCallback(){
                console.log("success")

            }
            function errorCallback(){
                console.log("Error");

            }

        }
        $scope.changedatabaseR = function (a){

            var b = $scope.books.indexOf(a);

            $scope.books[b].favorite = true;

            $http.post("/postall",$scope.books).then(successCallback, errorCallback);
            function successCallback(){
                console.log("success")

            }
            function errorCallback(){
                console.log("Error");

            }

        }
        $scope.deleteBook = function (a){

            var b = $scope.books.indexOf(a);

            $scope.books.splice(b,1);

            $http.post("/postall",$scope.books).then(successCallback, errorCallback);
            function successCallback(){
            console.log("success")

            }
            function errorCallback(){
                console.log("Error");

            }

        }




});


