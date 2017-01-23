(function() {
    angular.module('uBlog').factory('commonDataFactory', function() {
        var obj = {};
        var poRecords;
        obj.setPoRecords = function(data) {
            poRecords = data;
        };
        obj.getPoRecords = function() {
            return poRecords;
        };

        return obj;

    });
})();
