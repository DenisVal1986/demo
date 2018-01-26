/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 98);
/******/ })
/************************************************************************/
/******/ ({

/***/ 98:
/***/ (function(module, exports) {

(function (appSettings) {

    angular
        .module('app', ['ngRoute', 'ui.router', 'ngValidate', 'ngStorage', 'base64'])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$validatorProvider', '$httpProvider', '$localStorageProvider'];

    function config($stateProvider, $urlRouterProvider, $validatorProvider, $httpProvider, $localStorageProvider) {
        $stateProvider
            .state('about', {
                url: '/',
                templateUrl: '/js/app/about/about.view.html',
                controller: 'aboutController'
            })
            .state('blog', {
                url: '/blog',
                templateUrl: '/js/app/blog/blog.view.html',
                controller: 'blogController'
            })
            .state('gallery', {
                url: '/gallery',
                templateUrl: '/js/app/gallery/gallery.view.html',
                controller: 'galleryController'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: '/js/app/contact/contact.view.html',
                controller: 'contactController'
            });

        $urlRouterProvider.otherwise('/');

        $validatorProvider.setDefaults({
            errorElement: 'span'
        });
        $validatorProvider.setDefaultMessages({
            required: 'Это поле обязательно для заполнения.',
            email: 'Неверный формат email-адреса.'
        });
        $validatorProvider.addMethod('tel', function (value, element) {
            return /\+[\d\s\-]{9,}/.test(value);
        }, 'Неверный формат номера телефона.');

        $httpProvider.interceptors.push(['$q', function ($q) {
            return {
                'request': function (httpConfig) {
                    if (httpConfig.url.startsWith(appSettings.baseApiUrl) && $localStorageProvider.get('token')) {
                        httpConfig.headers['Authorization'] = $localStorageProvider.get('token');
                    }

                    return httpConfig;
                }
            };
        }]);

    }

    run.$inject = ['$rootScope'];

    function run($rootScope) {
        $rootScope.appSettings = appSettings;
    }
})({
    baseApiUrl: 'https://my-json-server.typicode.com/BelHardAcademy/HtmlJS/'
});

/***/ })

/******/ });