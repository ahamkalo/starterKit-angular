angular.module('app.books').factory('bookService', function (bookRestService) {
    'use strict';

    return {
        search: function (titlePrefix) {
            return bookRestService.search(titlePrefix);
        },
        deleteBook: function (bookId) {
            return bookRestService.deleteBook(bookId);
        },
        updateBook: function (book) {
            return bookRestService.updateBook(book);
        },
        findAll: function () {
            return bookRestService.findAll();
        }
    };
});
