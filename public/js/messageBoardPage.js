$("#menu-toggle").click(function(e){
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

// MESSAGE BOARD ANGULAR
var messager = angular.module('messageBoard', []);

messager.controller('sidebarController', function($scope, $http){
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