var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("utility", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var utils;
    return {
        setters:[],
        execute: function() {
            exports_1("utils", utils = {
                parseQueryString: function (url) {
                    var values = url.split(/[?#]{1,2}/)[1].split('&');
                    return values.reduce(function (map, value) {
                        var _a = value.split('='), paramName = _a[0], paramValue = _a[1];
                        map[decodeURIComponent(paramName)] = decodeURIComponent(paramValue);
                        return map;
                    }, {});
                },
                defaults: function (target) {
                    var sources = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        sources[_i - 1] = arguments[_i];
                    }
                    sources.forEach(function (source) {
                        for (var prop in source) {
                            if (!target.hasOwnProperty(prop)) {
                                target[prop] = source[prop];
                            }
                        }
                    });
                    return target;
                }
            });
        }
    }
});
System.register("provider", ["utility"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var utility_1;
    var DEFAULTS, OAuthProvider;
    return {
        setters:[
            function (utility_1_1) {
                utility_1 = utility_1_1;
            }],
        execute: function() {
            DEFAULTS = {
                redirectUri: 'http://localhost/callback'
            };
            OAuthProvider = (function () {
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
                    enumerable: true,
                    configurable: true
                });
                OAuthProvider.prototype.parseResponseInUrl = function (url) {
                    var response = utility_1.utils.parseQueryString(url);
                    if (!this.isValid(response)) {
                        var error = new Error("Problem authenticating with " + this.name);
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
                    var url = this.authUrl + "?client_id=" + options.clientId + "&redirect_uri=" + options.redirectUri;
                    if (options.appScope) {
                        url += "&scope=" + this.serializeAppScope(options.appScope);
                    }
                    if (options.state) {
                        url += "&state=" + options.state;
                    }
                    if (options.responseType) {
                        url += "&response_type=" + options.responseType;
                    }
                    return url;
                };
                OAuthProvider.prototype.serializeAppScope = function (scope) {
                    return typeof scope.join === 'function' ? scope.join(this.APP_SCOPE_DELIMITER) : scope;
                };
                OAuthProvider.prototype.isValid = function (response) {
                    return !response.error && (response.code || response['id_token']);
                };
                return OAuthProvider;
            }());
            exports_2("OAuthProvider", OAuthProvider);
        }
    }
});
/*
 * Angular 2 (ng2) Cordova Oauth
 * Created by Nic Raboy
 * http://www.nraboy.com
 */
System.register("oauth", ["utility"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var utility_2;
    var Oauth;
    return {
        setters:[
            function (utility_2_1) {
                utility_2 = utility_2_1;
            }],
        execute: function() {
            /*
             * The main driver class for connections to each of the providers.
             */
            Oauth = (function () {
                function Oauth() {
                    this.defaultWindowOptions = {};
                }
                Oauth.prototype.login = function (provider, windowOptions) {
                    if (windowOptions === void 0) { windowOptions = {}; }
                    console.warn("\n        new CordovaOauth().login(...) is deprecated and will be removed in the next release.\n        Please use new CordovaOauth().logInVia(...) instead.\n      ");
                    return this.logInVia(provider, windowOptions);
                };
                Oauth.prototype.logInVia = function (provider, windowOptions) {
                    if (windowOptions === void 0) { windowOptions = {}; }
                    var url = provider.dialogUrl();
                    return this.openDialog(url, utility_2.utils.defaults(windowOptions, this.defaultWindowOptions), {
                        resolveOnUri: provider.options.redirectUri,
                        providerName: provider.name
                    }).then(function (event) {
                        return provider.parseResponseInUrl(event.url);
                    });
                };
                Oauth.prototype.serializeOptions = function (options) {
                    var chunks = [];
                    for (var prop in options) {
                        if (options.hasOwnProperty(prop)) {
                            chunks.push(prop + "=" + options[prop]);
                        }
                    }
                    return chunks.join(',');
                };
                Oauth.prototype.openDialog = function (url, windowParams, options) {
                    if (options === void 0) { options = {}; }
                    return Promise.reject(new Error('Not implemented'));
                };
                return Oauth;
            }());
            exports_3("Oauth", Oauth);
        }
    }
});
System.register("provider/microsoft", ["provider"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var provider_1;
    var Microsoft;
    return {
        setters:[
            function (provider_1_1) {
                provider_1 = provider_1_1;
            }],
        execute: function() {
            Microsoft = (function (_super) {
                __extends(Microsoft, _super);
                function Microsoft(options) {
                    if (options === void 0) { options = {}; }
                    _super.call(this, options);
                    this.authUrl = "https://login.microsoftonline.com/" + this.options.tenantId + "/oauth2/authorize";
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
                    url += "&nonce=1&pkceEnabled=true&response_mode=fragment";
                    return url;
                };
                return Microsoft;
            }(provider_1.OAuthProvider));
            exports_4("Microsoft", Microsoft);
        }
    }
});
System.register("provider/ifs", ["provider"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var provider_2;
    var Ifs;
    return {
        setters:[
            function (provider_2_1) {
                provider_2 = provider_2_1;
            }],
        execute: function() {
            Ifs = (function (_super) {
                __extends(Ifs, _super);
                function Ifs(options) {
                    if (options === void 0) { options = {}; }
                    _super.call(this, options);
                    this.authUrl = this.options.authUri;
                    this.defaults = {
                        responseType: 'code'
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
                    return url;
                };
                return Ifs;
            }(provider_2.OAuthProvider));
            exports_5("Ifs", Ifs);
        }
    }
});
System.register("core", ["oauth", "provider/microsoft", "provider/ifs"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_6(exports);
    }
    return {
        setters:[
            function (oauth_1_1) {
                exportStar_1(oauth_1_1);
            },
            function (microsoft_1_1) {
                exportStar_1(microsoft_1_1);
            },
            function (ifs_1_1) {
                exportStar_1(ifs_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("platform/cordova", ["oauth"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var oauth_2;
    var OauthCordova;
    function ensureEnvIsValid() {
        if (!window.cordova) {
            throw new Error('Cannot authenticate via a web browser');
        }
        if (!window.cordova.InAppBrowser) {
            throw new Error('The Apache Cordova InAppBrowser plugin was not found and is required');
        }
    }
    return {
        setters:[
            function (oauth_2_1) {
                oauth_2 = oauth_2_1;
            }],
        execute: function() {
            OauthCordova = (function (_super) {
                __extends(OauthCordova, _super);
                function OauthCordova() {
                    _super.apply(this, arguments);
                    this.defaultWindowOptions = {
                        location: 'no',
                        clearsessioncache: 'yes',
                        clearcache: 'yes'
                    };
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
                        var exitListener = function () { return reject(new Error("The \"" + options.providerName + "\" sign in flow was canceled")); };
                        browserRef.addEventListener('loaderror', function () {
                            browserRef.removeEventListener('exit', exitListener);
                            browserRef.close();
                            reject(new Error("Error loading login page of \"" + options.providerName + "\""));
                        });
                        browserRef.addEventListener('loadstart', function (event) {
                            console.log("loadStarted" + event);
                            console.log("loadStarted2" + event.url);
                            if (event.url.indexOf(options.resolveOnUri) === 0) {
                                console.log("if is hit");
                                browserRef.removeEventListener('exit', exitListener);
                                browserRef.close();
                                resolve(event);
                            }
                        });
                        return browserRef.addEventListener('exit', exitListener);
                    });
                };
                return OauthCordova;
            }(oauth_2.Oauth));
            exports_7("OauthCordova", OauthCordova);
        }
    }
});
System.register("platform/browser", ["oauth", "utility"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var oauth_3, utility_3;
    var OauthBrowser;
    return {
        setters:[
            function (oauth_3_1) {
                oauth_3 = oauth_3_1;
            },
            function (utility_3_1) {
                utility_3 = utility_3_1;
            }],
        execute: function() {
            OauthBrowser = (function (_super) {
                __extends(OauthBrowser, _super);
                function OauthBrowser() {
                    _super.apply(this, arguments);
                    this.defaultWindowOptions = {
                        width: 600,
                        location: 1,
                        toolbar: 0,
                    };
                }
                OauthBrowser.prototype.openDialog = function (url, params, options) {
                    if (options === void 0) { options = {}; }
                    var windowParams = this.addWindowRect(utility_3.utils.defaults({ title: 'Authentication' }, params));
                    var title = windowParams.title;
                    delete windowParams.title;
                    var popup = window.open(url, title, this.serializeOptions(windowParams));
                    var watchDelay = this.constructor.WATCH_POPUP_TIMEOUT;
                    return new Promise(function (resolve, reject) {
                        if (typeof popup.focus === 'function') {
                            popup.focus();
                        }
                        setTimeout(function watchPopup() {
                            try {
                                if (popup.closed) {
                                    return reject(new Error("The \"" + options.providerName + "\" sign in flow was canceled"));
                                }
                                if (popup.location.href.indexOf(options.resolveOnUri) === 0) {
                                    popup.close();
                                    resolve({ url: popup.location.href });
                                }
                            }
                            catch (e) {
                            }
                            setTimeout(watchPopup, watchDelay);
                        }, watchDelay);
                    });
                };
                OauthBrowser.prototype.addWindowRect = function (params) {
                    var root = document.documentElement;
                    var screenX = typeof window.screenX !== 'undefined' ? window.screenX : window.screenLeft;
                    var screenY = typeof window.screenY !== 'undefined' ? window.screenY : window.screenTop;
                    var outerWidth = typeof window.outerWidth !== 'undefined' ? window.outerWidth : root.clientWidth;
                    var outerHeight = typeof window.outerHeight !== 'undefined' ? window.outerHeight : root.clientHeight - 22;
                    screenX = screenX < 0 ? window.screen.width + screenX : screenX;
                    params.height = Math.floor(outerHeight * 0.8);
                    params.left = Math.floor(screenX + (outerWidth - params.width) / 2);
                    params.top = Math.floor(screenY + (outerHeight - params.height) / 2.5);
                    return params;
                };
                OauthBrowser.WATCH_POPUP_TIMEOUT = 100;
                return OauthBrowser;
            }(oauth_3.Oauth));
            exports_8("OauthBrowser", OauthBrowser);
        }
    }
});
