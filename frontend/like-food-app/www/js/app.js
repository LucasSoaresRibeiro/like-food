// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'appCtrl'
  })
  .state('app.food', {
      url: '/food',
      views: {
        'menuContent': {
          templateUrl: 'views/food/food.html',
          controller: 'foodCtrl'
        }
      }
    })
  .state('app.invite', {
            url: '/invite',
            views: {
              'menuContent': {
                templateUrl: 'views/invite/invite.html',
                controller: 'inviteCtrl'
              }
            }
  })
  .state('app.profile', {
            url: '/profile',
            views: {
              'menuContent': {
                templateUrl: 'views/profile/profile.html',
                controller: 'profileCtrl'
              }
            }
  })
  .state('app.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'views/settings/settings.html',
            controller: 'settingsCtrl'
          }
        }
      })
  .state('app.welcome', {
            url: '/welcome',
            views: {
              'menuContent': {
                templateUrl: 'views/welcome/welcome.html',
                controller: 'welcomeCtrl'
              }
            }
  })
  ;
  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/app/food');
  $urlRouterProvider.otherwise('/app/welcome');
})
.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})
;