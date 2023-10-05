"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var provider_1 = require("../provider");
var Ifs = (function (_super) {
    __extends(Ifs, _super);
    function Ifs(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.authUrl = this.options.authUri;
        this.defaults = {
            responseType: 'id_token'
        };
        if (!options.appScope || options.appScope.length <= 0) {
            throw new Error("A " + this.name + " app scope must exist");
        }
    }
    Ifs.prototype.optionsToDialogUrl = function (options) {
        var url = _super.prototype.optionsToDialogUrl.call(this, options);
        if (options.authType) {
            url += "&auth_type=" + options.authType;
        }
        url += "&nonce=1&pkceEnabled=true&response_mode=fragment";
        return url;
    };
    return Ifs;
}(provider_1.OAuthProvider));
exports.Ifs = Ifs;
