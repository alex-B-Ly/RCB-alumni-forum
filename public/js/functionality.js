// HOMEPAGE ANGULAR
var home = angular.module('homepage', []);

home.controller('homepageController', function($scope, $http){

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

});