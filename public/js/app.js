/**
 * Created by cwoebker on 11.10.16.
 */
// app.js

// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var cvApp = angular.module('cvApp', ['ngRoute']);
var HOSTSTRING = ""

function shake(element) {
  try {
    element.classList.add('shake');
    element.classList.add('animated');
    setTimeout(function () {
      element.classList.remove('shake');
      element.classList.remove('animated');
    }, 1000);
  }
  catch(err) {
    // ignore
  }
}

// configure our route
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

        .when('/profile', {
            templateUrl : '../views/profile.html',
            controller  : 'profileController'
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

        .when('/bookmarks', {
            templateUrl : '../views/bookmarks.html',
            controller  : 'bookmarksController'
        })

        .when('/messages', {
            templateUrl : '../views/messages.html',
            controller  : 'messagesController'
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
    $scope.needsPersonalityTest = false
    $scope.user = null;

    // globally available
    HOSTSTRING = "http://" + $location.host()+":"+$location.port()

      $http.get(HOSTSTRING + '/user')
           .then(
               function(response){
                 // success callback
                 $scope.user = response.data
                 if ($scope.user != null && $scope.user != undefined && $scope.user != '') {
                   // user is logged in
                   console.log($scope.user);
                   if ($scope.user.personalityTest == null || $scope.user.personalityTest == undefined ){
                     $scope.needsPersonalityTest = true
                   }
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

cvApp.controller('personalityTestController', function($scope, $timeout, $http) {
  $scope.currentSection = 1;
  $scope.survey = null

  $scope.$watch('needsPersonalityTest', function() {
    if ($scope.needsPersonalityTest) {
      $scope.loadSurvey();
    }
 });

  $scope.loadSurvey = function() {
    $http.get(HOSTSTRING + '/personalitySurvey')
         .then(
             function(response){
               // success callback
               $scope.survey = response.data
               $timeout(initMaterialize, 0);
             },
             function(response){
               // TODO: Handle Error
               // failure callback
            }
          );
  }

  $scope.finishTest = function() {
    $scope.needsPersonalityTest = false;
  }

  $scope.nextSection = function() {
    // Sanity checking.
    var sane = true;
    $scope.survey.sections[$scope.currentSection - 1].questions.forEach(function(question) {
      sane = sane && question.answer != undefined  && question.answer != null;
      if (question.questionType=="TEXT") {
        sane = sane && question.answer != '';
      } else if (question.questionType=="CHOICE") {
        // TODO
      } else if (question.questionType=="LIKERT") {
        // TODO
      }
    });
    if (sane) {
      if ($scope.currentSection < $scope.survey.sections.length) {
        $scope.currentSection = $scope.currentSection + 1;
      } else {
        // TODO: Post to REST API.
        $scope.finishTest()
      }
    } else {
      // TODO: visualize wrong input
      shake(document.getElementById('survey-form'));
    }
  }


  $timeout(initMaterialize, 0);

  function initMaterialize() {
    $(document).ready(function(){
      $('select').material_select();
      $('.materialboxed').materialbox();
    });
}

});


cvApp.controller('profileController', function($scope) {
});

cvApp.controller('bookmarksController', function($scope) {
});

cvApp.controller('messagesController', function($scope) {
});

cvApp.controller('offerCreateController', function($scope, $http) {
    angular.element(document).ready(function () {
        $('select').material_select();
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });
        $(document).ready(function() {
            $('input#input_text, textarea#comments').characterCounter();
        });
    });

    // create a blank object to handle form data.
    $scope.formData = {};
    // calling our submit function.
    $scope.submitForm = function() {
        // Posting data to php file
        $http({
            method  : 'POST',
            url     : '/rooms',
            data    : $scope.formData, //forms user object
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .success(function(data) {
                if (data.errors) {
                    // Showing errors.
                    $scope.errorName = data.errors.name;
                    $scope.errorUserName = data.errors.username;
                    $scope.errorEmail = data.errors.email;
                } else {
                    $scope.message = data.message;
                }
            });
    };

});

cvApp.controller('offerDetailController', function($scope, $routeParams, $http) {
    $http.get('/rooms/'+$routeParams.offer_id).
    then(function(response) {
        $scope.room = response.data;
    });
});

cvApp.controller('offerListController', function($scope, $http) {
    $http.get('/rooms').
    then(function(response) {
        $scope.rooms = response.data;
    });
});

cvApp.controller('loginController', function($scope) {
  $scope.message = 'Login Controller message thingy.';
});

cvApp.controller('registerController', function($scope) {
});
