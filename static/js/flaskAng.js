var app = angular.module("myApp",[]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//').endSymbol('//');
});


app.controller("myCtrl", function($scope, $http){

    $scope.change1 = function () {
        $http.post("/post",{'imageURL':$scope.imageURL,'bookname': $scope.bookName,'authorname': $scope.authorName,'year': $scope.writtenYear,'favorite': $scope.favoVal,'read': $scope.readVal,'toberead': $scope.tobeVal}).then(successCallback, errorCallback);
        function successCallback(){
            console.log("Post successs");

        }
        function errorCallback(){
            console.log("Error");

        }

    };
});


app.controller("myCtrlFav", function($scope, $http){
        var req_prefix = "https://www.googleapis.com/books/v1/volumes?q=";


        $scope.result_books = [];



    $scope.searchBooks = function(){

            var contr = false;
            if($scope.query == "" || $scope.query == undefined) {

                return;
            }

            $("#search-box").hide();
            $("#loading-box").show();


            for(x in $scope.books){

                if($scope.query == $scope.books[x].bookname){
                  contr = true;
                }
            }
            if(contr){
                $scope.filterData = function(item){
                    return item.bookname == $scope.query;
                }
                $("#search-box").show();
                $("#loading-box").hide();
            }
            else{
                var request = req_prefix + $scope.query;

                $http.get(request).then(successCallback, errorCallback);
                3
                function successCallback(resp){
                    if(resp.data.items && resp.data.items.length > 0){
                        $scope.result_books = resp.data.items;
                        $("#msg").text("");
                    }
                    else{
                        $("#msg").text("No Results");
                    }

                    $("#search-box").show();
                    $("#loading-box").hide();

                }
                function errorCallback(){
                    console.log("Error");
                    $("#search-box").show();
                    $("#loading-box").hide();
                }


            }
        }


        $scope.clearResults = function() {
            $scope.result_books = [];
            $scope.filterData = function(){
                return true;
            }
            $scope.query = '';
            $("#query").text( "" );
        }

        $scope.addBook = function(b){

            var create = {};
            if(b.volumeInfo.hasOwnProperty('imageLinks')){
                create['imageURL']= b.volumeInfo.imageLinks.thumbnail;
            }else{
                create['imageURL']= "";
            }
            if(b.volumeInfo.hasOwnProperty('title')){
                create['bookname']= b.volumeInfo.title;
            }else{
                create['bookname']= "";
            }
            if(b.volumeInfo.hasOwnProperty('authors')){
                create['authorname']= b.volumeInfo.authors[0];
            }else{
                create['authorname']= "";
            }
            if(b.volumeInfo.hasOwnProperty('publishedDate')){
                create['year']= b.volumeInfo.publishedDate;
            }else{
                create['year']= "";
            }
            create['read']= "false";
            create['favorite']= "false";
            create['toberead']= "true";

            $scope.books.push(create);
            $http.post("/post",create ).then(successCallback, errorCallback);
            function successCallback(){
                console.log("Post successs");

            }
            function errorCallback(){
                console.log("Error");

            }



        }




        // if atılcak
        $http.get('/jsondatas').then(successCallback, errorCallback);

        function successCallback(datas){
          $scope.books = datas.data;
        }
        function errorCallback(){
            console.log("Error");

        }

        $scope.showBook = function(book) {
            $scope.current_book = book;
            $("#myModal").modal("show");
        }

        $scope.sendtoread = function (a){

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
        $scope.sendtofav = function (a){

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
        $scope.removeFav= function (a){

            var b = $scope.books.indexOf(a);

            $scope.books[b].favorite = false;

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


