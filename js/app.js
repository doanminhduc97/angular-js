var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: "./page/home.html"
		})
		.when('/favorite', {
			templateUrl: "./page/favorite.html"
		});
});

app.controller('mainCtrl', function ($scope, $sce, $http) {
	/**
	 * Sinh viên viết code làm bài test tại chỗ này
	*/
	$http.get('data/movies.json').then(function (res) {
		// Truyền dữ liệu qua view
		$scope.movies = res.data
	});
	// luu danh sach phim yeu thich vao mang
	$scope.moviesFavorite = [];
	const items = localStorage.getItem('movie')
	if (items) {
		$scope.moviesFavorite = angular.fromJson(items);
	}

	$scope.showMovie = function (m) {
		// Them phim vao danh sach phim yeu thich
		$scope.moviesFavorite.push(m);
		localStorage.setItem('movie', angular.toJson($scope.moviesFavorite));
	}

	$scope.clearMovie = function () {
		// xoa danh sach phim yeu thich
		$scope.moviesFavorite = [];
		localStorage.clear();
	}
})