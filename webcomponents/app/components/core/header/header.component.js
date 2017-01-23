(function() {
    'use strict';
    angular.module('uBlog').component('header', {
        binding: {},
        templateUrl: 'static/app/components/core/header/header.html',
        controller: function(serviceFactory, commonDataFactory,$rootScope) {
            var header = this;
            $rootScope.hideUserIcon =true;
          
        }
    });

})();
