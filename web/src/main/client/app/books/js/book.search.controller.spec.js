describe('book search controller', function () {
    'use strict';

    beforeEach(function () {
        module('app.main');
        module('flash');
        module('app.books');
    });

    var $scope;

    var fakeModal = {
        result: {
            then: function(confirmCallback, cancelCallback) {
                this.confirmCallBack = confirmCallback;
                this.cancelCallback = cancelCallback;
            }
        },
        close: function( item ) {
            this.result.confirmCallBack( item );
        },
        dismiss: function( type ) {
            this.result.cancelCallback( type );
        }
    };

    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
    }));

    describe('has defined', function () {

        it('search', inject(function ($controller) {
            // when
            $controller('BookSearchController', {$scope: $scope});
            // then
            expect($scope.search).toBeDefined();
        }));

        it('deleteBook', inject(function ($controller) {
            // when
            $controller('BookSearchController', {$scope: $scope});
            // then
            expect($scope.deleteBook).toBeDefined();
        }));

        it('displayAddBookPage', inject(function ($controller) {
            // when
            $controller('BookSearchController', {$scope: $scope});
            // then
            expect($scope.displayAddBookPage).toBeDefined();
        }));

        it('displayAddBookPage', inject(function ($controller) {
            // when
            $controller('BookSearchController', {$scope: $scope});
            // then
            expect($scope.displayAddBookPage).toBeDefined();
        }));

        it('updateBook', inject(function ($controller) {
            // when
            $controller('BookSearchController', {$scope: $scope});
            // then
            expect($scope.updateBook).toBeDefined();
        }));
    });

    describe('deleteBook should call bookService.deleteBook', function () {

        it('and delete book from scope', inject(function ($controller, $q, bookService, Flash) {
            // given
            spyOn(bookService, 'findAll').and.returnValue({then: angular.noop});
            $controller('BookSearchController', {$scope: $scope});

            var bookId = 1;
            $scope.books = [{id: bookId, title: 'test'}];
            var deleteDeferred = $q.defer();
            spyOn(bookService, 'deleteBook').and.returnValue(deleteDeferred.promise);
            spyOn(Flash, 'create');
            // when
            $scope.deleteBook(bookId);
            deleteDeferred.resolve();
            $scope.$digest();
            // then
            expect(bookService.deleteBook).toHaveBeenCalledWith(bookId);
            expect(Flash.create).toHaveBeenCalledWith('success', 'Książka została usunięta.', 'custom-class');
            expect($scope.books.length).toBe(0);
        }));

        it('and display danger flash message', inject(function ($controller, $q, bookService, Flash) {
            // given
            spyOn(bookService, 'findAll').and.returnValue({then: angular.noop});
            $controller('BookSearchController', {$scope: $scope});

            var bookId = 1;

            var deleteDeferred = $q.defer();
            spyOn(bookService, 'deleteBook').and.returnValue(deleteDeferred.promise);
            spyOn(Flash, 'create');
            // when
            $scope.deleteBook(bookId);
            deleteDeferred.reject();
            $scope.$digest();
            // then
            expect(Flash.create).toHaveBeenCalledWith('danger', 'Ksiązka nie została usunięta.', 'custom-class');
        }));
    });

    describe('search should call bookService.search', function () {

        it('and add one book to scope', inject(function ($controller, $q, bookService) {
            // given
            spyOn(bookService, 'findAll').and.returnValue({then: angular.noop});
            $controller('BookSearchController', {$scope: $scope});

            var prefix = 't';
            $scope.prefix = prefix;
            var returnBook = {id: '1', title: 'test'};
            var searchDeferred = $q.defer();
            spyOn(bookService, 'search').and.returnValue(searchDeferred.promise);
            // when
            $scope.search();
            searchDeferred.resolve({data: [returnBook]});
            $scope.$digest();
            // then
            expect(bookService.search).toHaveBeenCalledWith(prefix);
            expect($scope.books.length).toBe(1);
            expect($scope.books[0].id).toBe('1');
            expect($scope.books[0].title).toBe('test');

        }));

        it('and display danger flash message', inject(function ($controller, $q, bookService, Flash) {
            // given
            spyOn(bookService, 'findAll').and.returnValue({then: angular.noop});
            $controller('BookSearchController', {$scope: $scope});

            var searchDeferred = $q.defer();
            spyOn(bookService, 'search').and.returnValue(searchDeferred.promise);
            spyOn(Flash, 'create');
            // when
            $scope.search();
            searchDeferred.reject();
            $scope.$digest();
            // then
            expect(Flash.create).toHaveBeenCalledWith('danger', 'Wyjątek.', 'custom-class');
        }));
    });

    describe('updateBook should call bookService.updateBook', function () {

        it('and update title of one book', inject(function ($controller, $q, bookService, Flash, $modal) {
            //given
            spyOn(bookService, 'findAll').and.returnValue({then: angular.noop});
            $controller('BookSearchController', {$scope: $scope});
            var book = {id: '1', title: 'test'};
            $scope.books = [book];
            var updatedTitle = 'updatedTitle';

            var updateDeferred = $q.defer();
            spyOn($modal, 'open').and.returnValue(fakeModal);
            spyOn(bookService, 'updateBook').and.returnValue(updateDeferred.promise);
            spyOn(Flash, 'create');
            //when

            $scope.updateBook(book);
            fakeModal.close(updatedTitle);
            updateDeferred.resolve();
            $scope.$digest();

            expect(bookService.updateBook).toHaveBeenCalledWith(book);
            expect(Flash.create).toHaveBeenCalledWith('success', 'Edycja książki przebiegła pomyślnie.', 'custom-class');
            expect($scope.books[0].title).toBe(updatedTitle);
            expect($scope.books.length).toBe(1);
        }));

        it('and display danger flash message', inject(function ($controller, $q, bookService, Flash, $modal) {
            //given
            spyOn(bookService, 'findAll').and.returnValue({then: angular.noop});
            $controller('BookSearchController', {$scope: $scope});
            var book = {id: '1', title: 'test'};
            var updatedTitle = 'updatedTitle';

            var updateDeferred = $q.defer();
            spyOn($modal, 'open').and.returnValue(fakeModal);
            spyOn(bookService, 'updateBook').and.returnValue(updateDeferred.promise);
            spyOn(Flash, 'create');
            //when

            $scope.updateBook(book);
            fakeModal.close(updatedTitle);
            updateDeferred.reject();
            $scope.$digest();

            expect(Flash.create).toHaveBeenCalledWith('danger', 'Edycja książki zakończyła się niepowodzeniem.', 'custom-class');
        }));

    });

    it('displayAddBookPage should redirect to /books/add-book', inject(function ($controller, $location) {
        // given
        $controller('BookSearchController', {$scope: $scope});

        spyOn($location, 'url');
        // when
        $scope.displayAddBookPage();
        // then
        expect($location.url).toHaveBeenCalledWith('/books/add-book');
    }));

    it('should init page with books', inject(function ($controller, $q, bookService) {
        // given
        var authors = [{id: 1, firstName: 'firstName', lastName: 'lastName'}, {id: 2, firstName: 'firstName2', lastName: 'lastName2'}];
        var books = [{id: 1, title: 'title', authors: authors}];
        var searchDeferred = $q.defer();

        spyOn(bookService, 'findAll').and.returnValue(searchDeferred.promise);
        //when
        $controller('BookSearchController', {$scope: $scope});
        searchDeferred.resolve({data: books});
        $scope.$digest();

        // then
        expect($scope.books.length).toBe(1);
        expect($scope.books[0].authors.length).toBe(2);
        expect($scope.books[0].authors[1].firstName).toBe('firstName2');
    }));
});
