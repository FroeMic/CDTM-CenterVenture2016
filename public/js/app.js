/**
 * Created by cwoebker on 11.10.16.
 */
// app.js

// create the module and name it scotchApp
var cvApp = angular.module('cvApp', []);

// create the controller and inject Angular's $scope
cvApp.controller('mainController', function($scope) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});