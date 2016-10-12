/**
 * Created by cwoebker on 11.10.16.
 */
// app.js

// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var cvApp = angular.module('cvApp', ['ngRoute']);
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
      controller: "personalityTestController",
      link: function(scope, elem, attr) {
        angular.element(document).ready(function(){
          $('select').material_select();
        });
      }
   };
});


// create the controller and inject Angular's $scope
cvApp.controller('mainController', function($scope, $location, $http) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
    $scope.needsPersonalityTest = false
    $scope.user = null;

    // globally available
    HOSTSTRING = "http://" + $location.host()+":"+$location.port()

      $http.get(HOSTSTRING + '/user')
           .then(
               function(response){
                 // success callback
                 $scope.user = response.data
                 if ($scope.user.personalityTest == null || $scope.user.personalityTest == undefined ){
                   $scope.needsPersonalityTest = true
                 }
               },
               function(response){
                 // failure callback
              }
            );

    angular.element(document).ready(function () {
        $('.button-collapse').sideNav();
        $('.parallax').parallax();
        $('ul.tabs').tabs();
        $('select').material_select();

    });
});

cvApp.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

cvApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

cvApp.controller('personalityTestController', function($scope, $timeout) {
  $scope.currentSection = 1;

  $scope.survey = {
    title: "Welcome to XXX",
    sections: [
      {
        title: "Intro",
        description: "Please give us some information about yourself, so we can find your perfect flatmate.",
        number: 1,
        questions: [
          {
            title: "Firstname",
            question: "My Firstname",
            questionType: "TEXT",
            answerOptions: null
          },
          {
            title: "Lastname",
            question: "My Lastname",
            questionType: "TEXT",
            answerOptions: null
          },
          {
            title: "Gender",
            question: "My Gender",
            questionType: "CHOICE",
            answerOptions: [
              {
                value: 0,
                text: "female",
                iconUrl: "/img/icons/survey/female.png"
              },
              {
                value: 0,
                text: "male",
                iconUrl: "/img/icons/survey/male.png"
              },
              {
                value: 0,
                text: "other",
                iconUrl: "/img/icons/survey/unicorn.png"
              }
            ]
          },
          {
            title: "Occupation",
            question: "My Occupation",
            questionType: "TEXT",
            answerOptions: null
          }
        ]

      }
    ]
  }

  $scope.finishTest = function() {
    $scope.needsPersonalityTest = false;
  }

  $scope.nextSection = function() {
    console.log($scope.currentSection);
    $scope.currentSection = $scope.currentSection + 1;
  }


  $timeout(initMaterialize, 0);

  function initMaterialize() {
    $(document).ready(function(){
      $('select').material_select();
      $('ul.tabs').tabs();
    });
}

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
