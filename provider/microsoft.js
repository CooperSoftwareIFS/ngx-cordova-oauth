"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Microsoft = void 0;
var provider_1 = require("../provider");
var Microsoft = /** @class */ (function (_super) {
    __extends(Microsoft, _super);
    function Microsoft(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.authUrl = 'https://login.microsoftonline.com/5ea75bc8-0410-41f2-8c73-bb5017d83a82/oauth2/token';
        _this.defaults = {
            responseType: 'id_token'
        };
        if (!options.appScope || options.appScope.length <= 0) {
            throw new Error("A ".concat(_this.name, " app scope must exist"));
        }
        return _this;
    }
    Microsoft.prototype.optionsToDialogUrl = function (options) {
        var url = _super.prototype.optionsToDialogUrl.call(this, options);
        if (options.authType) {
            url += "&auth_type=".concat(options.authType);
        }
        return url;
    };
    return Microsoft;
}(provider_1.OAuthProvider));
exports.Microsoft = Microsoft;
