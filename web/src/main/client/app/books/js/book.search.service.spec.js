describe('book search service', function () {
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

        it('search', inject(function (bookService) {
            // then
            expect(bookService.search).toBeDefined();
        }));

        it('deleteBook', inject(function (bookService) {
            // then
            expect(bookService.deleteBook).toBeDefined();
        }));

        it('updateBook', inject(function (bookService) {
            //then
            expect(bookService.updateBook).toBeDefined();
        }));

        it('findAll', inject(function (bookService) {
            //then
            expect(bookService.findAll).toBeDefined();
        }));
    });

    it('findAll should call bookRestService.findAll', inject(function (bookService, bookRestService) {
        //given
        spyOn(bookRestService, 'findAll');
        //when
        bookService.findAll();
        //then
        expect(bookRestService.findAll).toHaveBeenCalled();
    }));

    it('updateBook should call bookRestService.updateBook', inject(function (bookService, bookRestService) {
        //given
        var book = {id: '1', title: 'test'};
        spyOn(bookRestService, 'updateBook');
        //when
        bookService.updateBook(book);
        //then
        expect(bookRestService.updateBook).toHaveBeenCalledWith(book);
    }));

    it('deleteBook should call bookRestService.deleteBook', inject(function (bookService, bookRestService) {
        //given
        var bookId = 1;
        spyOn(bookRestService, 'deleteBook');
        //when
        bookService.deleteBook(bookId);
        //then
        expect(bookRestService.deleteBook).toHaveBeenCalledWith(bookId);
    }));

    it('search should call bookRestService.search', inject(function (bookService, bookRestService) {
        //given
        var titlePrefix = 'titlePrefix';
        spyOn(bookRestService, 'search');
        //when
        bookService.search(titlePrefix);
        //then
        expect(bookRestService.search).toHaveBeenCalledWith(titlePrefix);
    }));

});
