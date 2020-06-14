angular.module('starter')
.controller('foodCtrl', function ($scope, $rootScope, $http, $ionicLoading, $ionicSideMenuDelegate, TDCardDelegate) {

  // var baseUrl = 'http://localhost:9999';
  var baseUrl = 'http://likefoodapp.herokuapp.com';

  // console.log('CARDS CTRL');
  $ionicSideMenuDelegate.canDragContent(false);
  var cardTypes = [];
  $ionicLoading.show();
  //$http.get('https://randomuser.me/api/?results=5').success(function (response) {
  $http.jsonp(baseUrl + '/api/search/dish?callback=JSON_CALLBACK').
  // $http.jsonp('http://localhost:9999/api/search/dish?callback=JSON_CALLBACK').
  success(function(data, status, headers, config) {
      angular.forEach(data, function (apiResult) {
        cardTypes.push(apiResult);
        // console.log(JSON.stringify(apiResult));
      });
      $ionicLoading.hide();
    }).
    error(function(data, status, headers, config) {
        console.log("erro");
        console.log(status);
        console.log(data);
        // console.log(headers);
        // console.log(config);
    });

  //$scope.cards = Array.prototype.slice.call(cardTypes, 0);
  $scope.cards = cardTypes;
  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }

  function saveAction(type, dishId, userId) {
    $http.jsonp(baseUrl + '/api/evaluate/' + type + '/0/0/' + dishId + '/' + userId + '?callback=JSON_CALLBACK').
    success(function(data, status, headers, config) {
      console.log("ok");
    }).
    error(function(data, status, headers, config) {
      console.log("erro");
      console.log(status);
      console.log(data);
    });
  };

  function yesAction(index) {
    saveAction('like', $scope.cards[index]._id, $rootScope.userId);
  };

  function noAction(index) {
    saveAction('dislike', $scope.cards[index]._id, $rootScope.userId);
  };

  function match() {
    console.log('running match...');
  };

  $scope.yesCard = function(index) {
    // console.log('YES');
    $scope.cards.splice(index, 1);
    if(index == 0) match();
    yesAction(index);
  };

  $scope.noCard = function(index) {
    // console.log('NO');
    $scope.cards.splice(index, 1);
    if(index == 0) match();
    noAction(index);
  };

  $scope.cardSwipedLeft = function(index) {
    // console.log('LEFT SWIPE');
    // $scope.addCard();
    noAction(index);
  };
  
  $scope.cardSwipedRight = function(index) {
    // console.log('RIGHT SWIPE');
    // $scope.addCard();
    yesAction(index);
  };

  $scope.toggleLeft = function() {
    // console.log('TOGGLE LEFT');
    $ionicSideMenuDelegate.toggleLeft();
  };

});
