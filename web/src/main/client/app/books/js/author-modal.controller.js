angular.module('app.books').controller('AuthorModalController', function ($scope, $modalInstance, Flash) {
    'use strict';
    $scope.author = {firstName: undefined, lastName: undefined};

    //$scope.addAuthor = function () {
    //    $modalInstance.close($scope.author);
    //};

    $scope.addAuthor = function () {
        var firstName = $scope.author.firstName;
        var lastName = $scope.author.lastName;

        if ($scope.addForm.$valid === false) {
            if (firstName === undefined && lastName === undefined) {
                Flash.create('danger', 'Pola imię i nazwisko nie zostały wypełnione.', 'custom-class');
            }
            else {
                if (firstName === undefined) {
                    Flash.create('danger', 'Pole imię nie zostało wypełnione.', 'custom-class');
                }
                else {
                    Flash.create('danger', 'Pole nazwisko nie zostało wypełnione.', 'custom-class');
                }
            }
        }
        else{
            $modalInstance.close($scope.author);
        }
    };

});
