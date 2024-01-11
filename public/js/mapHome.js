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

/***/ "./helpers/priceFormat.js":
/*!********************************!*\
  !*** ./helpers/priceFormat.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   propertyPrice: () => (/* binding */ propertyPrice)\n/* harmony export */ });\nconst propertyPrice = (price) => \r\n    Number(price).toLocaleString('en-US', {\r\n        style: 'currency',\r\n        currency: 'USD'\r\n    })\n\n//# sourceURL=webpack://bienesraices_mvc/./helpers/priceFormat.js?");

/***/ }),

/***/ "./src/js/mapHome.js":
/*!***************************!*\
  !*** ./src/js/mapHome.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_priceFormat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/priceFormat.js */ \"./helpers/priceFormat.js\");\n\r\n\r\n(function() {\r\n\r\n    const lat = 18.6034212;\r\n    const lng = -96.5625503;\r\n    const map = L.map('map-home').setView([lat, lng ], 7);\r\n\r\n    let markers = new L.FeatureGroup().addTo(map);\r\n    let properties = [];\r\n\r\n    // Filtros\r\n    const filters = {\r\n        category: '',\r\n        price: '',\r\n        sellRent: '',\r\n        bedrooms: '',\r\n        wc: '',\r\n        garage: '',\r\n        pets: '',\r\n        pool: '',\r\n    };\r\n\r\n    const categoriesSelect = document.querySelector('#categories');\r\n    const pricesSelect = document.querySelector('#prices');\r\n    const sellRentSelect = document.querySelector('#sellRent');\r\n    const bedroomsSelect = document.querySelector('#bedrooms');\r\n    const wcSelect = document.querySelector('#wc');\r\n    const garageSelect = document.querySelector('#garage');\r\n    const petsSelect = document.querySelector('#pets');\r\n    const poolSelect = document.querySelector('#pool');\r\n\r\n    // IMPORTANTE para mostrar el mapa\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(map)\r\n\r\n    // Filtrar las categorias y precios\r\n    categoriesSelect.addEventListener('change', e => {\r\n        filters.category = +e.target.value\r\n        filterProperties();\r\n    });\r\n    pricesSelect.addEventListener('change', e => {\r\n        filters.price = +e.target.value\r\n        filterProperties();\r\n    });\r\n    sellRentSelect.addEventListener('change', e => {\r\n        filters.sellRent = e.target.value\r\n        filterProperties();\r\n    });\r\n    bedroomsSelect.addEventListener('change', e => {\r\n        filters.bedrooms = +e.target.value\r\n        filterProperties();\r\n    });\r\n    wcSelect.addEventListener('change', e => {\r\n        filters.wc = +e.target.value\r\n        filterProperties();\r\n    });\r\n    garageSelect.addEventListener('change', e => {\r\n        filters.garage = +e.target.value\r\n        filterProperties();\r\n    });\r\n    petsSelect.addEventListener('change', e => {\r\n        filters.pets = e.target.value\r\n        filterProperties();\r\n    });\r\n    poolSelect.addEventListener('change', e => {\r\n        filters.pool = e.target.value\r\n        filterProperties();\r\n    });\r\n\r\n    const getProperties = async () => {\r\n        try {\r\n\r\n            const url = '/api/propiedades';\r\n            const result = await fetch(url);\r\n            properties = await result.json();\r\n\r\n            showProperties(properties);\r\n\r\n        } catch (error) {\r\n            console.log(error);\r\n        }\r\n    }\r\n\r\n    const showProperties = properties => {\r\n\r\n        // Limpiar los markers previos\r\n        markers.clearLayers();\r\n\r\n        properties.forEach(property => {\r\n            // Agregar los pines\r\n            const marker = new L.marker([property?.lat, property?.lng], {\r\n                autoPan: true\r\n            })\r\n            .addTo(map)\r\n            .bindPopup(`\r\n                <a href=\"/propiedad/${property?.id}\">\r\n                    <div class=\"overflow-hidden cursor-pointer group\">\r\n                        <h1 class=\"text-xl font-semibold capitalize text-primary truncate\">${property?.title}</h1>\r\n                        <div class=\"relative overflow-hidden py-2\">\r\n                            <img \r\n                                src=\"/uploads/${property?.images[0].name}\" \r\n                                alt=\"Imagen de la propiedad ${property?.title}\" \r\n                                class=\"object-cover h-12 w-full group-hover:scale-110 transition-all duration-500\"\r\n                            >\r\n                        </div>\r\n                        <p class=\"text-accent font-bold text-base\">${property?.category.name}</p>\r\n                        <p class=\"text-hover text-right text-lg font-semibold px-4\">${(0,_helpers_priceFormat_js__WEBPACK_IMPORTED_MODULE_0__.propertyPrice)(property?.realPrice)}</p>\r\n                    </div>\r\n                </a>\r\n            `)\r\n\r\n            markers.addLayer(marker)\r\n        })\r\n    };\r\n\r\n    const filterProperties = () => {\r\n        const reult = properties.filter(filterCategory)\r\n            .filter(filterPrice).filter(filterSellRent)\r\n            .filter(filterBedroom).filter(filterWc)\r\n            .filter(filterGarage).filter(filterPets)\r\n            .filter(filterPool);\r\n\r\n        showProperties(reult);\r\n    };\r\n\r\n    const filterCategory = property => filters.category ? property.categoryId === filters.category : property;\r\n    const filterPrice = property => filters.price ? property.priceId === filters.price : property;\r\n    const filterSellRent = property => filters.sellRent ? property.sellRent === filters.sellRent : property;\r\n    const filterBedroom = property => filters.bedrooms ? property.bedrooms === filters.bedrooms : property;\r\n    const filterWc = property => filters.wc ? property.wc === filters.wc : property;\r\n    const filterGarage = property => filters.garage ? property.garage === filters.garage : property;\r\n    const filterPets = property => filters.pets ? property.pets === filters.pets : property;\r\n    const filterPool = property => filters.pool ? property.pool === filters.pool : property;\r\n\r\n    getProperties();\r\n\r\n})()\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/mapHome.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/mapHome.js");
/******/ 	
/******/ })()
;