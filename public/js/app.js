/**
 * Created by cwoebker on 11.10.16.
 */
// app.js

// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var cvApp = angular.module('cvApp', ['ui.materialize', 'ngRoute']);
var HOSTSTRING = ""

// configure our routes
cvApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl : '../views/index.html',
            controller  : 'mainController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : '../views/about.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : '../views/contact.html',
            controller  : 'contactController'
        })

        .when('/offer', {
            templateUrl : '../views/offer_create.html',
            controller  : 'offerCreateController'
        })

        .when('/offer/:offer_id', {
            templateUrl : '../views/offer_detail.html',
            controller  : 'offerDetailController'
        })

        .when('/offers', {
            templateUrl : '../views/offer_list.html',
            controller  : 'offerListController'
        })

        // route for the login page
        .when('/login', {
            templateUrl : '../views/login.html',
            controller  : 'loginController'
        })

        // route for the register page
        .when('/register', {
            templateUrl : '../views/register.html',
            controller  : 'registerController'
        });


});

cvApp.directive("personalityTest", function () {
   return {
      templateUrl: "/views/personalityTest.html",
      controller: "personalityTestController"
   };
});

// create the controller and inject Angular's $scope
cvApp.controller('mainController', function($scope, $location, $http) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
    $scope.user = null;

    // globally available
    HOSTSTRING = "http://" + $location.host()+":"+$location.port()

      $http.get(HOSTSTRING + '/user')
           .then(
               function(response){
                 // success callback
                 $scope.user = response.data
               },
               function(response){
                 // failure callback
              }
            );

    angular.element(document).ready(function () {
        $('.button-collapse').sideNav();
        $('.parallax').parallax();
    });
});

cvApp.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

cvApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

cvApp.controller('personalityTestController', function($scope) {
  $scope.message = 'personalityTestController message thingy.'
});

cvApp.controller('offerCreateController', function($scope) {

});

cvApp.controller('offerDetailController', function($scope, $routeParams) {
    $scope.offer_id = $routeParams.offer_id;
});

cvApp.controller('offerListController', function($scope) {

});

cvApp.controller('loginController', function($scope) {
  $scope.message = 'Login Controller message thingy.';
});

cvApp.controller('registerController', function($scope) {
});
