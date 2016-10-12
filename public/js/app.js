/**
 * Created by cwoebker on 11.10.16.
 */
// app.js

// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var cvApp = angular.module('cvApp', ['ngRoute']);

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

        .when('/search', {
            templateUrl : '../views/search.html',
            controller  : 'searchController'
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

// create the controller and inject Angular's $scope
cvApp.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';

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

cvApp.controller('searchController', function($scope) {
  $('select').material_select();
  $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    //Price-Range
    var dragSlider = document.getElementById('price_range');
    noUiSlider.create(dragSlider, {
      start: [ 200, 600 ],
      behaviour: 'drag',
      connect: true,
      step:1,
      range: {
        'min':  100,
        'max':  1000
      },
      format: wNumb({
        decimals: 0,
        thousand: '.',
        //postfix: ' (€)',
      })
    });

    var dragSlider = document.getElementById('room_range');
    noUiSlider.create(dragSlider, {
      start: [ 10, 20 ],
      behaviour: 'drag',
      connect: true,
      step:1,
      range: {
        'min':  1,
        'max':  35
      },
      format: wNumb({
        decimals: 0,
        thousand: '.',
        //postfix: ' (€)',
      })
    });

    var dragSlider = document.getElementById('apartment_range');
    noUiSlider.create(dragSlider, {
      start: [ 30, 70 ],
      behaviour: 'drag',
      connect: true,
      step:1,
      range: {
        'min':  5,
        'max':  150
      },
      format: wNumb({
        decimals: 0,
        thousand: '.',
        //postfix: ' (€)',
      })
    });

    var dragSlider = document.getElementById('traveltime_range');
    noUiSlider.create(dragSlider, {
      start: [ 5, 40 ],
      behaviour: 'drag',
      connect: true,
      step:1,
      range: {
        'min':  1,
        'max':  60
      },
      format: wNumb({
        decimals: 0,
        thousand: '.',
        //postfix: ' (€)',
      })
    });
  });
});

cvApp.controller('offerCreateController', function($scope) {
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
});

cvApp.controller('offerDetailController', function($scope, $routeParams) {
    $scope.offer_id = $routeParams.offer_id;
});

cvApp.controller('offerListController', function($scope) {
});

cvApp.controller('loginController', function($scope) {
});

cvApp.controller('registerController', function($scope) {
});
