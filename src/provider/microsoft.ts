import {IOAuthOptions, OAuthProvider} from "../provider";

export interface MsOptions extends IOAuthOptions {
    authType?: string;
    tenantId? :string;

}

export class Microsoft extends OAuthProvider {

    options: MsOptions;
    protected authUrl: string = 'https://login.microsoftonline.com/';
    protected defaults: Object = {
        responseType: 'id_token'
    };

    constructor(options: MsOptions = {}) {
        super(options);

        if (!options.appScope || options.appScope.length <= 0) {
            throw new Error(`A ${this.name} app scope must exist`);
        }
    }

    protected optionsToDialogUrl(options) {
        let url = super.optionsToDialogUrl(options);

        if (options.authType) {
            url += `&auth_type=${options.authType}`;
        }

        return url;
    }

}
