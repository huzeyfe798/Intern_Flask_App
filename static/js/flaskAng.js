var app = angular.module("myApp",[]);

app.config(function($interpolateProvider) {

    $interpolateProvider.startSymbol('//').endSymbol('//');

});

app.controller("myCtrl", function($scope, $http){

    $scope.logout = function(){

        $http.get('/logout').then(successCallback, errorCallback);
    function successCallback(){

        }

        function errorCallback(){
            $scope.backmsg = 'Logout Failed';
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

    $scope.change1 = function () {
        $http.post("/post",{'imageURL':$scope.imageURL,'bookname': $scope.bookName,'authorname': $scope.authorName,'year': $scope.writtenYear,'favorite': $scope.favoVal,
            'read': $scope.readVal,'toberead': $scope.tobeVal}).then(successCallback, errorCallback);

        function successCallback(resp){
            $scope.backmsg = resp.data['status'];
            var control=resp.data['check'];
            if(control){
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-info-sign',
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
            }else {
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
        function errorCallback(){
            $scope.backmsg = 'Post Failed';
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

    $scope.registeruser = function () {
        $http.post("/postuser",{'username':$scope.username,'password': $scope.userpassword,'userpasswordconfirm': $scope.userpasswordconfir,'email': $scope.email}).then(successCallback, errorCallback);
        function successCallback(resp){
            $scope.backmsg = resp.data['status'];
            var control=resp.data['check'];
            if(control){
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-info-sign',
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
            }else{
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
        function errorCallback(){
            $scope.backmsg = 'Post Failed';
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

    $scope.login = function(){
        $http.post("/login",{'username':$scope.username,'password': $scope.userpassword}).then(successCallback, errorCallback);
        function successCallback(resp){
            $scope.backmsg = resp.data['status'];
            var control=resp.data['check'];
            if(control){
                if($scope.backmsg == 'success'){
                    window.location = "/home"
                }
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-info-sign',
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
            }else{
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
        function errorCallback(){
            $scope.backmsg = 'Post Failed';
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

    $scope.sendpass = function () {
        $http.post("/sendpass",{'email': $scope.email}).then(successCallback, errorCallback);
        function successCallback(resp){
            $scope.backmsg = resp.data['status'];
            var control=resp.data['check'];
            if(control){
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-info-sign',
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
            }else{
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
        function errorCallback(){
            $scope.backmsg = 'Post Failed';
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
});


app.controller("myCtrlFav", function($scope, $http){
        var req_prefix = "https://www.googleapis.com/books/v1/volumes?q=";

        $scope.result_books = [];

    $http.get('/jsondatas').then(successCallback, errorCallback);

    function successCallback(datas){
        $scope.books = datas.data[1];
        $scope.backmsg = datas.data[0]['status'];
        var control = datas.data[0]['check'];

        if(!control){

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

    function errorCallback(){
      $scope.backmsg = 'Get Failed';
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

    $scope.filtertoBeRead = function(item){
        return (item[6] == "True" || item[6] == "true");
    }

    $scope.filterFavorite = function(item){
        return (item[5] == "True" || item[5] == "true");
    }

    $scope.filterRead = function(item){

        return (item[4] == "True" || item[4] == "true");
    }

    $scope.searchBooks = function(){

            if($scope.query == "" || $scope.query == undefined) {
                return;
            }

            $("#search-box").hide();
            $("#loading-box").show();

            $http.post("/postsearch",{'name': $scope.query}).then(successcall, errorcall);
            function successcall(resp){

                if(resp.data[0]['check']){
                    console.log("neregirdinbor");
                    $scope.controlbook = true;
                    $scope.controlapi = false;
                    $scope.result_books = resp.data[1];
                    $scope.backmsg = resp.data[0]['status'];
                    $("#msg").text("");

                    $.notify({
                        // options
                        icon: 'glyphicon glyphicon-info-sign',
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

                }else{

                    $scope.controlbook = false;
                    $scope.controlapi = true;
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

                    }
                    function errorCallback(){
                      $scope.backmsg = 'Google book api cant work';
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

                    $scope.backmsg = resp.data[0]['status'];
                    $.notify({
                          // options
                          icon: 'glyphicon glyphicon-warning-sign',
                          message: $scope.backmsg
                      },{
                          // settings
                          type: 'warning',
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

                $("#search-box").show();
                $("#loading-box").hide();

            }
            function errorcall(){
                $scope.backmsg = 'Post Failed';
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

    $scope.clearResults = function() {
        $scope.result_books = [];
        $scope.filterData = function(){
            return true;
        }
        $scope.query = '';
        $("#query").text( "" );
    }

    $scope.addBook = function(book){

        var createbooklist = {};
        var createfakebooklist = {};
        if(book.volumeInfo.hasOwnProperty('imageLinks')){
            createbooklist['imageURL']= book.volumeInfo.imageLinks.thumbnail;
            createfakebooklist[3]= book.volumeInfo.imageLinks.thumbnail;
        }else{
            createbooklist['imageURL']= "";
            createfakebooklist[3]= "";
        }
        if(book.volumeInfo.hasOwnProperty('title')){
            createbooklist['bookname']= book.volumeInfo.title;
            createfakebooklist[0]= book.volumeInfo.title;
        }else{
            createbooklist['bookname']= "";
            createfakebooklist[0]= "";
        }
        if(book.volumeInfo.hasOwnProperty('authors')){
            createbooklist['authorname']= book.volumeInfo.authors[0];
            createfakebooklist[1]= book.volumeInfo.authors[0];
        }else{
            createbooklist['authorname']= "";
            createfakebooklist[1]= "";
        }
        if(book.volumeInfo.hasOwnProperty('publishedDate')){
            createbooklist['year']= book.volumeInfo.publishedDate;
            createfakebooklist[2]= book.volumeInfo.publishedDate;
        }else{
            createbooklist['year']= "";
            createfakebooklist[2]= "";
        }
        createbooklist['read']= "false";
        createfakebooklist[4]= "false";
        createbooklist['favorite']= "false";
        createfakebooklist[5]= "false";
        createbooklist['toberead']= "false";
        createfakebooklist[6]= "false";


        $http.post("/post",createbooklist ).then(successCallback, errorCallback);
        function successCallback(resp){
            $scope.backmsg = resp.data['status'];
            var control=resp.data['check'];
            if(control){
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-info-sign',
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
                $scope.books.push(createfakebooklist);
            }else {
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
        function errorCallback(){
            $scope.backmsg = 'Post Failed';
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

    $scope.sendtoread = function (bookobj){

        var bookindex = $scope.books.indexOf(bookobj);

        var bookdata = {
            name : $scope.books[bookindex][0], year : $scope.books[bookindex][2],read : $scope.books[bookindex][4]
        };

        $http.post("/sendtoread",bookdata).then(successCallback, errorCallback);
        function successCallback(resp){
            $scope.backmsg = resp.data['status'];
            var control=resp.data['check'];
            if(control){
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-info-sign',
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
                $scope.books[bookindex][6] = 'false';
                $scope.books[bookindex][4] = 'true';
            }else{
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
        function errorCallback(){
            $scope.backmsg = 'Post Failed';
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

    $scope.sendtofav = function (bookobj){

        var bookindex = $scope.books.indexOf(bookobj);

        var databook = {
            name : $scope.books[bookindex][0], year : $scope.books[bookindex][2],fav:$scope.books[bookindex][5]
        };
        $http.post("/sendtofav",databook).then(successCallback, errorCallback);
        function successCallback(resp){
            $scope.backmsg = resp.data['status'];
            var control=resp.data['check'];
            if(control){
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-info-sign',
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
                $scope.books[bookindex][5] = 'true';
            }else{
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: $scope.backmsg
                },{
                    // settings3
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
        function errorCallback(){
            $scope.backmsg = 'Post failed.';
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

    $scope.sendtoberead = function (bookobj){

        var bookindex = $scope.books.indexOf(bookobj);

        var databook = {
            name : $scope.books[bookindex][0], year : $scope.books[bookindex][2],toberead:$scope.books[bookindex][6]
        };

        $http.post("/sendtoberead",databook).then(successCallback, errorCallback);
        function successCallback(resp){
            $scope.backmsg = resp.data['status'];
            var control=resp.data['check'];
            if(control){
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-info-sign',
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
                $scope.books[bookindex][6] = 'true';
                $scope.books[bookindex][4] = 'false';
            }else{
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: $scope.backmsg
                },{
                    // settings3
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
        function errorCallback(){
            $scope.backmsg = 'Post failed.';
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

    $scope.removeFav= function (bookobj){

        var bookindex = $scope.books.indexOf(bookobj);

        var databook = {
            name : $scope.books[bookindex][0], year : $scope.books[bookindex][2]
        }

        $http.post("/removefav",databook).then(successCallback, errorCallback);
        function successCallback(resp){
            $scope.backmsg = resp.data['status'];
            var control=resp.data['check'];
            if(control){
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-info-sign',
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
                $scope.books[bookindex][5] = 'false';

            }else{
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
        function errorCallback(){
            $scope.backmsg = 'Post failed.';
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

    $scope.deleteBook = function (bookobj){

        var bookindex = $scope.books.indexOf(bookobj);

        var databook = {
            name : $scope.books[bookindex][0], year : $scope.books[bookindex][2]
        }

        $http.post("/deletebook",databook).then(successCallback, errorCallback);
        function successCallback(resp){
            $scope.backmsg = resp.data['status'];
            var control=resp.data['check'];
            if (control){
                $.notify({
                    // options
                    icon: 'glyphicon glyphicon-info-sign',
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
                $scope.books.splice(bookindex,1);


            }else{
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
        function errorCallback(){
            $scope.backmsg = 'Post Failed';
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




});
