var app = angular.module('plateRater', []);

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
			if(!$scope.state||$scope.state===''||!$scope.rating||$scope.rating===''){return;}
			$scope.ratings.push({state: $scope.state, rating: $scope.rating});
			$scope.state='';
			$scope.rating='';
		};
}]);