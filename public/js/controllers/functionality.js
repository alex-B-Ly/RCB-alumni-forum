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
    $scope.profJobTitle = this.student.profile.jobTitle;
  }
});

//GITHUB TABLE
rcb.controller('GithubController', function($scope, $http, $filter, NgTableParams) {
  $scope.githubTable = new NgTableParams({}, {
    getData: function($defer, params) {
      return $http.get('https://api.github.com/users/' + $scope.username + '/repos')
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
