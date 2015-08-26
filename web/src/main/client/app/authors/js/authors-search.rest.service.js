angular.module('app.authors').factory('authorRestService', function ($http, currentContextPath) {
    'use strict';

    return {
        findAll: function () {
            return $http.get(currentContextPath.get() + 'rest/authors/all-authors');
        }
    };
});
