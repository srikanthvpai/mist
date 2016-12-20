/*jslint browser:true es5:true devel:true*/
/*global angular*/

(function() {
	"use-strict";
	function LogoDirective() {
		return {
		restrict: "EA",
		transclude: true,
		templateUrl: "./components/mist-logo/mist-logo.html",
		controller: "mistLogoCtrl",
		controllerAs: "lgc",
		bindToController: {},
		scope: {},
		replace: true
		};
	}
	angular.module("mist-logo")
		.directive("mistLogo",LogoDirective);

}());