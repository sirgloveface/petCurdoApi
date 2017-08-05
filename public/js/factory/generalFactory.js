'use strict';
angular.module('petCurdoApi')
    .factory('generalFactory', ['$http', function($http) {

    var dataFactory = {};

    dataFactory.getList = function () {
        return $http.get("/getList/");
    };

    dataFactory.get = function (id) {
        return $http.get("/get/" + id);
    };

    dataFactory.insert = function (obj) {
        return $http.post("/insert/", obj);
    };

    dataFactory.update = function (obj) {
        return $http.put("/update", obj);
    };

    dataFactory.delete = function (id) {
        return $http.delete("/delete/" + id);
    };


    return dataFactory;
}]);