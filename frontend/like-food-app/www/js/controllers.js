angular.module('starter')
.controller('appCtrl', function($scope, $ionicModal, $rootScope, $location, $http, $ionicLoading, $timeout, $ionicPopup) {

  // var baseUrl = 'http://localhost:9999';
  var baseUrl = 'http://likefoodapp.herokuapp.com';

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('views/profile/profile.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // // Open the login modal
  // $scope.login = function() {
  //   $scope.modal.show();
  // };

  $scope.login = function() {
    $ionicLoading.show();
    $http.jsonp(baseUrl + '/api/user/login/' + $scope.loginData.email + '/' + $scope.loginData.password + '?callback=JSON_CALLBACK')
    .success(function(data, status, headers, config) {
        $ionicLoading.hide();
        console.log(data);
        $rootScope.userId = data;
        $location.path('/app/food');
      })
    .error(function(data, status, headers, config) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Ops...',
          template: 'Usuário inválido'
        });
      });
  };

  $scope.join = function() {
    $ionicLoading.show();
    $http.jsonp(baseUrl + '/api/user/join/' + $scope.loginData.name + '/' + $scope.loginData.email + '/' + $scope.loginData.password + '?callback=JSON_CALLBACK')
    .success(function(data, status, headers, config) {
        $ionicLoading.hide();
        $location.path('/app/food');
      })
    .error(function(data, status, headers, config) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Ops...',
          template: 'Usuário já existe'
        });
      });
  };

});
