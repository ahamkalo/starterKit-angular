angular.module('app.books').controller('BookModalController', function ($scope, $modalInstance, Flash) {
    'use strict';

    $scope.title = undefined;

    $scope.changeTitle = function () {
        if ($scope.titleForm.$valid === true) {
            $modalInstance.close($scope.title);
        }
        else {
            Flash.create('danger', 'Pole tytuł nie zostało uzupełnione.', 'custom-class');
        }

    };

});
