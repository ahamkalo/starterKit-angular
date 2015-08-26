describe('authors search controller', function () {
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

    it('startsWith is defined', inject(function ($controller) {
        // given
        $controller('AuthorSearchController', {$scope: $scope});
        // when then
        expect($scope.startsWith).toBeDefined();
    }));

    it('startsWith should return true if actual is prefix of expected', inject(function ($controller) {
        // given
        $controller('AuthorSearchController', {$scope: $scope});
        // when then
        expect($scope.startsWith('title','tit')).toBe(true);
    }));

    it('should init page with authors', inject(function ($controller, $q, authorService) {
        // given
        var authors = [{id: 1, firstName: 'firstName', lastName: 'lastName'}];
        var searchDeferred = $q.defer();

        spyOn(authorService, 'findAll').and.returnValue(searchDeferred.promise);
        //when
        $controller('AuthorSearchController', {$scope: $scope});
        searchDeferred.resolve({data: authors});
        $scope.$digest();

        // then
        expect($scope.authors.length).toBe(1);
        expect($scope.authors[0].firstName).toBe('firstName');
    }));


});
