"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthProvider = void 0;
var utility_1 = require("./utility");
var DEFAULTS = {
    redirectUri: 'http://localhost/callback'
};
var OAuthProvider = /** @class */ (function () {
    function OAuthProvider(options) {
        if (options === void 0) { options = {}; }
        this.APP_SCOPE_DELIMITER = ',';
        this.authUrl = '';
        this.defaults = {};
        this.options = utility_1.utils.defaults(options, DEFAULTS);
    }
    Object.defineProperty(OAuthProvider.prototype, "name", {
        get: function () {
            return this.constructor.name || this.authUrl;
        },
        enumerable: false,
        configurable: true
    });
    OAuthProvider.prototype.parseResponseInUrl = function (url) {
        var response = utility_1.utils.parseQueryString(url);
        if (!this.isValid(response)) {
            var error = new Error("Problem authenticating with ".concat(this.name));
            Object.defineProperty(error, 'response', { value: response });
            throw error;
        }
        return response;
    };
    OAuthProvider.prototype.dialogUrl = function () {
        return this.optionsToDialogUrl(this.options);
    };
    OAuthProvider.prototype.optionsToDialogUrl = function (options) {
        utility_1.utils.defaults(options, this.defaults);
        var url = "".concat(this.authUrl, "?client_id=").concat(options.clientId, "&redirect_uri=").concat(options.redirectUri);
        if (options.appScope) {
            url += "&scope=".concat(this.serializeAppScope(options.appScope));
        }
        if (options.state) {
            url += "&state=".concat(options.state);
        }
        if (options.responseType) {
            url += "&response_type=".concat(options.responseType);
        }
        return url + "&nonce=1";
    };
    OAuthProvider.prototype.serializeAppScope = function (scope) {
        return typeof scope.join === 'function' ? scope.join(this.APP_SCOPE_DELIMITER) : scope;
    };
    OAuthProvider.prototype.isValid = function (response) {
        return !response.error && (response.code || response['access_token']);
    };
    return OAuthProvider;
}());
exports.OAuthProvider = OAuthProvider;
