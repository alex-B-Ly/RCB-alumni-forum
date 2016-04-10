angular.module('RCBmessenger', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/welcome');

  $stateProvider
  .state('welcome', {
    url: '/welcome',
    templateUrl: '/views/welcome.html'
  });

  $stateProvider
  .state('messageboard', {
    url: '/messageboard',
    templateUrl: '/views/messageboardpage.html'
  });

  $stateProvider
  .state('profileedit', {
    url: '/profileedit',
    templateUrl: '/views/profileEdit.html'
  });  

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});