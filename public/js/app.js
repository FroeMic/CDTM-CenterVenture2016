/**
 * Created by cwoebker on 11.10.16.
 */
// app.js

// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var cvApp = angular.module('cvApp', ['ui.materialize', 'ngRoute']);

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

        // route for the contact page
        .when('/login', {
            templateUrl : '../views/login.html',
            controller  : 'loginController'
        })

        // route for the contact page
        .when('/register', {
            templateUrl : '../views/register.html',
            controller  : 'registerController'
        });


});

cvApp.directive("loginModal", function () {
   return {
      templateUrl: "/views/loginModal.html",
      controller: "loginController"
   };
});

// create the controller and inject Angular's $scope
cvApp.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
    $scope.showLoginModal = false;

    $scope.showLogin = function() {
      $scope.showLoginModal = true;
  };

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

cvApp.controller('loginController', function($scope) {
  $scope.authenticateWithFacebook = function() {
    console.log("authenticate");
    // if sucess dismiss overlay
    $scope.showLoginModal = false
  }
});

cvApp.controller('registerController', function($scope) {
});
