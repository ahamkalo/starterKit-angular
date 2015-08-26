angular.module('app.authors', ['ngRoute']).config(function ($routeProvider) {
    'use strict';
    $routeProvider.when('/authors/authors', {
        templateUrl: 'authors/html/authors.html',
        controller: 'AuthorSearchController'
    });
});


