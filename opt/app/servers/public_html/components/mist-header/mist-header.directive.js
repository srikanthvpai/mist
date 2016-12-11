/*jslint browser:true es5:true devel:true*/
/*global angular*/

(function () {
    "use strict";

    function HeaderDirective() {
        return {
            restrict: "EA",
            transclude: true,
            templateUrl: "./public_html/components/mist-header/mist-header.html",
            controller: "mistHeaderCtrl",
            controllerAs: "hoc",
            bindToController: { },
            scope: {},
            replace: true
        };
    }

    angular
        .module("mist-header")
        .directive("mistHeader", HeaderDirective);
}());