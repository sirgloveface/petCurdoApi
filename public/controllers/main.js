'use strict';
app.controller('mainController', function ($scope, generalFactory) {

    $scope.list = {};
    generalFactory.getList().
            then(function (response) {
                console.log("response");
                console.log(response.data);
                $scope.list = response.data;
            }).catch(function (response) {
                 console.log('error');
                 console.log( response);
            })
            .finally(function () {
                console.log("finally");
            });





});


