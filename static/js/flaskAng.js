var app = angular.module("myApp",[]);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//').endSymbol('//');
});


app.controller("myCtrl", function($scope, $http){

    $scope.change1 = function () {
        $http.post("/post",{'imageURL':$scope.imageURL,'bookname': $scope.bookName,'authorname': $scope.authorName,'year': $scope.writtenYear,'favorite': $scope.favoVal,'read': $scope.readVal,'toberead': $scope.tobeVal}).then(successCallback, errorCallback);
        function successCallback(resp){

            $scope.backmsg = resp.data['status'];
            $.notify({
                // options
                icon: 'glyphicon glyphicon-warning-sign',
                message: $scope.backmsg
            },{
                // settings
                type: 'success',
                allow_dismiss: true,
                placement: {
                    from: "bottom",
                    align: "center"
                },
                offset: 20,
                spacing: 10,
                z_index: 1031,
                delay: 5000,
                timer: 1000,
                animate: {
                    enter: 'animated fadeInUp',
                    exit: 'animated fadeOutDown'
                }

            });

        }
        function errorCallback(resp){
            $scope.backmsg = resp.data['status'];
            $.notify({
                // options
                icon: 'glyphicon glyphicon-warning-sign',
                message: $scope.backmsg
            },{
                // settings
                type: 'danger',
                allow_dismiss: true,
                placement: {
                    from: "bottom",
                    align: "center"
                },
                offset: 20,
                spacing: 10,
                z_index: 1031,
                delay: 5000,
                timer: 1000,
                animate: {
                    enter: 'animated fadeInUp',
                    exit: 'animated fadeOutDown'
                }

            });

        }

    };
});


app.controller("myCtrlFav", function($scope, $http){
        var req_prefix = "https://www.googleapis.com/books/v1/volumes?q=";


        $scope.result_books = [];


    $http.get('/jsondatas').then(successCallback, errorCallback);

    function successCallback(datas){
        $scope.books = datas.data;
    }
    function errorCallback(resp){
        $scope.backmsg = resp.data['status'];
        $.notify({
            // options
            icon: 'glyphicon glyphicon-warning-sign',
            message: $scope.backmsg
        },{
            // settings
            type: 'danger',
            allow_dismiss: true,
            placement: {
                from: "bottom",
                align: "center"
            },
            offset: 20,
            spacing: 10,
            z_index: 1031,
            delay: 5000,
            timer: 1000,
            animate: {
                enter: 'animated fadeInUp',
                exit: 'animated fadeOutDown'
            }

        });


    }

    $scope.filterBe = function(item){
        return (item[6] == "true");
    }
    $scope.filterFav = function(item){
        return (item[5] == "true");
    }
    $scope.filterRe = function(item){

        return (item[4] == "true");
    }



    $scope.searchBooks = function(){

            var contr = false;
            if($scope.query == "" || $scope.query == undefined) {

                return;
            }

            $("#search-box").hide();
            $("#loading-box").show();


            for(x in $scope.books){

                if($scope.query == $scope.books[x][0]){
                  contr = true;
                }
            }
            if(contr){
                $scope.filterData = function(item){
                    return item[0] == $scope.query;
                }
                $("#search-box").show();
                $("#loading-box").hide();
            }
            else{
                var request = req_prefix + $scope.query;

                $http.get(request).then(successCallback, errorCallback);

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
            var createfake = {};
            if(b.volumeInfo.hasOwnProperty('imageLinks')){
                create['imageURL']= b.volumeInfo.imageLinks.thumbnail;
                createfake[3]= b.volumeInfo.imageLinks.thumbnail;
            }else{
                create['imageURL']= "";
                createfake[3]= "";
            }
            if(b.volumeInfo.hasOwnProperty('title')){
                create['bookname']= b.volumeInfo.title;
                createfake[0]= b.volumeInfo.title;
            }else{
                create['bookname']= "";
                createfake[0]= "";
            }
            if(b.volumeInfo.hasOwnProperty('authors')){
                create['authorname']= b.volumeInfo.authors[0];
                createfake[1]= b.volumeInfo.authors[0];
            }else{
                create['authorname']= "";
                createfake[1]= "";
            }
            if(b.volumeInfo.hasOwnProperty('publishedDate')){
                create['year']= b.volumeInfo.publishedDate;
                createfake[2]= b.volumeInfo.publishedDate;
            }else{
                create['year']= "";
                createfake[2]= "";
            }
            create['read']= "false";
            createfake[4]= "false";
            create['favorite']= "false";
            createfake[5]= "false";
            create['toberead']= "true";
            createfake[6]= "true";

            $scope.books.push(createfake);
            $http.post("/post",create ).then(successCallback, errorCallback);
            function successCallback(resp){
                $scope.backmsg = resp.data['status'];
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: $scope.backmsg
                },{
                    // settings
                    type: 'success',
                    allow_dismiss: true,
                    placement: {
                        from: "bottom",
                        align: "center"
                    },
                    offset: 20,
                    spacing: 10,
                    z_index: 1031,
                    delay: 5000,
                    timer: 1000,
                    animate: {
                        enter: 'animated fadeInUp',
                        exit: 'animated fadeOutDown'
                    }

                });

            }
            function errorCallback(resp3){
                $scope.backmsg = resp.data['status'];
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: $scope.backmsg
                },{
                    // settings
                    type: 'danger',
                    allow_dismiss: true,
                    placement: {
                        from: "bottom",
                        align: "center"
                    },
                    offset: 20,
                    spacing: 10,
                    z_index: 1031,
                    delay: 5000,
                    timer: 1000,
                    animate: {
                        enter: 'animated fadeInUp',
                        exit: 'animated fadeOutDown'
                    }

                });

            }



        }






        $scope.showBook = function(book) {
            $scope.current_book = book;
            $("#myModal").modal("show");
        }

        $scope.sendtoread = function (a){

            var b = $scope.books.indexOf(a);

            $scope.books[b][6] = false;
            $scope.books[b][4] = true;

            var databook = {
                name : $scope.books[b][0], year : $scope.books[b][2]
            };


            $http.post("/sendtoread",databook).then(successCallback, errorCallback);
            function successCallback(resp){
                $scope.backmsg = resp.data['status'];
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: $scope.backmsg
                },{
                    // settings
                    type: 'success',
                    allow_dismiss: true,
                    placement: {
                        from: "bottom",
                        align: "center"
                    },
                    offset: 20,
                    spacing: 10,
                    z_index: 1031,
                    delay: 5000,
                    timer: 1000,
                    animate: {
                        enter: 'animated fadeInUp',
                        exit: 'animated fadeOutDown'
                    }

                });

            }
            function errorCallback(resp){
                $scope.backmsg = resp.data['status'];
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: $scope.backmsg
                },{
                    // settings
                    type: 'danger',
                    allow_dismiss: true,
                    placement: {
                        from: "bottom",
                        align: "center"
                    },
                    offset: 20,
                    spacing: 10,
                    z_index: 1031,
                    delay: 5000,
                    timer: 1000,
                    animate: {
                        enter: 'animated fadeInUp',
                        exit: 'animated fadeOutDown'
                    }

                });

            }

        }
        $scope.sendtofav = function (a){

            var b = $scope.books.indexOf(a);

            var databook = {
                name : $scope.books[b][0], year : $scope.books[b][2],fav:$scope.books[b][5]
            };

            $scope.books[b][5] = true;





            $http.post("/sendtofav",databook).then(successCallback, errorCallback);
            function successCallback(resp){
                $scope.backmsg = resp.data['status'];
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: $scope.backmsg
                },{
                    // settings3
                    type: 'success',
                    allow_dismiss: true,
                    placement: {
                        from: "bottom",
                        align: "center"
                    },
                    offset: 20,
                    spacing: 10,
                    z_index: 1031,
                    delay: 5000,
                    timer: 1000,
                    animate: {
                        enter: 'animated fadeInUp',
                        exit: 'animated fadeOutDown'
                    }

                });

            }
            function errorCallback(resp){
                $scope.backmsg = resp.data['status'];
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: $scope.backmsg
                },{
                    // settings
                    type: 'danger',
                    allow_dismiss: true,
                    placement: {
                        from: "bottom",
                        align: "center"
                    },
                    offset: 20,
                    spacing: 10,
                    z_index: 1031,
                    delay: 5000,
                    timer: 1000,
                    animate: {
                        enter: 'animated fadeInUp',
                        exit: 'animated fadeOutDown'
                    }

                });

            }

        }
        $scope.removeFav= function (a){

            var b = $scope.books.indexOf(a);

            $scope.books[b][5] = false;


            var databook = {
                name : $scope.books[b][0], year : $scope.books[b][2]
            }

            $http.post("/removefav",databook).then(successCallback, errorCallback);
            function successCallback(resp){
                $scope.backmsg = resp.data['status'];
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: $scope.backmsg
                },{
                    // settings
                    type: 'success',
                    allow_dismiss: true,
                    placement: {
                        from: "bottom",
                        align: "center"
                    },
                    offset: 20,
                    spacing: 10,
                    z_index: 1031,
                    delay: 5000,
                    timer: 1000,
                    animate: {
                        enter: 'animated fadeInUp',
                        exit: 'animated fadeOutDown'
                    }

                });

            }
            function errorCallback(resp){
                $scope.backmsg = resp.data['status'];
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: $scope.backmsg
                },{
                    // settings
                    type: 'danger',
                    allow_dismiss: true,
                    placement: {
                        from: "bottom",
                        align: "center"
                    },
                    offset: 20,
                    spacing: 10,
                    z_index: 1031,
                    delay: 5000,
                    timer: 1000,
                    animate: {
                        enter: 'animated fadeInUp',
                        exit: 'animated fadeOutDown'
                    }

                });

            }

        }
        $scope.deleteBook = function (a){

            var b = $scope.books.indexOf(a);

            var databook = {
                name : $scope.books[b][0], year : $scope.books[b][2]
            }



            $http.post("/deletebook",databook).then(successCallback, errorCallback);
            function successCallback(resp){
                $scope.backmsg = resp.data['status'];
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: $scope.backmsg
                },{
                    // settings
                    type: 'success',
                    allow_dismiss: true,
                    placement: {
                        from: "bottom",
                        align: "center"
                    },
                    offset: 20,
                    spacing: 10,
                    z_index: 1031,
                    delay: 5000,
                    timer: 1000,
                    animate: {
                        enter: 'animated fadeInUp',
                        exit: 'animated fadeOutDown'
                    }

                });

            }
            function errorCallback(resp){
                $scope.backmsg = resp.data['status'];
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: $scope.backmsg
                },{
                    // settings
                    type: 'danger',
                    allow_dismiss: true,
                    placement: {
                        from: "bottom",
                        align: "center"
                    },
                    offset: 20,
                    spacing: 10,
                    z_index: 1031,
                    delay: 5000,
                    timer: 1000,
                    animate: {
                        enter: 'animated fadeInUp',
                        exit: 'animated fadeOutDown'
                    }

                });

            }

            $scope.books.splice(b,1);

        }




});


