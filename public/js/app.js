'use strict';


var app = angular.module('petCurdoApi', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			  templateUrl: 'views/main.html',
                          controller: 'mainController'
		})
		.when('/pubnub/', {
			templateUrl: 'views/pubnub/pubnub.html',
			controller: 'pubnubViewControl'
		})
		.otherwise({
			redirectTo: '/'
		});
});
