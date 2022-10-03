import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PepJwtHelperService, PepSessionService } from "@pepperi-addons/ngx-lib";
import { PepDialogActionsType, PepDialogData, PepDialogService } from "@pepperi-addons/ngx-lib/dialog";
import { PapiClient } from "@pepperi-addons/papi-sdk";
import { PepSelectOption } from "src/metadata";


@Injectable({ providedIn: 'root' })
export class UtilitiesService{
    accessToken = '';
    parsedToken: any
    papiBaseURL = 'https://staging.pepperi.com'
    pluginUUID;
    get papiClient(): PapiClient {
        return new PapiClient({
            baseURL: this.papiBaseURL,
            token: this.session.getIdpToken(),
            addonUUID: this.pluginUUID,
            suppressLogging:true
        })
    }
    constructor(
        public session:  PepSessionService,
        public jwtService: PepJwtHelperService,
        private translate: TranslateService,
        private dialogService: PepDialogService
    ){
        const accessToken = this.session.getIdpToken();
        this.parsedToken = jwtService.decodeToken(accessToken);
        this.papiBaseURL = this.parsedToken["pepperi.baseurl"]
    }
    convertArrayToDropDown<T>(arr: Array<T>, key: string): PepSelectOption<T>[]{
        return arr.map(item => {
            return {
                value: item[key],
                key: item
            };
        });
    }
}