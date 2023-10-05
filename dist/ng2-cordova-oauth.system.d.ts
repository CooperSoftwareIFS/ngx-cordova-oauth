declare module "utility" {
    export const utils: {
        parseQueryString(url: string): Object;
        defaults(target: Object, ...sources: Object[]): Object;
    };
}
declare module "provider" {
    import { IOauthProvider } from "oauth";
    export interface IOAuthOptions {
        clientId?: string;
        appScope?: string[];
        redirectUri?: string;
        responseType?: string;
        state?: string;
    }
    export class OAuthProvider implements IOauthProvider {
        options: IOAuthOptions;
        protected APP_SCOPE_DELIMITER: string;
        protected authUrl: string;
        protected defaults: Object;
        constructor(options?: IOAuthOptions);
        name: string;
        parseResponseInUrl(url: any): Object;
        dialogUrl(): string;
        protected optionsToDialogUrl(options: any): string;
        protected serializeAppScope(scope: any): any;
        protected isValid(response: any): any;
    }
}
declare module "oauth" {
    import { OAuthProvider } from "provider";
    export class Oauth {
        defaultWindowOptions: Object;
        login(provider: OAuthProvider, windowOptions?: Object): Promise<Object>;
        logInVia(provider: OAuthProvider, windowOptions?: Object): Promise<Object>;
        protected serializeOptions(options: Object): string;
        protected openDialog(url: string, windowParams: Object, options?: any): Promise<any>;
    }
    export interface IOauthProvider {
        parseResponseInUrl(url: string): Object;
    }
}
declare module "provider/microsoft" {
    import { IOAuthOptions, OAuthProvider } from "provider";
    export interface MsOptions extends IOAuthOptions {
        authType?: string;
        tenantId?: string;
    }
    export class Microsoft extends OAuthProvider {
        options: MsOptions;
        protected authUrl: string;
        protected defaults: Object;
        constructor(options?: MsOptions);
        protected optionsToDialogUrl(options: any): string;
    }
}
declare module "provider/ifs" {
    import { IOAuthOptions, OAuthProvider } from "provider";
    export interface IfsOptions extends IOAuthOptions {
        authUri?: string;
        authType?: string;
    }
    export class Ifs extends OAuthProvider {
        options: IfsOptions;
        protected authUrl: string;
        protected defaults: Object;
        constructor(options?: IfsOptions);
        protected optionsToDialogUrl(options: any): string;
    }
}
declare module "core" {
    export * from "oauth";
    export * from "provider/microsoft";
    export * from "provider/ifs";
}
declare module "platform/cordova" {
    import { Oauth } from "oauth";
    export class OauthCordova extends Oauth {
        defaultWindowOptions: {
            location: string;
            clearsessioncache: string;
            clearcache: string;
        };
        protected openDialog(url: string, windowParams: Object, options?: any): Promise<{}>;
    }
}
declare module "platform/browser" {
    import { Oauth } from "oauth";
    export class OauthBrowser extends Oauth {
        static WATCH_POPUP_TIMEOUT: number;
        defaultWindowOptions: {
            width: number;
            location: number;
            toolbar: number;
        };
        protected openDialog(url: string, params: Object, options?: any): Promise<{}>;
        private addWindowRect(params);
    }
}
