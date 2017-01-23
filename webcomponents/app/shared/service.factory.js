(function() {
    angular.module('uBlog').factory('serviceFactory', function($http, $rootScope) {
        var obj = {};
        var serviceUrl = "http://127.0.0.1:3000/";
        $rootScope.socket = io.connect('http://127.0.0.1:3000');
        $rootScope.socket.on('chat message', function(user, msg) {
            $rootScope.chats.push({ "user": user, "DESCRIPTION": msg });
            setTimeout(function() {
                var objDiv = document.getElementsByClassName("chatApp")[0];
                objDiv.scrollTop = objDiv.scrollHeight;
            }, 100);
            $rootScope.$apply();

        });
        obj.callPostService = function(username, description) {
            $rootScope.socket.emit('chat message', username, description);
        };
        obj.callGetService = function(url, success) {
            $http({
                method: 'GET',
                url: serviceUrl + url,
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(function successCallback(response) {
                success(response.data);
            }, function errorCallback(response) {
                alert("Unable to connect to server, Please try after some time");
            });
        };
        obj.callResolveGetService = function(url) {
            return $http({
                method: 'GET',
                url: serviceUrl + url,
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        };
        return obj;
    });
})();
