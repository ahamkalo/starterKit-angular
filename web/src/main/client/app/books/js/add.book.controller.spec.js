describe('add book controller', function () {
    'use strict';

    beforeEach(function () {
        module('app.main');
        module('flash');
        module('app.books');
    });

    var $scope;

    var fakeModal = {
        result: {
            then: function (confirmCallback, cancelCallback) {
                this.confirmCallBack = confirmCallback;
                this.cancelCallback = cancelCallback;
            }
        },
        close: function (item) {
            this.result.confirmCallBack(item);
        },
        dismiss: function (type) {
            this.result.cancelCallback(type);
        }
    };

    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
    }));

    describe('has defined', function () {

        beforeEach(inject(function ($controller) {
            $controller('AddBookController', {$scope: $scope});
        }));

        it('deleteAuthor', function () {
            // then
            expect($scope.deleteAuthor).toBeDefined();
        });

        it('addAuthor', function () {
            // then
            expect($scope.addAuthor).toBeDefined();
        });

        it('addBook', function () {
            // then
            expect($scope.addBook).toBeDefined();
        });
    });

    describe('addBook should call addBookService.addBook', function () {

        it('and display success flash message', inject(function ($controller, $q, addBookService, Flash, $location) {
            // given
            $controller('AddBookController', {$scope: $scope});
            $scope.addBookForm = {
                $valid: true
            };

            var authors = [{id: 1, firstName: 'firstName', lastName: 'lastName'}, {id: 2, firstName: 'firstName2', lastName: 'lastName2'}];
            var bookToAdd = {id: '1', title: 'test', authors: authors};
            $scope.book = bookToAdd;
            var addDeferred = $q.defer();
            spyOn(addBookService, 'addBook').and.returnValue(addDeferred.promise);
            spyOn(Flash, 'create');
            spyOn($location, 'url');
            // when
            $scope.addBook();
            addDeferred.resolve();
            $scope.$digest();
            // then
            expect($location.url).toHaveBeenCalledWith('/books/book-list');
            expect(addBookService.addBook).toHaveBeenCalledWith(bookToAdd);
            expect(Flash.create).toHaveBeenCalledWith('success', 'Książka została dodana.', 'custom-class');
        }));

        it('and display danger flash message', inject(function ($controller, $q, addBookService, Flash) {
            // given
            $controller('AddBookController', {$scope: $scope});
            $scope.addBookForm = {
                $valid: true
            };
            var authors = [{id: 1, firstName: 'firstName', lastName: 'lastName'}, {id: 2, firstName: 'firstName2', lastName: 'lastName2'}];
            var bookToAdd = {id: '1', title: 'test', authors: authors};
            $scope.book = bookToAdd;

            var addDeferred = $q.defer();
            spyOn(addBookService, 'addBook').and.returnValue(addDeferred.promise);
            spyOn(Flash, 'create');
            // when
            $scope.addBook();
            addDeferred.reject();
            $scope.$digest();
            // then
            expect(addBookService.addBook).toHaveBeenCalledWith(bookToAdd);
            expect(Flash.create).toHaveBeenCalledWith('danger', 'Wyjątek', 'custom-class');
        }));

    });

    describe('should call addBook', function () {

        it('for no title and author and display danger flash message', inject(function ($controller, $q, Flash) {
            // given
            $controller('AddBookController', {$scope: $scope});
            $scope.addBookForm = {
                $valid: false
            };

            var authors = [];
            var bookToAdd = {id: '1', title: 'test', authors: authors};
            $scope.book = bookToAdd;

            spyOn(Flash, 'create');
            // when
            $scope.addBook();
            // then
            expect(Flash.create).toHaveBeenCalledWith('danger', 'Nie został wpisany tytuł książki i nie dodano żadnego autora.', 'custom-class');
        }));

        it('for no title and display danger flash message', inject(function ($controller, $q, Flash) {
            // given
            $controller('AddBookController', {$scope: $scope});
            $scope.addBookForm = {
                $valid: false
            };

            var authors = [{id: 1, firstName: 'firstName', lastName: 'lastName'}, {id: 2, firstName: 'firstName2', lastName: 'lastName2'}];
            var bookToAdd = {id: '1', title: 'test', authors: authors};
            $scope.book = bookToAdd;

            spyOn(Flash, 'create');
            // when
            $scope.addBook();
            // then
            expect(Flash.create).toHaveBeenCalledWith('danger', 'Nie został wpisany tytuł książki.', 'custom-class');
        }));

        it('for no author and display danger flash message', inject(function ($controller, $q, Flash) {
            // given
            $controller('AddBookController', {$scope: $scope});
            $scope.addBookForm = {
                $valid: true
            };

            var authors = [];
            var bookToAdd = {id: '1', title: 'test', authors: authors};
            $scope.book = bookToAdd;

            spyOn(Flash, 'create');
            // when
            $scope.addBook();
            // then
            expect(Flash.create).toHaveBeenCalledWith('danger', 'Nie został dodany żaden autor książki.', 'custom-class');
        }));
    });

    describe('addAuthor should call addBookService.addAuthor', function () {

        it('and add Author to scope', inject(function ($controller, Flash, $modal) {
            // given
            $controller('AddBookController', {$scope: $scope});

            var author = {firstName: 'firstName', lastName: 'lastName'};

            spyOn($modal, 'open').and.returnValue(fakeModal);
            spyOn(Flash, 'create');
            // when
            $scope.addAuthor();
            fakeModal.close(author);
            $scope.$digest();
            // then
            expect(Flash.create).toHaveBeenCalledWith('success', 'Autor został dodany.', 'custom-class');
            expect($scope.book.authors.length).toBe(1);
            expect($scope.book.authors[0].firstName).toBe('firstName');
        }));

        it('and display danger flash message', inject(function ($controller, Flash, $modal) {
            // given
            $controller('AddBookController', {$scope: $scope});

            spyOn($modal, 'open').and.returnValue(fakeModal);
            spyOn(Flash, 'create');
            // when
            $scope.addAuthor();
            fakeModal.dismiss();
            $scope.$digest();
            // then
            expect(Flash.create).toHaveBeenCalledWith('danger', 'Wyjątek', 'custom-class');
            expect($scope.book.authors.length).toBe(0);
        }));
    });

    describe('addAuthor should call addBookService.addAuthor', function () {

        it('and add Author to scope', inject(function ($controller, Flash, $modal) {
            // given
            $controller('AddBookController', {$scope: $scope});

            var author = {firstName: 'firstName', lastName: 'lastName'};

            spyOn($modal, 'open').and.returnValue(fakeModal);
            spyOn(Flash, 'create');
            // when
            $scope.addAuthor();
            fakeModal.close(author);
            $scope.$digest();
            // then
            expect(Flash.create).toHaveBeenCalledWith('success', 'Autor został dodany.', 'custom-class');
            expect($scope.book.authors.length).toBe(1);
            expect($scope.book.authors[0].firstName).toBe('firstName');
        }));

        it('and display danger flash message', inject(function ($controller, Flash, $modal) {
            // given
            $controller('AddBookController', {$scope: $scope});

            spyOn($modal, 'open').and.returnValue(fakeModal);
            spyOn(Flash, 'create');
            // when
            $scope.addAuthor();
            fakeModal.dismiss();
            $scope.$digest();
            // then
            expect(Flash.create).toHaveBeenCalledWith('danger', 'Wyjątek', 'custom-class');
            expect($scope.book.authors.length).toBe(0);
        }));
    });

    it('deleteAuthor should remove author from scope and display success flash message', inject(function ($controller, Flash) {
        // given
        $controller('AddBookController', {$scope: $scope});
        var author = {firstName: 'firstName', lastName: 'lastName'};
        $scope.book.authors = [author];
        spyOn(Flash, 'create');
        // when
        expect($scope.book.authors.length).toBe(1);
        $scope.deleteAuthor(author);
        $scope.$digest();
        // then
        expect(Flash.create).toHaveBeenCalledWith('success', 'Autor został usunięty.', 'custom-class');
        expect($scope.book.authors.length).toBe(0);
    }));

});
