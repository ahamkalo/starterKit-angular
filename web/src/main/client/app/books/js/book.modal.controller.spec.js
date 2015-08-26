describe('book modal controller', function () {
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

    it('changeTitle is defined', inject(function ($controller) {
        // when
        $controller('BookModalController', {$scope: $scope});
        // then
        expect($scope.changeTitle).toBeDefined();
    }));

    it('should close with scope.title', inject(function ($controller) {
        //given
        $controller('BookModalController', {$scope: $scope});
        $scope.titleForm = {
            $valid: true
        };

        var title = 'testTitle';
        $scope.title = title;
        //when
        $scope.changeTitle();
        // then
        expect(modalInstance.close).toHaveBeenCalledWith(title);
    }));

    it('should display danger flash message', inject(function ($controller,Flash) {
        //given
        $controller('BookModalController', {$scope: $scope});
        $scope.titleForm = {
            $valid: false
        };
        spyOn(Flash, 'create');
        //when
        $scope.changeTitle();
        // then
        expect(Flash.create).toHaveBeenCalledWith('danger','Pole tytuł nie zostało uzupełnione.', 'custom-class');
    }));

});
