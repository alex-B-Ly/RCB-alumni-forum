$("#menu-toggle").click(function(e){
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

// MESSAGE BOARD ANGULAR
var messager = angular.module('messageBoard', []);

messager.controller('sidebarController', function($scope, $http){

  $http({
    url:'/getstudents',
    method:'GET'
  }).then(function(result){
    console.log(result);
  });

});