var app = angular.module('plateRater', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MainCtrl'
			});
		$urlRouterProvider.otherwise('home');
}]);

app.factory('ratings', [function(){
	var o = {
		ratings: []
	};
	return o;
}]);

app.controller('MainCtrl', [
	'$scope',
	'ratings',
	function($scope, ratings){
		$scope.ratings = ratings.ratings;

		$scope.addRating = function(){
			if(!$scope.state||$scope.state===''||!$scope.number||$scope.number===''||!$scope.rating||$scope.rating===''){return;}
			$scope.ratings.push({state: $scope.state, number: $scope.number, rating: $scope.rating});
			$scope.state='';
			$scope.number='';
			$scope.rating='';
		};
}]);