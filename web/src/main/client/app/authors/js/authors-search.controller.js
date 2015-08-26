angular.module('app.authors').controller('AuthorSearchController', function ($scope, $window, $location, authorService) {
    'use strict';

    $scope.authors = [];
    $scope.prefix = '';

    var initPage = function () {
        authorService.findAll().then(function (response) {
            angular.copy(response.data, $scope.authors);
        });
    };

    initPage();

    $scope.startsWith = function (expression, prefix) {
        var lowerStr = (expression + '').toLowerCase();
        return lowerStr.indexOf(prefix.toLowerCase()) === 0;
    };

});
