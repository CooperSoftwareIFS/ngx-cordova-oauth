"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var provider_1 = require("../provider");
var Microsoft = (function (_super) {
    __extends(Microsoft, _super);
    function Microsoft(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.authUrl = 'https://login.microsoftonline.com/5ea75bc8-0410-41f2-8c73-bb5017d83a82/oauth2/token';
        this.defaults = {
            responseType: 'id_token'
        };
        if (!options.appScope || options.appScope.length <= 0) {
            throw new Error("A " + this.name + " app scope must exist");
        }
    }
    Microsoft.prototype.optionsToDialogUrl = function (options) {
        var url = _super.prototype.optionsToDialogUrl.call(this, options);
        if (options.authType) {
            url += "&auth_type=" + options.authType;
        }
        return url;
    };
    return Microsoft;
}(provider_1.OAuthProvider));
exports.Microsoft = Microsoft;
