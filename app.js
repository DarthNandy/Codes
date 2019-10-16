var RecipeApp = angular.module('RecipeApp',['ngRoute']);
//Routes
RecipeApp.config(function ($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    .when('/recipe', {
        templateUrl: 'pages/recipe.htm',
        controller: 'recipeController'
    })
    .when('/cuisine/:dish', {
        templateUrl: 'pages/cuisine.htm',
        controller: 'cuisineController'
    })

})

//SERVICES
RecipeApp.service('dataService',function(){
    this.cuisines = Recipe;
    this.unique_results = [...new Set(this.cuisines.map(each => each.type))]
    this.cuisine_returned = "";
    this.handle=' ';
})
RecipeApp.controller('homeController', ['$scope','$log','dataService', function($scope,$log,dataService) {
    $scope.recipe = Recipe;
    console.log("service",dataService.cuisines);
    $scope.select= function(r){
        $scope.redit = r;

    }

    
    //$log.log($scope.recipe);


}]);
RecipeApp.controller('navController', ['$scope','$log','dataService','$routeParams', function($scope,$log,dataService,$routeParams) {
  
   $scope.unique_result = dataService.unique_results;
   $scope.select= function(r){
    $scope.redit = r;

}
   $scope.dish = $routeParams.dish;
   console.log($scope.dish)
   $scope.handle = dataService.handle;
   $scope.$watch('handle',function(){
       dataService.handle = $scope.handle;

   })
  

}]);
RecipeApp.controller('cuisineController', ['$scope','$log','dataService','$routeParams', function($scope,$log,dataService,$routeParams) {
    $scope.selectedCuisine = dataService.cuisines;
    $scope.select= function(r){
        $scope.redit = r;

    }
    $scope.dish = $routeParams.dish;
    $scope.$watch('handle',function(){
        dataService.handle = $scope.handle;
 
    })
    $scope.update = $scope.selectedCuisine.filter((dish)=>{
        if($scope.dish === dish.type){
            return { type: dish.type}
        }

    })

        
    

   console.log($scope.update)
   
    

}]);
RecipeApp.controller('recipeController', ['$scope','$log','dataService','$routeParams', function($scope,$log,dataService,$routeParams) {
    $scope.selectedCuisine = dataService.cuisines;
    $scope.select= function(r){
        $scope.redit = r;

    }
    $scope.handle = dataService.handle;
    $scope.$watch('handle',function(){
        dataService.handle = $scope.handle;
 
    })
    $scope.updaterecipe = $scope.selectedCuisine.filter((dish)=>{
        if($scope.handle === dish.type|| $scope.handle === dish.name){
            return { type: dish.type}
        }
    })
    console.log($scope.handle.match($scope.selectedCuisine.name))
    

}]);

RecipeApp.directive("dropdown",function(){
    return{
        restrict: "E",
        templateUrl: "directives/dropdown.htm"
    }

})
RecipeApp.directive("menu",function(){
    return{
        restrict: "E",
        templateUrl: "directives/menu.htm"
    }
})
