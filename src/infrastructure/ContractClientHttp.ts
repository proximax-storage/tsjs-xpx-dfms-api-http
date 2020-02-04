import { from as observableFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContractClientApi } from "../infrastructure/apis";
import { ContractDTO } from './models';
import { Contract } from '../model/model';
import { Configuration, ConfigurationParameters } from './runtime';

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
    constructor(configuration: ConfigurationParameters) {
        this.contractRoutesApi = new ContractClientApi(new Configuration(configuration));
    }

    public ls(): Observable<Contract[]> {
        return observableFrom(this.contractRoutesApi.ls().then(response => response.map(dto => Contract.fromDTO(dto))));
    }

    public getContract(drive: string): Observable<Contract> {
        return observableFrom(this.contractRoutesApi.getContract({arg1: drive}).then(response => Contract.fromDTO(response)));
    }
}
