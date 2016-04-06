// HOMEPAGE ANGULAR
var rcb = angular.module('RCBmessenger');

rcb.controller('homepageController', function($scope, $http){

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
      $scope.newRegister = true;
      $scope.loginFail = false;
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
      if(result.data === ""){
        $scope.loginFail = true;
        $scope.newRegister = false;
      }else{
        console.log(result.data);
        $scope.user = result.data.firstName + ' ' + result.data.lastName;
        $scope.loggedIn = true;
      }
    });
  }

});

// SIDEBAR POPULATE STUDENTS
rcb.controller('sidebarController', function($scope, $http){
  $scope.students = [];

  $http({
    url:'/getstudents',
    method:'GET'
  }).then(function(result){
    for(var i=0; i<result.data.length; i++){
      $scope.students.push(result.data[i]);
    }
  });
});

// MESSAGE BOARD PAGE

$("#menu-toggle").click(function(e){
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
