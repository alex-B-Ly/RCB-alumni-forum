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
      console.log('front end result:', result);
      if(!result.data.firstName){
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
rcb.controller('sidebarController', ['$scope', '$http', function($scope, $http){
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
    $scope.profPic = this.student.profile.pic;
    $scope.profBio = this.student.profile.bio;
    $scope.profFirstName = this.student.firstName;
    $scope.profLastName = this.student.lastName;
    $scope.userSkills = this.student.profile.skills;
    $scope.profJobTitle = this.student.profile.jobTitle;
  }
}]);

// MESSAGE BOARD PAGE MENU TOGGLE
$(document).on('click', '#menu-toggle', function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});

// PROFILE EDIT CONTROLLER
rcb.controller('editController', ['$scope', '$http' ,function($scope, $http){
  
  $scope.updateProf = function(){
    $http({
      method: 'POST',
      url: '/updateprof',
      data:{
        'profile.pic': $scope.editPic,
        'profile.jobTitle': $scope.editJobTitle,
        'profile.jobDescription': $scope.editJobDesc,
        'profile.bio': $scope.editBio,
        'profile.currentlyLearning': $scope.editCurrentlyLearning,
        'profile.socialMedia.linkedIn': $scope.editLinkedIn,
        'profile.socialMedia.github': $scope.editGithub,
        'profile.socialMedia.twitter': $scope.editTwitter,
        'profile.socialMedia.facebook': $scope.editFacebook
      }
    });
  }
}]);


