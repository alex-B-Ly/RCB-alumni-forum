// HOMEPAGE ANGULAR
var rcb = angular.module('RCBmessenger');

rcb.controller('navController', function($scope, $http){

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
    console.log(result);
    for(var i=0; i<result.data.length; i++){
      $scope.students.push(result.data[i]);
    }
  });

  $scope.profileModal = function(){
    $scope.profBio = this.student.profile.bio;
    $scope.profFirstName = this.student.firstName;
    $scope.profLastName = this.student.lastName;
    $scope.userSkills = this.student.profile.skills;
  }
});

// MESSAGE BOARD PAGE MENU TOGGLE
$(document).on('click', '#menu-toggle', function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});

// PROFILE EDIT CONTROLLER
rcb.controller('editController', function($scope, $http){
  $scope.test ="Working";
});
