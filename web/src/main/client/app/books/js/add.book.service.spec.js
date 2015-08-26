describe('add book service', function () {
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

    it('addBook is defined', inject(function (addBookService) {
        // given when then
        expect(addBookService.addBook).toBeDefined();
    }));

    it('addBook should call addBookRestService.addBook', inject(function (addBookService, addBookRestService) {
        //given
        var book = {id: '1', title: 'test'};
        spyOn(addBookRestService, 'addBook');
        //when
        addBookService.addBook(book);
        //then
        expect(addBookRestService.addBook).toHaveBeenCalledWith(book);
    }));


});
