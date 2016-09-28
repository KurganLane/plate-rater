var app = angular.module('plateRater', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MainCtrl',
				resolve: {
					postPromise: ['ratings', function(ratings){
						return ratings.getAll();
					}]
				}
			});

		$stateProvider
			.state('ratings',{
				url: '/ratings/{id}',
				templateUrl: '/ratings.html',
				controller: 'RatingsCtrl'
			});
		$urlRouterProvider.otherwise('home');
}]);

app.factory('ratings', ['$http', function($http){
	var o = {
		ratings: []
	};

	o.getAll = function(){
		return $http.get('/ratings').success(function(data){
			angular.copy(data, o.ratings);
		});
	};

	o.create = function(rating){
		return $http.post('/ratings', rating).success(function(data){
			o.ratings.push(data);
		});
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
			ratings.create({state: $scope.state, number: $scope.number, rating: $scope.rating, comments: []});
			$scope.state='';
			$scope.number='';
			$scope.rating='';
		};
}]);

app.controller('RatingsCtrl',[
	'$scope',
	'$stateParams',
	'ratings',
	function($scope, $stateParams, ratings){
		$scope.rating = ratings.ratings[$stateParams.id];

		$scope.addComment = function(){
			if($scope.body===''){return;}
			$scope.rating.comments.push($scope.body);
			$scope.body='';
		};
}]);
