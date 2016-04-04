// HOMEPAGE ANGULAR
var home = angular.module('homepage', []);

home.controller('homepageController', function($scope, $http){

  // REGISTER
  $scope.register = function(){
    $http({
      method: 'POST',
      url: '/register',
      data: {
        firstName: $scope.registerFirstName,
        lastName: $scope.registerLastName,
        password: $scope.registerPassword,
        email: $scope.registerEmail,
        section: $scope.registerSection
      }
    }).then(function(result){
      console.log(result);
      // TODO manipulate result
    });
  }

  // LOGIN
  $scope.login = function(){
    $http({
      method: 'POST',
      url: '/login',
      data:{
        email: $scope.loginEmail,
        password: $scope.loginPassword
      }
    }).then(function(result){
      // TODO manipulate result
    });
  }

});