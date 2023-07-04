import { IOAuthOptions, OAuthProvider } from "../provider";
export interface MsOptions extends IOAuthOptions {
    authType?: string;
    tenantId?: string;
}
export declare class Microsoft extends OAuthProvider {
    options: MsOptions;
    protected authUrl: string;
    protected defaults: Object;
    constructor(options?: MsOptions);
    protected optionsToDialogUrl(options: any): string;
}
