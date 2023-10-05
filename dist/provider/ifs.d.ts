import { IOAuthOptions, OAuthProvider } from "../provider";
export interface IfsOptions extends IOAuthOptions {
    authUri?: string;
    authType?: string;
}
export declare class Ifs extends OAuthProvider {
    options: IfsOptions;
    protected authUrl: string;
    protected defaults: Object;
    constructor(options?: IfsOptions);
    protected optionsToDialogUrl(options: any): string;
}
