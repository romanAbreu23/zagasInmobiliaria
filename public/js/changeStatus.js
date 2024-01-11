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

/***/ "./src/js/changeStatus.js":
/*!********************************!*\
  !*** ./src/js/changeStatus.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\r\n\r\n    const changeStatusBtn = document.querySelectorAll('.change-status');\r\n    const token = document.querySelector('meta[name=\"csrf-token\"]').getAttribute('content');\r\n\r\n    changeStatusBtn.forEach(btn => {\r\n        btn.addEventListener('click', changeStatusProperty)\r\n    });\r\n\r\n    async function changeStatusProperty(e) {\r\n        const { propertyId: id } = e.target.dataset;\r\n\r\n        try {\r\n            const url = `/propiedades/${id}`;\r\n\r\n            const result = await fetch(url, {\r\n                method: 'PUT',\r\n                headers: {\r\n                    'CSRF-Token': token\r\n                }\r\n            });\r\n\r\n            const { status } = await result.json()\r\n\r\n            if (status) {\r\n                if (e.target.classList.contains('bg-slate-100')) {\r\n                    \r\n                    e.target.classList.add('bg-green-100', 'hover:bg-green-200', 'text-green-800')\r\n                    e.target.classList.remove('bg-slate-100', 'hover:bg-slate-200', 'text-red-800')\r\n                    e.target.textContent = 'Publicado'\r\n                } else {\r\n                    e.target.classList.remove('bg-green-100', 'hover:bg-green-200', 'text-green-800')\r\n                    e.target.classList.add('bg-slate-100', 'hover:bg-slate-200', 'text-red-800')\r\n                    e.target.textContent = 'No publicado'\r\n                }\r\n            }\r\n\r\n        } catch (error) {\r\n            console.log(error);\r\n        }\r\n\r\n    }\r\n\r\n})()\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/changeStatus.js?");

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
/******/ 	__webpack_modules__["./src/js/changeStatus.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;