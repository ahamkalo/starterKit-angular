describe('authors search rest service', function () {
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

    it('findAll is defined', inject(function (authorRestService) {
        // given when then
        expect(authorRestService.findAll).toBeDefined();
    }));

    it('findAll should call authorRestService.findAll', inject(function (authorRestService, $httpBackend) {

        var authors = [{id: 1, firstName: 'firstName', lastName: 'lastName'}];
        var mockBackend = $httpBackend;
        mockBackend.expectGET('/context.html/rest/authors/all-authors').respond(200, authors);

        authorRestService.findAll().then(function(response) {
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(authors);
        });

        mockBackend.flush();
    }));
});
