import { from as observableFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContractClientApi } from "./api/apis";
import { Contract } from './model/models';

export class ContractClientHttp {
    /**
     * @internal
     * dfms library contract routes api
     */
    private contractRoutesApi: ContractClientApi;

    /**
     * Constructor
     * @param url
     */
    constructor(url: string) {
        this.contractRoutesApi = new ContractClientApi(url);
    }

    public ls(options?: any): Observable<Contract[]> {
        return observableFrom(this.contractRoutesApi.ls(options).then(response => response.body));
    }

    public getContract(drive: string, options?: any): Observable<Contract> {
        return observableFrom(this.contractRoutesApi.getContract(drive, options).then(response => response.body));
    }
}
