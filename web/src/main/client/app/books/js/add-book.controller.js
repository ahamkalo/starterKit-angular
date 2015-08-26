angular.module('app.books').controller('AddBookController', function ($scope, $window, $location, addBookService, Flash, $modal) {
        'use strict';

        $scope.book = {title: '', authors: []};

        $scope.addBook = function () {
            var validation = $scope.addBookForm.$valid;
            var authorsCount = $scope.book.authors.length;

            if ((validation === true) && (authorsCount > 0)) {
                addBookService.addBook($scope.book).
                    then(function () {
                        Flash.create('success', 'Książka została dodana.', 'custom-class');
                        $location.url('/books/book-list');
                    }, function () {
                        Flash.create('danger', 'Wyjątek', 'custom-class');
                    });
            }
            else if((validation === false) && (authorsCount > 0)){
                Flash.create('danger', 'Nie został wpisany tytuł książki.', 'custom-class');
            }
            else if((validation === true) && (authorsCount === 0)){
                Flash.create('danger', 'Nie został dodany żaden autor książki.', 'custom-class');
            }
            else if((validation === false) && (authorsCount === 0)){
                Flash.create('danger', 'Nie został wpisany tytuł książki i nie dodano żadnego autora.', 'custom-class');
            }
        };

        $scope.addAuthor = function () {
            var modalInstance = $modal.open(options);

            modalInstance.result.then(function (response) {
                $scope.book.authors.push(response);
                Flash.create('success', 'Autor został dodany.', 'custom-class');
            }, function () {
                Flash.create('danger', 'Wyjątek', 'custom-class');
            });
        };

        var options = {
            templateUrl: 'books/html/author-modal.html',
            controller: 'AuthorModalController'
        };

        $scope.deleteAuthor = function (author) {
            removeAuthor(author);
            Flash.create('success', 'Autor został usunięty.', 'custom-class');
        };

        var removeAuthor = function (author) {
            for (var i = 0; i < $scope.book.authors.length; i = i + 1) {
                if ($scope.book.authors[i] === author) {
                    $scope.book.authors.splice(i, 1);
                    break;
                }
            }
        };
    }
)
;
