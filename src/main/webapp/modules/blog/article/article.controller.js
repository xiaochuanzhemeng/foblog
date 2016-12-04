app.controller("ArticleController", function($uibModal,$scope,ArticleService) {
	setScreenAvailHeight();
    $scope.loadingPath=loading_path;
    $scope.loaded = false;
    $scope.currentPage = 1;
    $scope.pageSize = 10;

    $scope.pageChanged = function() {
        //console.log('Page changed to: ' + $scope.currentPage);
        $scope.list($scope.currentPage, $scope.pageSize);
    };

	$scope.list = function(currentPage,pageSize){
		ArticleService.list(currentPage,pageSize,null).then(function(data){
//			console.log(data)
			$scope.articles = data.resultData.list;
			$scope.totalItems = data.resultData.pageConfig.allCount;
            $scope.loaded = true;
		});
	}
	
	$scope.list($scope.currentPage, $scope.pageSize);
});
