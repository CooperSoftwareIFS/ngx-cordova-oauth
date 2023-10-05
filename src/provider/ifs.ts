import {IOAuthOptions, OAuthProvider} from "../provider";

export interface IfsOptions extends IOAuthOptions {
    authUri?: string;
    authType?: string;
}

export class Ifs extends OAuthProvider {

    options: IfsOptions;
    protected authUrl: string = this.options.authUri;
    protected defaults: Object = {
        responseType: 'code'
    };

    constructor(options: IfsOptions = {}) {
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
