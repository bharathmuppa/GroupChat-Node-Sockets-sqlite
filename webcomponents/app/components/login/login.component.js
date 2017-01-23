(function() {
    'use strict';
    angular.module('uBlog').component('login', {
        binding: {},
        templateUrl: 'static/app/components/login/login.html',
        controller: function(serviceFactory, commonDataFactory, $state, $rootScope) {

            var login = this;
            $rootScope.hideUserIcon = true;
            login.onLogin = function() {
                if (login.username.length) {
                    $rootScope.username = sessionStorage.username=login.username;
                    $rootScope.hideUserIcon = false;
                     $state.go('home');


                } else {
                    alert("Please enter your username to start bloging");
                }

            }
        }
    });
})()
