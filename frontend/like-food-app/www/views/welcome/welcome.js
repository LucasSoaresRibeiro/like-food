angular.module('starter')
.controller('welcomeCtrl', function($scope, $location, $http, $ionicLoading, $ionicModal, $ionicSideMenuDelegate, $timeout, $state, $ionicSlideBoxDelegate) {

	$ionicSideMenuDelegate.canDragContent(false);

	// Called to navigate to the main app
	$scope.startApp = function () {
		// $state.go('main');
		$location.path('/app/food');
	};
	$scope.next = function () {
		$ionicSlideBoxDelegate.next();
	};
	$scope.previous = function () {
		$ionicSlideBoxDelegate.previous();
	};

	// Called each time the slide changes
	$scope.slideChanged = function (index) {
		$scope.slideIndex = index;
	};

})
;