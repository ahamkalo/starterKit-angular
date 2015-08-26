angular.module('app.books').factory('addBookService', function (addBookRestService) {
    'use strict';

    return {
        addBook: function (book) {
            return addBookRestService.addBook(book);
        }
    };
});
