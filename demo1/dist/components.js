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
/******/ 	return __webpack_require__(__webpack_require__.s = 99);
/******/ })
/************************************************************************/
/******/ ({

/***/ 100:
/***/ (function(module, exports) {

(function () {
    'use strict';

    angular
        .module('app')
        .controller('aboutController', aboutController);

    aboutController.$inject = ['$scope', '$sessionStorage'];

    function aboutController($scope, $sessionStorage) {
        $scope.model = {
            name: 'Денис Валентюкевич',
            birthday: '11.07.1986',
            education: 'Высшее'
        }

        $scope.video = {
            time: $sessionStorage.videoTime || 0,
            sources: [{
                type: 'video/mp4',
                src: 'http://techslides.com/demos/sample-videos/small.mp4'
            }],
            onended: function () {
                $scope.video.ended = $sessionStorage.videoEnded = true;
                $scope.$apply();
            },
            ended: $sessionStorage.videoEnded,
            control: {},
            reset: function () {
                if ($scope.video.control.reset) {
                    $scope.video.control.reset()
                }

                $scope.video.ended = $sessionStorage.videoEnded = false;
            }
        };

        $scope.$watch('video.time', function (newValue) {
            $sessionStorage.videoTime = newValue;
        });
    }
})();

/***/ }),

/***/ 101:
/***/ (function(module, exports) {

(function () {
    'use strict';

    angular
        .module('app')
        .controller('blogController', blogController);

    blogController.$inject = ['$scope', '$http', 'blogService']

    function blogController($scope, $http, blogService) {
        blogService.getBlogItems(function (items) {
            $scope.blogItems = items;
        });
    }

})();

/***/ }),

/***/ 102:
/***/ (function(module, exports) {

(function () {
    'use strict';
    angular
        .module('app')
        .controller('contactController', contactController);

    contactController.$inject = ['$scope', 'contactService'];

    function contactController($scope, contactService) {
        $scope.validationOptions = {
            rules: {
                phone: {
                    tel: true,
                    required: true
                },
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true
                }
            }
        };

        $scope.send = function (form) {
            if (!form.validate()) {
                return false;
            }

            contactService.send({
                    name: $scope.model.name,
                    phone: $scope.model.phone,
                    email: $scope.model.email,
                    message: $scope.model.message
                },
                function () {
                    $scope.messageSent = true;
                }
            );
        }

        $scope.reset = function () {
            $scope.model = {};
            $scope.messageSent = false;
        }
    }

})();

/***/ }),

/***/ 103:
/***/ (function(module, exports) {

(function () {
    'use strict'

    angular
        .module('app')
        .directive('formInput', formInput);

    function formInput() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/js/app/directives/form-input.directive.html',
            scope: {
                name: '@',
                value: '=',
                type: '@',
                title: '@',
                placeholder: '@'
            }
        }
    }
})();

/***/ }),

/***/ 104:
/***/ (function(module, exports) {

(function () {
    'use strict'

    angular
        .module('app')
        .directive('modal', modal);

    function modal() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    var target = element;
                    if (attrs.target) {
                        target = '#' + attrs.target;
                    }

                    $(target).modal({ onRenderContent: attrs.render });
                    return false;
                });
            }
        }
    }
})();

/***/ }),

/***/ 105:
/***/ (function(module, exports) {

(function () {
    'use strict'

    angular
        .module('app')
        .directive('ngVideo', video);

    function video() {
        return {
            restrict: 'E',
            scope: {
                currentTime: '=',
                sources: '=',
                onEnded: '&',
                control: '='
            },
            replace: true,
            templateUrl: '/js/app/directives/ngvideo.directive.html',
            link: function (scope, element, attrs) {
                element[0].currentTime = scope.currentTime || 0;
                
                var control = scope.control || {};
                control.reset = function () {
                    element[0].currentTime = 0;
                    element[0].play();
                }

                element[0].onended = function () {
                    scope.onEnded();
                };

                element[0].ontimeupdate = function () {
                    scope.currentTime = element[0].currentTime;
                    scope.$apply();
                };
            }
        }
    }
})();

/***/ }),

/***/ 106:
/***/ (function(module, exports) {

(function () {
    'user strict';

    angular
        .module('app')
        .filter('dots', dotsFilter);

    function dotsFilter() {
        return function (value, count) {
            if (!value) {
                return value;
            }

            var dotsCount = count || 3;
            for (var i = value.length - 1; value[i] === '.'; i--) {
                dotsCount--;
            }

            var output = value;
            for (var i = 0; i < dotsCount; i++) {
                output = output + '.';
            }

            return output;
        }
    }
})();

/***/ }),

/***/ 107:
/***/ (function(module, exports) {

(function () {
    'use strict';

    angular
        .module('app')
        .controller('galleryController', galleryController);

    galleryController.$inject = ['$scope', 'galleryService']

    function galleryController($scope, galleryService) {
        galleryService.getGallery(function (gallery) {
            $scope.gallery = gallery;
            $scope.modal = function (e) {
                var $current = $(e.currentTarget);
                $current.modal({
                    onRenderContent: renderContent
                });

                function renderContent($content) {
                    var $title = $('<h2/>').text($content.attr('alt'));
                    var $arrowLeft = $('<div id="arrowLeft"/>')
                        .click(function () {
                            updateContent($current.prev());
                        })
                        .append($('<i class="fa fa-arrow-left"/>'));

                    var $arrowRight = $('<div id="arrowRight"/>')
                        .click(function () {
                            updateContent($current.next());
                        })
                        .append($('<i class="fa fa-arrow-right"/>'));

                    updateContent($current);

                    return $('<div/>')
                        .append($title)
                        .append($('<div class="modalContent">')
                            .append($arrowLeft)
                            .append($content)
                            .append($arrowRight));

                    function updateContent($newElement) {
                        if (!$newElement.length) {
                            return;
                        }

                        $current = $newElement;
                        $content.attr('src', $current.attr('data-original-src'))
                        $title.text($current.attr('alt'));
                        toggleArrows();
                    }

                    function toggleArrows() {
                        if (!$current.prev().length) {
                            $arrowLeft.hide();
                        } else {
                            $arrowLeft.show();
                        }

                        if (!$current.next().length) {
                            $arrowRight.hide();
                        } else {
                            $arrowRight.show();
                        }
                    }
                }
            };
        })
    }

})();

/***/ }),

/***/ 108:
/***/ (function(module, exports) {

(function () {
    'use strict'

    angular
        .module('app')
        .controller('menuController', menuController);

    menuController.$inject = ['$scope', 'authService'];

    function menuController($scope, authService) {
        $scope.authorized = authService.isAuthorized();
        $scope.validationOptions = {
            rules: {
                login: {
                    required: true,
                    email: true
                },
                password: {
                    required: true
                }
            }
        };

        $scope.login = function (form) {
            if (!form.validate()) {
                return false;
            }
            
            authService.login({
                    login: $scope.model.login,
                    password: $scope.model.password
                },
                function () {
                    $scope.authorized = true;
                }
            );
        }

        $scope.logout = function(){
            authService.logout();
            $scope.authorized = false;
        }
    }
})();

/***/ }),

/***/ 109:
/***/ (function(module, exports) {

(function () {
    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = ['$localStorage', '$base64'];

    function authService($localStorage, $base64) {
        return {
            login: function (model, successCalback) {
                $localStorage.login = model.login;
                $localStorage.token = `Basic ${$base64.encode(model.login + model.password)}`;
                successCalback();
            },
            logout: function () {
                delete $localStorage.login;
                delete $localStorage.token;
            },
            isAuthorized: function () {
                return $localStorage.token !== undefined;
            }
        }
    }
})();

/***/ }),

/***/ 110:
/***/ (function(module, exports) {

(function () {
    'use strict'

    angular
        .module('app')
        .factory('blogService', blogService);

    blogService.$inject = ['$http', '$rootScope']

    function blogService($http, $rootScope) {
        var service = {
            getBlogItems: function (successCallback) {
                $http({
                        url: $rootScope.appSettings.baseApiUrl + 'blog-items',
                        method: 'GET'
                    })
                    .then(function (response) {
                        successCallback(response.data);
                    })
            }
        };

        return service;
    }
})();

/***/ }),

/***/ 111:
/***/ (function(module, exports) {

(function () {
    'use strict'
    var lastId = 1000;
    angular
        .module('app')
        .factory('contactService', contactService);

    contactService.$inject = ['$http', '$rootScope']

    function contactService($http, $rootScope) {
        var service = {
            send: function (message, successCallback) {
                var data = Object.assign({
                    id: lastId++
                }, message);
                $http({
                        url: $rootScope.appSettings.baseApiUrl + 'messages',
                        method: 'POST',
                        data: data
                    })
                    .then(function (response) {
                        successCallback(response.data);
                    })
            }
        };

        return service;
    }
})();

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

(function () {
    'use strict'

    angular
        .module('app')
        .factory('galleryService', galleryService);

    galleryService.$inject = ['$http', '$rootScope']

    function galleryService($http, $rootScope) {
        var service = {
            getGallery: function (successCallback) {
                $http({
                        url: $rootScope.appSettings.baseApiUrl + 'gallery-photos',
                        method: 'GET'
                    })
                    .then(function (response) {
                        successCallback(response.data);
                    })
            }
        };

        return service;
    }
})();

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(100);
__webpack_require__(101);
__webpack_require__(102);
__webpack_require__(103);
__webpack_require__(104);
__webpack_require__(105);
__webpack_require__(106);
__webpack_require__(107);
__webpack_require__(108);
__webpack_require__(109);
__webpack_require__(110);
__webpack_require__(111);
module.exports = __webpack_require__(112);


/***/ })

/******/ });