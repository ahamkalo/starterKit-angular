angular.module('app.books').controller('BookSearchController', function ($scope, $window, $location, bookService, Flash, $modal) {
    'use strict';

    $scope.books = [];
    $scope.prefix = '';

    var initPage = function () {
        bookService.findAll().then(function (response) {
            angular.copy(response.data, $scope.books);
        });
    };

    initPage();

    var removeBookById = function (bookId) {
        for (var i = 0; i < $scope.books.length; i = i + 1) {
            if ($scope.books[i].id === bookId) {
                $scope.books.splice(i, 1);
                break;
            }
        }
    };

    $scope.search = function () {
        bookService.search($scope.prefix).then(function (response) {
            angular.copy(response.data, $scope.books);
        }, function () {
            Flash.create('danger', 'Wyjątek.', 'custom-class');
        });
    };

    $scope.deleteBook = function (bookId) {
        bookService.deleteBook(bookId).then(function () {
            removeBookById(bookId);
            Flash.create('success', 'Książka została usunięta.', 'custom-class');
        }, function () {
            Flash.create('danger', 'Ksiązka nie została usunięta.', 'custom-class');
        });
    };

    $scope.displayAddBookPage = function () {
        $location.url('/books/add-book');
    };

    $scope.updateBook = function (book) {
        var modalInstance = $modal.open(options);

        modalInstance.result.then(function (response) {
            book.title = response;
            bookService.updateBook(book).
                then(function () {
                    Flash.create('success', 'Edycja książki przebiegła pomyślnie.', 'custom-class');
                    updateBookTitle(book);
                }, function () {
                    Flash.create('danger', 'Edycja książki zakończyła się niepowodzeniem.', 'custom-class');
                });
        });
    };

    var options = {
        templateUrl: 'books/html/book-modal.html',
        controller: 'BookModalController'
    };

    var updateBookTitle = function (book) {
        for (var i = 0; i < $scope.books.length; i = i + 1) {
            if ($scope.books[i].id === book.id) {
                $scope.books[i].title = book.title;
                break;
            }
        }
    };
});
