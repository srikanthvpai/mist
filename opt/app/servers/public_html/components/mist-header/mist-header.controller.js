/*jslint browser:true es5:true devel:true*/
/*global angular*/

(function () {
    "use strict";

    function HeaderController() {
        
    }
    
    HeaderController.prototype = {
        getHeader: function() { }
    };

    HeaderController.$inject = [
       
    ];

    angular
        .module("mist-header")
        .controller("mistHeaderCtrl", HeaderController);
}());