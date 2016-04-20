var socket = io('http://localhost:8080');
// HOMEPAGE ANGULAR
var rcb = angular.module('RCBmessenger');

rcb.controller('navController', ['$scope', '$http', '$state', function($scope, $http, $state){

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
      if(!result.data.firstName){
        $scope.loginFail = true;
        $scope.newRegister = false;
      }else{
        $scope.user = result.data.firstName + ' ' + result.data.lastName;
        $scope.loggedIn = true;
      }
    });
    $scope.loginEmail = '';
    $scope.loginPassword = '';
  }

  //LOGOUT
  $scope.logout = function(){
    $scope.loggedIn = false;
    $http({
      url: '/logout',
      method: 'POST'
    });
  }

}]);

// SIDEBAR POPULATE STUDENTS
rcb.controller('sidebarController', ['$scope', '$http', '$state', function($scope, $http, $state){
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
    $scope.userId = this.student.id;
    $scope.profPic = this.student.profile.pic;
    $scope.profBio = this.student.profile.bio;
    $scope.profFirstName = this.student.firstName;
    $scope.profLastName = this.student.lastName;
    $scope.userSkills = this.student.profile.skills;
    $scope.profJobTitle = this.student.profile.jobTitle;
  }

  $scope.showProf = function(){
    $state.go('userprofile', {id: this.userId});
  }

  $scope.sendMessage = function(){
    socket.emit('message', {stuff: $scope.message});
    // TODO Save $scope.message into DB

    $scope.message = "";
  }

}]);

// MESSAGE BOARD PAGE MENU TOGGLE
$(document).on('click', '#menu-toggle', function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});


// DISGUSTING MODAL FIX
$(document).on('click', '#profile_button', function(event) {
  event.preventDefault();
  $('#profileView').modal('hide');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();
});

// PROFILE EDIT CONTROLLER
rcb.controller('editController', ['$scope', '$http', '$state' ,function($scope, $http, $state){
  $scope.newSkills = [];

  $http({
    method: 'GET',
    url: '/profedit',
  }).then(function(user){
    var userStuff = user.data;
    $scope.jobTitleInfo = userStuff.profile.jobTitle;
    $scope.jobDescriptionInfo = userStuff.profile.jobDescription;
    $scope.bioInfo = userStuff.profile.bio;
  });

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
        'profile.socialMedia.githubUsername': $scope.editGithubUsername,
        'profile.socialMedia.twitter': $scope.editTwitter,
        'profile.socialMedia.facebook': $scope.editFacebook,
        'newSkills': $scope.newSkills
      }
    });
    // console.log('newSkills arr: ',$scope.newSkills)
  }

  $scope.skillAdd = function(){
    if($scope.editAddSkill.length === 0){
      return;
    }

    $scope.newSkills.push($scope.editAddSkill);
    $scope.editAddSkill = "";
  }

}]);

// SHOW PROFILE
rcb.controller('profileController', ['$scope', '$http', '$state', '$filter', 'NgTableParams', function($scope, $http, $state, $filter, NgTableParams){

  $http({
    method: 'GET',
    url: '/user/' + $state.params.id,
    data:{_id: $state.params.id}
  }).then(function(result){
    $scope.fname = result.data.firstName;
    $scope.lname = result.data.lastName;
    $scope.jobTitle = result.data.profile.jobTitle;
    $scope.bio = result.data.profile.bio;
    $scope.jobDesc = result.data.profile.jobDescription;
    $scope.pic = result.data.profile.pic;
    $scope.skills = result.data.profile.skills;
    $scope.facebookLink = result.data.profile.socialMedia.facebook;
    $scope.githubLink = result.data.profile.socialMedia.github;
    $scope.githubUsername = result.data.profile.socialMedia.githubUsername;
    $scope.twitterLink = result.data.profile.socialMedia.twitter;
    $scope.linkedinLink = result.data.profile.socialMedia.linkedIn;
  });

  // TODO Add Github table functionality below
  $scope.githubTable = new NgTableParams({}, {
    getData: function($defer, params) {
      return $http.get('https://api.github.com/users/' + $scope.githubUsername + '/repos')
      .then(function (response) {
        var filteredData = $filter('filter')(response.data, params.filter());
        var sortedData = $filter('orderBy')(filteredData, params.orderBy());
        return sortedData;
      });  
    }
  });
  
  $scope.loadRepos = function() {
    $scope.githubTable.reload();
  }  
}]);

