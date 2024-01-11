/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/filtersHome.js":
/*!*******************************!*\
  !*** ./src/js/filtersHome.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// mobile nav\r\nconst mobileNav = document.querySelector('.mnav');\r\nconst closeBtn = document.querySelector('.mnav__close-btn');\r\nconst closeBtnIcn = document.querySelector('.mnav__close-btn-icon');\r\n\r\nconst navOpenedClass = 'left-0';\r\nconst navClosedClass = '-left-[300px]';\r\nconst arrowLeftClass = 'ri-arrow-left-s-line';\r\nconst arrowRightClass = 'ri-menu-2-line';\r\n\r\ncloseBtn.addEventListener('click', () => {\r\n    if(mobileNav.classList.contains(navClosedClass)) {\r\n        mobileNav.classList.remove(navClosedClass);\r\n        mobileNav.classList.add(navOpenedClass);\r\n\r\n        closeBtnIcn.classList.toggle(arrowLeftClass);\r\n        closeBtnIcn.classList.toggle(arrowRightClass);\r\n    } else {\r\n        mobileNav.classList.add(navClosedClass);\r\n        mobileNav.classList.remove(navOpenedClass);\r\n\r\n        closeBtnIcn.classList.toggle(arrowLeftClass);\r\n        closeBtnIcn.classList.toggle(arrowRightClass);\r\n    }\r\n});\r\n\r\n// faq\r\nconst faqItems = document.querySelectorAll('.faq__item');\r\n\r\nfaqItems.forEach((item) => {\r\n    const faqBtn = item.querySelector('.faq__btn');\r\n\r\n    item.addEventListener('click', () => {\r\n        const isOpen = item.classList.toggle('open');\r\n        const iconClass = isOpen ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line';\r\n        const iconElement = faqBtn.querySelector('i');\r\n\r\n        iconElement.classList = `${iconClass} text-2xl`;\r\n    });\r\n});\r\n\r\n// Search\r\ndocument.addEventListener('keyup', (e) => {\r\n\r\n    if (e.target.matches('#search')) {\r\n        document.querySelectorAll(\".result\").forEach(property => {\r\n            property.textContent.toLowerCase().includes(e.target.value.toLowerCase()) ? property.classList.remove(\"filter\") : property.classList.add(\"filter\")\r\n        })\r\n    }\r\n});\r\n\r\n// const sendMessage = document.querySelector('.send-message');\r\n// const error = document.querySelector('.error');\r\n\r\n// sendMessage.addEventListener('click', () => {\r\n\r\n//     if (!error) {\r\n//         Swal.fire({\r\n//             position: \"center\",\r\n//             icon: \"success\",\r\n//             title: \"¡Gracias por contactarnos!\",\r\n//             showConfirmButton: false,\r\n//             timer: 2000\r\n//         });\r\n//     }\r\n// });\n\n//# sourceURL=webpack://zagas_inmobiliaria/./src/js/filtersHome.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/filtersHome.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;