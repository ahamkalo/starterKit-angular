describe('book search rest service', function () {
    'use strict';

    beforeEach(function () {
        module('app.main');
        module('flash');
        module('app.books');
    });

    var $scope;
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
    }));

    describe('has defined', function () {

        it('findAll', inject(function (bookRestService) {
            // given when then
            expect(bookRestService.findAll).toBeDefined();
        }));

        it('updateBook', inject(function (bookRestService) {
            // given when then
            expect(bookRestService.updateBook).toBeDefined();
        }));

        it('deleteBook', inject(function (bookRestService) {
            // given when then
            expect(bookRestService.deleteBook).toBeDefined();
        }));

        it('search', inject(function (bookRestService) {
            // given when then
            expect(bookRestService.search).toBeDefined();
        }));

    });

    it('findAll should call bookRestService.findAll', inject(function (bookRestService, $httpBackend) {

        var books = [{id: 1, title: 'title'}];
        var mockBackend = $httpBackend;
        mockBackend.expectGET('/context.html/rest/books/all-books').respond(200, books);

        bookRestService.findAll().then(function(response) {
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(books);
        });

        mockBackend.flush();
    }));

    it('updateBook should call bookRestService.updateBook', inject(function (bookRestService, $httpBackend) {

        var book = {id: 1, title: 'title'};
        var mockBackend = $httpBackend;
        mockBackend.expectPUT('/context.html/rest/books/book', book).respond(200, book);

        bookRestService.updateBook(book).then(function(response) {
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(book);
        });

        mockBackend.flush();
    }));

    it('deleteBook should call bookRestService.deleteBook', inject(function (bookRestService, $httpBackend) {

        var bookId = 1;
        var mockBackend = $httpBackend;
        mockBackend.expectDELETE('/context.html/rest/books/book/' + bookId).respond(200);

        bookRestService.deleteBook(bookId).then(function(response) {
            expect(response.status).toEqual(200);
        });

        mockBackend.flush();
    }));

    it('search should call bookRestService.search', inject(function (bookRestService, $httpBackend) {

        var books = [{id: 1, title: 'title'}];
        var mockBackend = $httpBackend;
        mockBackend.expectGET('/context.html/rest/books/books-by-title').respond(200, books);

        bookRestService.search().then(function(response) {
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(books);
        });

        mockBackend.flush();
    }));
});
