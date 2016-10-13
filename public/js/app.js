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

  $scope.updateAnswer = function (question, answer) {
    console.log(question);
    question.answer = answer;
  }

  $scope.survey = {
    title: "PersonalitySurvey",
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
            number: 1,
            answerOptions: null
          },
          {
            title: "Lastname",
            question: "My Lastname",
            questionType: "TEXT",
            number: 2,
            answerOptions: null
          },
          {
            title: "Gender",
            question: "My Gender",
            questionType: "CHOICE",
            number: 3,
            answerOptions: [
              {
                value: 0,
                text: "Female",
                iconUrl: "/img/icons/survey/female.png"
              },
              {
                value: 1,
                text: "Male",
                iconUrl: "/img/icons/survey/male.png"
              },
              {
                value: 2,
                text: "Other",
                iconUrl: "/img/icons/survey/unicorn.png"
              }
            ]
          },
          {
            title: "Occupation",
            question: "My Occupation",
            questionType: "TEXT",
            number: 4,
            answerOptions: null
          }
        ]
      },
      {
        title: "Lifestyle",
        description: "We will use this information to calculate a matching score with your prospective roommates.",
        number: 2,
        questions: [
          {
            title: "Nightowl",
            question: "I am a nightowl ...",
            questionType: "CHOICE",
            number: 1,
            answerOptions: [
              {
                value: 1,
                text: "Early bird",
                iconUrl: "/img/icons/survey/bird.png"
              },
              {
                value: 2,
                text: "A bit of both",
                iconUrl: "/img/icons/survey/coffee.png"
              },
              {
                value: 3,
                text: "Nightowl",
                iconUrl: "/img/icons/survey/owl.png"
              }
            ]
          },
          {
            title: "Guests",
            question: "I often have guests ...",
            questionType: "CHOICE",
            number: 2,
            answerOptions: [
              {
                value: 1,
                text: "Hardly Ever"
              },
              {
                value: 2,
                text: "Once A Month"
              },
              {
                value: 3,
                text: "Once a week"
              },
              {
                value: 4,
                text: "Every Day"
              }
            ]
          },
          {
            title: "Party",
            question: "I like to party ...",
            questionType: "CHOICE",
            number: 3,
            answerOptions: [
              {
                value: 1,
                text: "not at all"
              },
              {
                value: 2,
                text: "sometime"
              },
              {
                value: 3,
                text: "every weekend"
              },
              {
                value: 4,
                text: "during the week"
              },
              {
                value: 5,
                text: "day & night"
              }
            ]
          },
          {
            title: "Music",
            question: "I listen to music ...",
            questionType: "CHOICE",
            number: 4,
            answerOptions: [
              {
                value: 1,
                text: "with headphones"
              },
              {
                value: 2,
                text: "with low volume"
              },
              {
                value: 3,
                text: "with room volume"
              },
              {
                value: 4,
                text: "with loud volume"
              },
              {
                value: 5,
                text: "IT CANNOT BE LOUD ENOUGH"
              }
            ]
          },
          {
            title: "Smoke",
            question: "I smoke ...",
            questionType: "CHOICE",
            number: 5,
            answerOptions: [
              {
                value: 1,
                text: "No"
              },
              {
                value: 2,
                text: "No, but I don't mind"
              },
              {
                value: 3,
                text: "Yes"
              }
            ]
          },
          {
            title: "Vegitarian",
            question: "I am a ...",
            questionType: "CHOICE",
            number: 5,
            answerOptions: [
              {
                value: 1,
                text: "Vegan"
              },
              {
                value: 2,
                text: "Vegitarian"
              },
              {
                value: 3,
                text: "Pescitarian"
              },
              {
                value: 4,
                text: "Omnivore"
              }
            ]
          }
        ]
      },
      {
        title: "Living Together",
        description: "You and your potential flatling will see a percentage how your personalities and lifestyles fit together.",
        number: 3,
        questions: [
          {
            title: "Relationship",
            question: "My flatmate & I will ... ",
            questionType: "CHOICE",
            number: 1,
            answerOptions: [
              {
                value: 1,
                text: "Just share a house"
              },
              {
                value: 2,
                text: "have some common activities"
              },
              {
                value: 3,
                text: "be friends"
              },
              {
                value: 4,
                text: "become besties"
              },
              {
                value: 5,
                text: "be like family"
              }
            ]
          },
          {
            title: "Privacy",
            question: "Privacy means to me ... ",
            questionType: "CHOICE",
            number: 2,
            answerOptions: [
              {
                value: 1,
                text: "Mind your own business"
              },
              {
                value: 2,
                text: "Knock before you enter"
              },
              {
                value: 3,
                text: "My door is sometimes open"
              },
              {
                value: 4,
                text: "My door is mostly open"
              },
              {
                value: 5,
                text: "We can use the bathroom at the same time"
              }
            ]
          },
          {
            title: "Sharing",
            question: "Sharing is caring ... ",
            questionType: "CHOICE",
            number: 3,
            answerOptions: [
              {
                value: 1,
                text: "Don't touch my stuff"
              },
              {
                value: 2,
                text: "I will share in emergencies"
              },
              {
                value: 3,
                text: "If you ask nicely"
              },
              {
                value: 4,
                text: "Happy to share :-)"
              },
              {
                value: 5,
                text: "You can use everything"
              }
            ]
          },
          {
            title: "Kitchen",
            question: "This kitchen looks ... ",
            imageUrl: "/img/kitchen.jpg",
            questionType: "CHOICE",
            number: 4,
            answerOptions: [
              {
                value: 1,
                text: "Ewww. Disgusting"
              },
              {
                value: 2,
                text: "Too dirty for me"
              },
              {
                value: 3,
                text: "Just right for me"
              },
              {
                value: 4,
                text: "I would be happy if my place looked like that"
              },
              {
                value: 5,
                text: "Almost sterile - Like nobody lives there"
              }
            ]
          }
        ]
      },
      {
        title: "Yeah! Almost Done!",
        description: "We will treat your answers strictly confidential. We won't show them to anyone. Please indicate how much you agree with the following statements.",
        number: 4,
        questions: [
          {
            title: "Hardworking",
            question: "I am a hardworking person, who gets things done. ",
            questionType: "LIKERT",
            number: 1,
            answerOptions: [
              {
                value: 1,
                text: "Strongly Disagree"
              },
              {
                value: 2,
                text: "Disagree"
              },
              {
                value: 3,
                text: "Neutral"
              },
              {
                value: 4,
                text: "Agree"
              },
              {
                value: 5,
                text: "Strongly Agree"
              }
            ]
          },
          {
            title: "Tidy",
            question: "I keep my things tidy and clean. ",
            questionType: "LIKERT",
            number: 2,
            answerOptions: [
              {
                value: 1,
                text: "Strongly Disagree"
              },
              {
                value: 2,
                text: "Disagree"
              },
              {
                value: 3,
                text: "Neutral"
              },
              {
                value: 4,
                text: "Agree"
              },
              {
                value: 5,
                text: "Strongly Agree"
              }
            ]
          },
          {
            title: "Cold",
            question: "Some people think I am cold and calculating.",
            questionType: "LIKERT",
            number: 3,
            answerOptions: [
              {
                value: 1,
                text: "Strongly Disagree"
              },
              {
                value: 2,
                text: "Disagree"
              },
              {
                value: 3,
                text: "Neutral"
              },
              {
                value: 4,
                text: "Agree"
              },
              {
                value: 5,
                text: "Strongly Agree"
              }
            ]
          },
          {
            title: "Sensitive",
            question: "I always try to be sensitive and considerate.",
            questionType: "LIKERT",
            number: 4,
            answerOptions: [
              {
                value: 1,
                text: "Strongly Disagree"
              },
              {
                value: 2,
                text: "Disagree"
              },
              {
                value: 3,
                text: "Neutral"
              },
              {
                value: 4,
                text: "Agree"
              },
              {
                value: 5,
                text: "Strongly Agree"
              }
            ]
          },
          {
            title: "Helpless",
            question: "I often feel helpless and want someone else to solve my problems.",
            questionType: "LIKERT",
            number: 5,
            answerOptions: [
              {
                value: 1,
                text: "Strongly Disagree"
              },
              {
                value: 2,
                text: "Disagree"
              },
              {
                value: 3,
                text: "Neutral"
              },
              {
                value: 4,
                text: "Agree"
              },
              {
                value: 5,
                text: "Strongly Agree"
              }
            ]
          },
          {
            title: "Stressed",
            question: "I am often stressed and nervous.",
            questionType: "LIKERT",
            number: 6,
            answerOptions: [
              {
                value: 1,
                text: "Strongly Disagree"
              },
              {
                value: 2,
                text: "Disagree"
              },
              {
                value: 3,
                text: "Neutral"
              },
              {
                value: 4,
                text: "Agree"
              },
              {
                value: 5,
                text: "Strongly Agree"
              }
            ]
          },
          {
            title: "Hardworking",
            question: "When I read literature or look at art I sometimes get goosebumps or get really enthuastic.",
            questionType: "LIKERT",
            number: 7,
            answerOptions: [
              {
                value: 1,
                text: "Strongly Disagree"
              },
              {
                value: 2,
                text: "Disagree"
              },
              {
                value: 3,
                text: "Neutral"
              },
              {
                value: 4,
                text: "Agree"
              },
              {
                value: 5,
                text: "Strongly Agree"
              }
            ]
          },
          {
            title: "Bored",
            question: "I am bored by philosophical discussions.",
            questionType: "LIKERT",
            number: 8,
            answerOptions: [
              {
                value: 1,
                text: "Strongly Disagree"
              },
              {
                value: 2,
                text: "Disagree"
              },
              {
                value: 3,
                text: "Neutral"
              },
              {
                value: 4,
                text: "Agree"
              },
              {
                value: 5,
                text: "Strongly Agree"
              }
            ]
          },
          {
            title: "Hardworking",
            question: "I like being surrounded by many people.",
            questionType: "LIKERT",
            number: 9,
            answerOptions: [
              {
                value: 1,
                text: "Strongly Disagree"
              },
              {
                value: 2,
                text: "Disagree"
              },
              {
                value: 3,
                text: "Neutral"
              },
              {
                value: 4,
                text: "Agree"
              },
              {
                value: 5,
                text: "Strongly Agree"
              }
            ]
          },
          {
            title: "Cheerful",
            question: "I am a happy and cheerful person.",
            questionType: "LIKERT",
            number: 10,
            answerOptions: [
              {
                value: 1,
                text: "Strongly Disagree"
              },
              {
                value: 2,
                text: "Disagree"
              },
              {
                value: 3,
                text: "Neutral"
              },
              {
                value: 4,
                text: "Agree"
              },
              {
                value: 5,
                text: "Strongly Agree"
              }
            ]
          }
        ]
      }
    ]
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
  $scope.message = 'Login Controller message thingy.';
});

cvApp.controller('registerController', function($scope) {
});
