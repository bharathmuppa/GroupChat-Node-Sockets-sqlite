(function() {
    'use strict';
   
    angular.module('uBlog').config(configFn);
    configFn.$inject = ["$stateProvider", "$urlRouterProvider"];

    function configFn($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider.state('login', {
            url: '/login',
            component: 'login'

        } ).state('home', {
            url: '/home',
            component: 'home',
        });

    }

    //create a run function which used to create a global loading symbol 
    angular.module('uBlog').run(runFn);
    runFn.$inject = ["$rootScope"];

    function runFn($rootScope) {
        $rootScope.loginFlag = false;
         $rootScope.hideUserIcon = false;
    }
})();
