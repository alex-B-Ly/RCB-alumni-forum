// HOMEPAGE ANGULAR
var rcb = angular.module('RCBmessenger');


rcb.factory('socket', ['$rootScope', function($rootScope) {
  var socket = io('http://localhost:8080');

  return {
    on: function(eventName, callback){
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function(eventName, data) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
}]);

rcb.controller('navController', ['$rootScope', '$scope', '$http', '$state', function($rootScope, $scope, $http, $state){

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
        $rootScope.loggedIn = true;
        $rootScope.currentUser = result.data.firstName + ' ' + result.data.lastName;
      }
    });
    $scope.loginEmail = '';
    $scope.loginPassword = '';
  }

  //LOGOUT
  $scope.logout = function(){
    $rootScope.loggedIn = false;
    $rootScope.currentUser = undefined;
    $http({
      url: '/logout',
      method: 'POST'
    });
  }

}]);

// SIDEBAR AND MESSAGE CONTROLLER
rcb.controller('sidebarController', ['$rootScope', '$scope', '$http', '$state', 'socket', function($rootScope, $scope, $http, $state, socket){
  $scope.students = [];
  $scope.newMessages = [];

  $http({
    url:'/getstudents',
    method:'GET'
  }).then(function(result){
    console.log($rootScope.currentUser);
    console.log($rootScope.currentUserId);
    for(var i=0; i<result.data.length; i++){
      $scope.students.push(result.data[i]);
    }
  });

  $http({
    url:'/getmessages',
    method:'GET'
  }).then(function(result){
    // TODO Manipulate data and prepend to message list
    for(var i=0; i<result.data.length; i++){
      var message={
        user: result.data[i].username,
        msg: result.data[i].message
      }
      $scope.newMessages.push(message);
    }
  })

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
    socket.emit('message', {msg: $scope.message, user: $rootScope.currentUser});

    $http({
      url:'/messagestore',
      method: 'POST',
      data:{
        msg: $scope.message,
        username: $rootScope.currentUser
      }
    });

    $scope.message = "";
  }

  socket.on('spreadMessage', function(data){
    $scope.newMessages.push(data);
  });

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

// GITHUB TABLE SLIDE
$(document).on('click', '.github-show', function(e){
  e.preventDefault();
    $('.github-show').hide();
    $('.github-hide').show();
    $('.github-table').removeClass('github-table-inactive').addClass('github-table-active');
    $('.github-table').slideDown(1500);
});

$(document).on('click', '.github-hide', function(e){
  e.preventDefault();
  $('.github-hide').hide();
  $('.github-show').show();
  $('.github-table').removeClass('github-table-active').addClass('github-table-inactive');
  $('.github-table').slideUp(1500);
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



