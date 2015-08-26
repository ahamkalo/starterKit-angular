describe('author modal controller', function () {
    'use strict';

    var modalInstance;
    beforeEach(function () {
        module('app.main');

        module('app.books', function($provide) {
            $provide.value('$modalInstance', modalInstance);
        });

        modalInstance = {
            close: jasmine.createSpy('modalInstance.close')
        };
    });
    var $scope;
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
    }));

    it('addAuthor is defined', inject(function ($controller) {
        // when
        $controller('AuthorModalController', {$scope: $scope});
        // then
        expect($scope.addAuthor).toBeDefined();
    }));

    it('should close with scope.author', inject(function ($controller) {
        //given
        $controller('AuthorModalController', {$scope: $scope});
        $scope.addForm = {
            $valid: true
        };

        var author = {firstName: 'firstName', lastName: 'lastName'};
        $scope.author = author;
        //when
        $scope.addAuthor();
        // then
        expect(modalInstance.close).toHaveBeenCalledWith(author);
    }));

    it('should display danger flash message for firstName and lastName undefined', inject(function ($controller, Flash) {
        //given
        $controller('AuthorModalController', {$scope: $scope});
        $scope.addForm = {
            $valid: false
        };

        var author = {firstName: undefined, lastName: undefined};
        $scope.author = author;
        spyOn(Flash, 'create');
        //when
        $scope.addAuthor();
        // then
        expect(Flash.create).toHaveBeenCalledWith('danger','Pola imię i nazwisko nie zostały wypełnione.', 'custom-class');
    }));

    it('should display danger flash message for lastName undefined', inject(function ($controller, Flash) {
        //given
        $controller('AuthorModalController', {$scope: $scope});
        $scope.addForm = {
            $valid: false
        };

        var author = {firstName: 'firstName', lastName: undefined};
        $scope.author = author;
        spyOn(Flash, 'create');
        //when
        $scope.addAuthor();
        // then
        expect(Flash.create).toHaveBeenCalledWith('danger','Pole nazwisko nie zostało wypełnione.', 'custom-class');
    }));

    it('should display danger flash message for firstName undefined', inject(function ($controller, Flash) {
        //given
        $controller('AuthorModalController', {$scope: $scope});
        $scope.addForm = {
            $valid: false
        };

        var author = {firstName: undefined, lastName: 'lastName'};
        $scope.author = author;
        spyOn(Flash, 'create');
        //when
        $scope.addAuthor();
        // then
        expect(Flash.create).toHaveBeenCalledWith('danger','Pole imię nie zostało wypełnione.', 'custom-class');
    }));
});
