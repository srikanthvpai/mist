/*jslint browser:true es5:true devel:true*/
/*global angular*/

(function(){
	"use-strict";
	function LoginFormDirective() {
	return {
		restrict: "EA",
		transclude: true,
		templateUrl: "./components/mist-login-form/mist-login-form.html",
		controller: "mistLoginFormCtrl",
		controllerAs: "lfc",
		bindToController: {},
		scope: {},
		replace: true
		};
	}
	angular.module("mist-login-form")
		.directive("mistLoginForm",LoginFormDirective);
}());