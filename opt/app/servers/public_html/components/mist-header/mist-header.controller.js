/*jslint browser:true es5:true devel:true*/
/*global angular*/

(function () {
    "use strict";

    function HeaderController($scope) {
        console.log("I am in mist header controller !!!");
    }
    
    HeaderController.prototype = {
        getHeader: function() { }
    };

    HeaderController.$inject = [
       "$scope"
    ];

    angular
        .module("mist-header")
        .controller("mistHeaderCtrl", HeaderController);
}());