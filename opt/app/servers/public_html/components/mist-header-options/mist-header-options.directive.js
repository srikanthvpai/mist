	/*jslint browser:true es5:true devel:true*/
/*global angular*/

(function(){
	"use strict";
	function HeaderOptionsDirective() {
	return {
		restrict: "EA",
		transclude: true,
		templateUrl: "./components/mist-header-options/mist-header-options.html",
		controller: "mistHeaderOptionsCtrl",
		controllerAs: "ohc",
		bindToController: {},
		scope: {},
		replace: true
		};
	}
	angular.module("mist-header-options")
		   .directive("mistHeaderOptions",HeaderOptionsDirective);
}());