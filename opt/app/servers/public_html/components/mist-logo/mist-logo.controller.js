/*jslint browser:true es5:true devel:true*/
/*global angular*/

(function() {
	function LogoController() {
		console.log("Inside Logo Controller !!!");
	}
	LogoController.prototype = {

	}
	LogoController.$inject = [];
	angular.module("mist-logo")
		.controller("mistLogoCtrl",LogoController);
}());