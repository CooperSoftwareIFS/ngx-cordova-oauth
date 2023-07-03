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
exports.OauthCordova = void 0;
var oauth_1 = require("../oauth");
function ensureEnvIsValid() {
    if (!window.cordova) {
        throw new Error('Cannot authenticate via a web browser');
    }
    if (!window.cordova.InAppBrowser) {
        throw new Error('The Apache Cordova InAppBrowser plugin was not found and is required');
    }
}
var OauthCordova = /** @class */ (function (_super) {
    __extends(OauthCordova, _super);
    function OauthCordova() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultWindowOptions = {
            location: 'no',
            clearsessioncache: 'yes',
            clearcache: 'yes'
        };
        return _this;
    }
    OauthCordova.prototype.openDialog = function (url, windowParams, options) {
        if (options === void 0) { options = {}; }
        var params = this.serializeOptions(windowParams);
        return new Promise(function (resolve, reject) {
            try {
                ensureEnvIsValid();
            }
            catch (error) {
                return reject(error);
            }
            var browserRef = window.cordova.InAppBrowser.open(url, '_blank', params);
            var exitListener = function () { return reject(new Error("The \"".concat(options.providerName, "\" sign in flow was canceled"))); };
            browserRef.addEventListener('loaderror', function () {
                browserRef.removeEventListener('exit', exitListener);
                browserRef.close();
                reject(new Error("Error loading login page of \"".concat(options.providerName, "\"")));
            });
            browserRef.addEventListener('loadstart', function (event) {
                if (event.url.indexOf(options.resolveOnUri) === 0) {
                    browserRef.removeEventListener('exit', exitListener);
                    browserRef.close();
                    resolve(event);
                }
            });
            return browserRef.addEventListener('exit', exitListener);
        });
    };
    return OauthCordova;
}(oauth_1.Oauth));
exports.OauthCordova = OauthCordova;
