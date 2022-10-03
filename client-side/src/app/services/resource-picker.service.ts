import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PepHttpService, PepJwtHelperService, PepSessionService } from "@pepperi-addons/ngx-lib";
import { PepDialogActionsType, PepDialogData, PepDialogService } from "@pepperi-addons/ngx-lib/dialog";
import { PapiClient } from "@pepperi-addons/papi-sdk";
import { ResourceListAddonUUID } from "src/metadata";


@Injectable({ providedIn: 'root' })
export class ResourcePickerService{
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
        private dialogService: PepDialogService,
        private pepHttp: PepHttpService
    ){
        const accessToken = this.session.getIdpToken();
        this.parsedToken = jwtService.decodeToken(accessToken);
        this.papiBaseURL = this.parsedToken["pepperi.baseurl"]
    }

    async getResources(): Promise<any[]>{
        return await this.papiClient.resources.resource('resources').get()
    }
    async getViews(): Promise<any[]>{
        return await this.pepHttp.getPapiApiCall(`/addons/api/${ResourceListAddonUUID}/api/views`).toPromise()
    }
}