/*jslint browser:true es5:true devel:true*/
/*global angular*/

(function () {
    "use strict";

    function HeaderDirective() {
        return {
            restrict: "EA",
            transclude: true,
            templateUrl: "./components/mist-header/mist-header.html",
            controller: "mistHeaderCtrl",
            controllerAs: "mhc",
            bindToController: { },
            scope: {},
            replace: true
        };
    }

    angular
        .module("mist-header")
        .directive("mistHeader", HeaderDirective);

}());