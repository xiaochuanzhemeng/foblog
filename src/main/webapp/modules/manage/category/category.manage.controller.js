app.controller("CategoryManageController", function($location,$uibModal, $scope,
		CategoryManageService) {
	$scope.isCategoryNav = true;
	setScreenAvailHeight();
	$scope.list = function() {
		CategoryManageService.list().then(function(data) {
			console.log(data)
			$scope.categorys = data.resultData;
		})
	}

	$scope.editArticle = function(category) {
		CategoryManageService.getArticles(category.id).then(function(data) {
			// 需要判断请求是否成功，其他地方也是，暂时还没有进行处理
			console.log(data);
			var modalInstance = $uibModal.open({
				templateUrl : 'editArticle.html',
				controller : 'editArticleCtrl',
				backdrop : 'static',
				size : 'lg',
				resolve : {
					categoryArticles : function() {
						return data.resultData;
					},
					category:function(){
						return category;
					}
				}
			});

			modalInstance.result.then(function(articleId) {
				if(articleId!=null){
					$location.path("/manage/article/preview/"+articleId);
				}
			});
		})
	}
	
	$scope.editCategory = function(category){
		var modalInstance = $uibModal.open({
			templateUrl : 'editCategory.html',
			controller : 'editCategoryCtrl',
			backdrop : 'static',
			size : 'lg',
			resolve : {
				category:function(){
					return category;
				}
			}
		});
		modalInstance.result.then(function(_category) {
			if(_category!=null){
				CategoryManageService.update(_category).then(function(data){
//					console.log(data);
				})
			}
		});
	}
	
	$scope.deleteCategory = function(category){
		var modalInstance = $uibModal.open({
			templateUrl : 'deleteCategory.html',
			controller : 'deleteCategoryCtrl',
			backdrop : 'static',
			size : 'md',
			resolve : {
				category:function(){
					return category;
				}
			}
		});
		modalInstance.result.then(function(categoryId) {
			if(categoryId!=null){
				CategoryManageService.deleteById(categoryId).then(function(data){
//					console.log(data);
					$scope.list();
				})
			}
		});
	}

	$scope.list();

});

app.controller("editArticleCtrl", function($uibModalInstance, $scope,
		categoryArticles,category) {
	$scope.categoryArticles = categoryArticles;
	$scope.category = category;
	$scope.goArticle = function(articleId){
//		console.log(articleId)
		$uibModalInstance.close(articleId);
	}
	$scope.cancelEditArticle = function() {
		$uibModalInstance.dismiss('cancel');
	}
});

app.controller("editCategoryCtrl",function($uibModalInstance, CategoryManageService,$scope,category){
	$scope.editCategory = category;
	$scope.confirmEditCategory = function(editCategory){
//		console.log(editCategory)
		var _category = {
			id:editCategory.id,
			name:editCategory.name,
			authorId:editCategory.authorId,
			parentId:editCategory.parentId
		}
		$uibModalInstance.close(_category);
	};
	$scope.cancelEditCategory = function() {
		$uibModalInstance.dismiss('cancel');
	}
});
app.controller("deleteCategoryCtrl",function($scope,$uibModalInstance,category,CategoryManageService){
	$scope.category = category;
	$scope.cancelDeleteCategory = function(){
		$uibModalInstance.dismiss('cancel');
	};
	$scope.deleteCategory = function(categoryId){
		$uibModalInstance.close(categoryId);
	}
});