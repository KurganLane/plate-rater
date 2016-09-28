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
				controller: 'RatingsCtrl',
				resolve: {
					rating: ['$stateParams', 'ratings', function($stateParams, ratings){
						return ratings.get($stateParams.id);
					}]
				}
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

	o.get = function(id){
		return $http.get('/ratings/' + id).then(function(res){
			return res.data;
		});
	};

	o.create = function(rating){
		return $http.post('/ratings', rating).success(function(data){
			o.ratings.push(data);
		});
	};

	o.addComment = function(id, comment){
		return $http.post('/ratings/' + id + '/comments', comment);
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
	'ratings',
	'rating',
	function($scope, ratings, rating){
		$scope.rating = rating;

		$scope.addComment = function(){
			if($scope.body===''){return;}
			ratings.addComment(rating._id, {
				body: $scope.body
			}).success(function(comment){
				$scope.rating.comments.push(comment);
			});
			$scope.body='';
		};
}]);
