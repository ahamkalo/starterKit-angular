describe('add book rest service', function () {
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

        it('addBook', inject(function (addBookRestService) {
            // given when then
            expect(addBookRestService.addBook).toBeDefined();
        }));

    });

    it('addBook should call addBookRestService.addBook', inject(function (addBookRestService, $httpBackend) {

        var book = {id: 1, title: 'title'};
        var mockBackend = $httpBackend;
        mockBackend.expectPOST('/context.html/rest/books/book', book).respond(200, book);

        addBookRestService.addBook(book).then(function(response) {
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(book);
        });

        mockBackend.flush();
    }));

});
