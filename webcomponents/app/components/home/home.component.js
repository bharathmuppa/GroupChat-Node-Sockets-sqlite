(function() {
    'use strict';
    angular.module('uBlog').component('home', {
        binding: {},
        templateUrl: 'static/app/components/home/home.html',
        controller: function(serviceFactory, commonDataFactory, $state, $rootScope) {
            var home = this;
            home.description = "";
            if (!sessionStorage.username) {
                $state.go('login');
            } else {
                $rootScope.username = sessionStorage.username;
                $rootScope.hideUserIcon = false;
                serviceFactory.callGetService('getAllMessages', function(data) {
                    $rootScope.chats = data || [];
                    setTimeout(function() {
                        var objDiv = document.getElementsByClassName("chatApp")[0];
                        objDiv.scrollTop = objDiv.scrollHeight;
                    }, 100);

                }.bind(home))
            }

            home.submitData = function() {
                if (home.message.length > 140) {
                    alert("You can't enter more than 140 characters ");
                    return;
                }
                serviceFactory.callPostService($rootScope.username, home.message);
                $rootScope.chats.push({ "user": $rootScope.username, "DESCRIPTION": home.message });
                home.message = "";
                setTimeout(function() {
                    var objDiv = document.getElementsByClassName("chatApp")[0];
                    objDiv.scrollTop = objDiv.scrollHeight;
                }, 100);

            }

        }
    });
})()
