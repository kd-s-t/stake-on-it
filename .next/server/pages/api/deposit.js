"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/deposit";
exports.ids = ["pages/api/deposit"];
exports.modules = {

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "next/dist/compiled/next-server/pages-api.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages-api.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages-api.runtime.dev.js");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = import("pg");;

/***/ }),

/***/ "(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fdeposit&preferredRegion=&absolutePagePath=.%2Fpages%2Fapi%2Fdeposit.ts&middlewareConfigBase64=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fdeposit&preferredRegion=&absolutePagePath=.%2Fpages%2Fapi%2Fdeposit.ts&middlewareConfigBase64=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   routeModule: () => (/* binding */ routeModule)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/pages-api/module.compiled */ \"(api)/./node_modules/next/dist/server/future/route-modules/pages-api/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(api)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(api)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var _pages_api_deposit_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/api/deposit.ts */ \"(api)/./pages/api/deposit.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_api_deposit_ts__WEBPACK_IMPORTED_MODULE_3__]);\n_pages_api_deposit_ts__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n// Import the userland code.\n\n// Re-export the handler (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_api_deposit_ts__WEBPACK_IMPORTED_MODULE_3__, \"default\"));\n// Re-export config.\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_api_deposit_ts__WEBPACK_IMPORTED_MODULE_3__, \"config\");\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesAPIRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES_API,\n        page: \"/api/deposit\",\n        pathname: \"/api/deposit\",\n        // The following aren't used in production.\n        bundlePath: \"\",\n        filename: \"\"\n    },\n    userland: _pages_api_deposit_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n\n//# sourceMappingURL=pages-api.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LXJvdXRlLWxvYWRlci9pbmRleC5qcz9raW5kPVBBR0VTX0FQSSZwYWdlPSUyRmFwaSUyRmRlcG9zaXQmcHJlZmVycmVkUmVnaW9uPSZhYnNvbHV0ZVBhZ2VQYXRoPS4lMkZwYWdlcyUyRmFwaSUyRmRlcG9zaXQudHMmbWlkZGxld2FyZUNvbmZpZ0Jhc2U2ND1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ0w7QUFDMUQ7QUFDbUQ7QUFDbkQ7QUFDQSxpRUFBZSx3RUFBSyxDQUFDLGtEQUFRLFlBQVksRUFBQztBQUMxQztBQUNPLGVBQWUsd0VBQUssQ0FBQyxrREFBUTtBQUNwQztBQUNPLHdCQUF3QixnSEFBbUI7QUFDbEQ7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsWUFBWTtBQUNaLENBQUM7O0FBRUQscUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGVhay1vbi1pdC8/N2Q2ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYWdlc0FQSVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvcGFnZXMtYXBpL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IGhvaXN0IH0gZnJvbSBcIm5leHQvZGlzdC9idWlsZC90ZW1wbGF0ZXMvaGVscGVyc1wiO1xuLy8gSW1wb3J0IHRoZSB1c2VybGFuZCBjb2RlLlxuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi4vcGFnZXMvYXBpL2RlcG9zaXQudHNcIjtcbi8vIFJlLWV4cG9ydCB0aGUgaGFuZGxlciAoc2hvdWxkIGJlIHRoZSBkZWZhdWx0IGV4cG9ydCkuXG5leHBvcnQgZGVmYXVsdCBob2lzdCh1c2VybGFuZCwgXCJkZWZhdWx0XCIpO1xuLy8gUmUtZXhwb3J0IGNvbmZpZy5cbmV4cG9ydCBjb25zdCBjb25maWcgPSBob2lzdCh1c2VybGFuZCwgXCJjb25maWdcIik7XG4vLyBDcmVhdGUgYW5kIGV4cG9ydCB0aGUgcm91dGUgbW9kdWxlIHRoYXQgd2lsbCBiZSBjb25zdW1lZC5cbmV4cG9ydCBjb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBQYWdlc0FQSVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5QQUdFU19BUEksXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9kZXBvc2l0XCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvZGVwb3NpdFwiLFxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGFyZW4ndCB1c2VkIGluIHByb2R1Y3Rpb24uXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcIlwiXG4gICAgfSxcbiAgICB1c2VybGFuZFxufSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhZ2VzLWFwaS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fdeposit&preferredRegion=&absolutePagePath=.%2Fpages%2Fapi%2Fdeposit.ts&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(api)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   hashPassword: () => (/* binding */ hashPassword),\n/* harmony export */   signToken: () => (/* binding */ signToken),\n/* harmony export */   verifyPassword: () => (/* binding */ verifyPassword),\n/* harmony export */   verifyToken: () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst JWT_SECRET = process.env.JWT_SECRET || \"fallback-secret\";\nconst hashPassword = (password)=>bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().hash(password, 12);\nconst verifyPassword = (password, hash)=>bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().compare(password, hash);\nconst signToken = (payload)=>jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign(payload, JWT_SECRET, {\n        expiresIn: \"7d\"\n    });\nconst verifyToken = (token)=>{\n    try {\n        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, JWT_SECRET);\n    } catch  {\n        return null;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUErQjtBQUNEO0FBRTlCLE1BQU1FLGFBQWFDLFFBQVFDLEdBQUcsQ0FBQ0YsVUFBVSxJQUFJO0FBRXRDLE1BQU1HLGVBQWUsQ0FBQ0MsV0FBcUJMLG9EQUFXLENBQUNLLFVBQVUsSUFBSTtBQUVyRSxNQUFNRSxpQkFBaUIsQ0FBQ0YsVUFBa0JDLE9BQWlCTix1REFBYyxDQUFDSyxVQUFVQyxNQUFNO0FBRTFGLE1BQU1HLFlBQVksQ0FBQ0MsVUFBaUJYLHdEQUFRLENBQUNXLFNBQVNULFlBQVk7UUFBRVcsV0FBVztJQUFLLEdBQUc7QUFFdkYsTUFBTUMsY0FBYyxDQUFDQztJQUMxQixJQUFJO1FBQ0YsT0FBT2YsMERBQVUsQ0FBQ2UsT0FBT2I7SUFDM0IsRUFBRSxPQUFNO1FBQ04sT0FBTztJQUNUO0FBQ0YsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL3N0ZWFrLW9uLWl0Ly4vbGliL2F1dGgudHM/YmY3ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcblxuY29uc3QgSldUX1NFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgJ2ZhbGxiYWNrLXNlY3JldCc7XG5cbmV4cG9ydCBjb25zdCBoYXNoUGFzc3dvcmQgPSAocGFzc3dvcmQ6IHN0cmluZykgPT4gYmNyeXB0Lmhhc2gocGFzc3dvcmQsIDEyKTtcblxuZXhwb3J0IGNvbnN0IHZlcmlmeVBhc3N3b3JkID0gKHBhc3N3b3JkOiBzdHJpbmcsIGhhc2g6IHN0cmluZykgPT4gYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIGhhc2gpO1xuXG5leHBvcnQgY29uc3Qgc2lnblRva2VuID0gKHBheWxvYWQ6IGFueSkgPT4gand0LnNpZ24ocGF5bG9hZCwgSldUX1NFQ1JFVCwgeyBleHBpcmVzSW46ICc3ZCcgfSk7XG5cbmV4cG9ydCBjb25zdCB2ZXJpZnlUb2tlbiA9ICh0b2tlbjogc3RyaW5nKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGp3dC52ZXJpZnkodG9rZW4sIEpXVF9TRUNSRVQpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTsiXSwibmFtZXMiOlsiand0IiwiYmNyeXB0IiwiSldUX1NFQ1JFVCIsInByb2Nlc3MiLCJlbnYiLCJoYXNoUGFzc3dvcmQiLCJwYXNzd29yZCIsImhhc2giLCJ2ZXJpZnlQYXNzd29yZCIsImNvbXBhcmUiLCJzaWduVG9rZW4iLCJwYXlsb2FkIiwic2lnbiIsImV4cGlyZXNJbiIsInZlcmlmeVRva2VuIiwidG9rZW4iLCJ2ZXJpZnkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./lib/auth.ts\n");

/***/ }),

/***/ "(api)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   query: () => (/* binding */ query)\n/* harmony export */ });\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pg */ \"pg\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([pg__WEBPACK_IMPORTED_MODULE_0__]);\npg__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst pool = new pg__WEBPACK_IMPORTED_MODULE_0__.Pool({\n    connectionString: process.env.DATABASE_URL\n});\nconst query = (text, params)=>{\n    return pool.query(text, params);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pool);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQTBCO0FBRTFCLE1BQU1DLE9BQU8sSUFBSUQsb0NBQUlBLENBQUM7SUFDcEJFLGtCQUFrQkMsUUFBUUMsR0FBRyxDQUFDQyxZQUFZO0FBQzVDO0FBRU8sTUFBTUMsUUFBUSxDQUFDQyxNQUFjQztJQUNsQyxPQUFPUCxLQUFLSyxLQUFLLENBQUNDLE1BQU1DO0FBQzFCLEVBQUU7QUFFRixpRUFBZVAsSUFBSUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3N0ZWFrLW9uLWl0Ly4vbGliL2RiLnRzPzFkZjAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUG9vbCB9IGZyb20gJ3BnJztcblxuY29uc3QgcG9vbCA9IG5ldyBQb29sKHtcbiAgY29ubmVjdGlvblN0cmluZzogcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMLFxufSk7XG5cbmV4cG9ydCBjb25zdCBxdWVyeSA9ICh0ZXh0OiBzdHJpbmcsIHBhcmFtcz86IGFueVtdKSA9PiB7XG4gIHJldHVybiBwb29sLnF1ZXJ5KHRleHQsIHBhcmFtcyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwb29sOyJdLCJuYW1lcyI6WyJQb29sIiwicG9vbCIsImNvbm5lY3Rpb25TdHJpbmciLCJwcm9jZXNzIiwiZW52IiwiREFUQUJBU0VfVVJMIiwicXVlcnkiLCJ0ZXh0IiwicGFyYW1zIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/db.ts\n");

/***/ }),

/***/ "(api)/./pages/api/deposit.ts":
/*!******************************!*\
  !*** ./pages/api/deposit.ts ***!
  \******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/db */ \"(api)/./lib/db.ts\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/auth */ \"(api)/./lib/auth.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_0__]);\n_lib_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nasync function handler(req, res) {\n    if (req.method !== \"POST\") {\n        return res.status(405).json({\n            error: \"Method not allowed\"\n        });\n    }\n    const token = req.headers.authorization?.replace(\"Bearer \", \"\");\n    const decoded = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.verifyToken)(token || \"\");\n    if (!decoded || typeof decoded === \"string\") {\n        return res.status(401).json({\n            error: \"Unauthorized\"\n        });\n    }\n    const { amount } = req.body;\n    const userId = decoded.userId;\n    try {\n        await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__.query)(\"BEGIN\");\n        await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__.query)(\"UPDATE users SET balance = balance + $1 WHERE id = $2\", [\n            amount,\n            userId\n        ]);\n        await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__.query)(\"INSERT INTO transactions (user_id, type, amount, description) VALUES ($1, $2, $3, $4)\", [\n            userId,\n            \"deposit\",\n            amount,\n            \"Fake money deposit\"\n        ]);\n        const result = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__.query)(\"SELECT balance FROM users WHERE id = $1\", [\n            userId\n        ]);\n        await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__.query)(\"COMMIT\");\n        res.status(200).json({\n            balance: result.rows[0].balance\n        });\n    } catch (error) {\n        await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__.query)(\"ROLLBACK\");\n        res.status(500).json({\n            error: \"Deposit failed\"\n        });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZGVwb3NpdC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDcUM7QUFDUTtBQUU5QixlQUFlRSxRQUFRQyxHQUFtQixFQUFFQyxHQUFvQjtJQUM3RSxJQUFJRCxJQUFJRSxNQUFNLEtBQUssUUFBUTtRQUN6QixPQUFPRCxJQUFJRSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBcUI7SUFDNUQ7SUFFQSxNQUFNQyxRQUFRTixJQUFJTyxPQUFPLENBQUNDLGFBQWEsRUFBRUMsUUFBUSxXQUFXO0lBQzVELE1BQU1DLFVBQVVaLHNEQUFXQSxDQUFDUSxTQUFTO0lBRXJDLElBQUksQ0FBQ0ksV0FBVyxPQUFPQSxZQUFZLFVBQVU7UUFDM0MsT0FBT1QsSUFBSUUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQWU7SUFDdEQ7SUFFQSxNQUFNLEVBQUVNLE1BQU0sRUFBRSxHQUFHWCxJQUFJWSxJQUFJO0lBQzNCLE1BQU1DLFNBQVMsUUFBaUJBLE1BQU07SUFFdEMsSUFBSTtRQUNGLE1BQU1oQiw4Q0FBS0EsQ0FBQztRQUVaLE1BQU1BLDhDQUFLQSxDQUNULHlEQUNBO1lBQUNjO1lBQVFFO1NBQU87UUFHbEIsTUFBTWhCLDhDQUFLQSxDQUNULHlGQUNBO1lBQUNnQjtZQUFRO1lBQVdGO1lBQVE7U0FBcUI7UUFHbkQsTUFBTUcsU0FBUyxNQUFNakIsOENBQUtBLENBQUMsMkNBQTJDO1lBQUNnQjtTQUFPO1FBRTlFLE1BQU1oQiw4Q0FBS0EsQ0FBQztRQUVaSSxJQUFJRSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVXLFNBQVNELE9BQU9FLElBQUksQ0FBQyxFQUFFLENBQUNELE9BQU87UUFBQztJQUN6RCxFQUFFLE9BQU9WLE9BQU87UUFDZCxNQUFNUiw4Q0FBS0EsQ0FBQztRQUNaSSxJQUFJRSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBaUI7SUFDakQ7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3N0ZWFrLW9uLWl0Ly4vcGFnZXMvYXBpL2RlcG9zaXQudHM/Mzk3NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSAnbmV4dC90eXBlcyc7XG5pbXBvcnQgeyBxdWVyeSB9IGZyb20gJy4uLy4uL2xpYi9kYic7XG5pbXBvcnQgeyB2ZXJpZnlUb2tlbiB9IGZyb20gJy4uLy4uL2xpYi9hdXRoJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXE6IE5leHRBcGlSZXF1ZXN0LCByZXM6IE5leHRBcGlSZXNwb25zZSkge1xuICBpZiAocmVxLm1ldGhvZCAhPT0gJ1BPU1QnKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA1KS5qc29uKHsgZXJyb3I6ICdNZXRob2Qgbm90IGFsbG93ZWQnIH0pO1xuICB9XG5cbiAgY29uc3QgdG9rZW4gPSByZXEuaGVhZGVycy5hdXRob3JpemF0aW9uPy5yZXBsYWNlKCdCZWFyZXIgJywgJycpO1xuICBjb25zdCBkZWNvZGVkID0gdmVyaWZ5VG9rZW4odG9rZW4gfHwgJycpO1xuICBcbiAgaWYgKCFkZWNvZGVkIHx8IHR5cGVvZiBkZWNvZGVkID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9KTtcbiAgfVxuXG4gIGNvbnN0IHsgYW1vdW50IH0gPSByZXEuYm9keTtcbiAgY29uc3QgdXNlcklkID0gKGRlY29kZWQgYXMgYW55KS51c2VySWQ7XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBxdWVyeSgnQkVHSU4nKTtcbiAgICBcbiAgICBhd2FpdCBxdWVyeShcbiAgICAgICdVUERBVEUgdXNlcnMgU0VUIGJhbGFuY2UgPSBiYWxhbmNlICsgJDEgV0hFUkUgaWQgPSAkMicsXG4gICAgICBbYW1vdW50LCB1c2VySWRdXG4gICAgKTtcbiAgICBcbiAgICBhd2FpdCBxdWVyeShcbiAgICAgICdJTlNFUlQgSU5UTyB0cmFuc2FjdGlvbnMgKHVzZXJfaWQsIHR5cGUsIGFtb3VudCwgZGVzY3JpcHRpb24pIFZBTFVFUyAoJDEsICQyLCAkMywgJDQpJyxcbiAgICAgIFt1c2VySWQsICdkZXBvc2l0JywgYW1vdW50LCAnRmFrZSBtb25leSBkZXBvc2l0J11cbiAgICApO1xuICAgIFxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHF1ZXJ5KCdTRUxFQ1QgYmFsYW5jZSBGUk9NIHVzZXJzIFdIRVJFIGlkID0gJDEnLCBbdXNlcklkXSk7XG4gICAgXG4gICAgYXdhaXQgcXVlcnkoJ0NPTU1JVCcpO1xuICAgIFxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgYmFsYW5jZTogcmVzdWx0LnJvd3NbMF0uYmFsYW5jZSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBhd2FpdCBxdWVyeSgnUk9MTEJBQ0snKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnRGVwb3NpdCBmYWlsZWQnIH0pO1xuICB9XG59Il0sIm5hbWVzIjpbInF1ZXJ5IiwidmVyaWZ5VG9rZW4iLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwic3RhdHVzIiwianNvbiIsImVycm9yIiwidG9rZW4iLCJoZWFkZXJzIiwiYXV0aG9yaXphdGlvbiIsInJlcGxhY2UiLCJkZWNvZGVkIiwiYW1vdW50IiwiYm9keSIsInVzZXJJZCIsInJlc3VsdCIsImJhbGFuY2UiLCJyb3dzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/deposit.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fdeposit&preferredRegion=&absolutePagePath=.%2Fpages%2Fapi%2Fdeposit.ts&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();