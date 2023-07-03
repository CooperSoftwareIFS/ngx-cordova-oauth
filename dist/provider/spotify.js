"use strict";
// Spotify web api authorization guide and scopes
// https://developer.spotify.com/web-api/authorization-guide
// https://developer.spotify.com/web-api/using-scopes/
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
exports.Spotify = void 0;
var provider_1 = require("../provider");
var Spotify = /** @class */ (function (_super) {
    __extends(Spotify, _super);
    function Spotify() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.authUrl = 'https://accounts.spotify.com/authorize';
        _this.APP_SCOPE_DELIMITER = ' ';
        _this.defaults = {
            responseType: 'token'
        };
        return _this;
    }
    return Spotify;
}(provider_1.OAuthProvider));
exports.Spotify = Spotify;
