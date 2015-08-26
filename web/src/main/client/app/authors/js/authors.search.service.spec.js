describe('authors search service', function () {
    'use strict';

    beforeEach(function () {
        module('app.main');
        module('flash');
        module('app.authors');
    });

    var $scope;
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
    }));

    it('findAll is defined', inject(function (authorService) {
        // given when then
        expect(authorService.findAll).toBeDefined();
    }));

    it('findAll should call authorRestService.findAll', inject(function (authorService, authorRestService) {
        //given
        spyOn(authorRestService, 'findAll');
        authorService.findAll();
        expect(authorRestService.findAll).toHaveBeenCalled();
    }));


});
