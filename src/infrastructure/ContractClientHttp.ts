import { from as observableFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContractClientApi } from "../infrastructure/apis";
import { ContractDTO } from './models';
import { Configuration, ConfigurationParameters } from './runtime';
import { exception } from 'console';

export class ContractClientHttp {
    /**
     * @internal
     * dfms library client contract routes api
     */
    private contractRoutesApi: ContractClientApi;

    /**
     * Constructor
     * @param url
     */
    constructor(configuration: ConfigurationParameters) {
        this.contractRoutesApi = new ContractClientApi(new Configuration(configuration));
    }

    public ls(): Observable<ContractDTO[]> {
        return observableFrom(this.contractRoutesApi.ls());
    }

    public getContract(drive: string): Observable<ContractDTO> {
        return observableFrom(this.contractRoutesApi.getContract({arg1: drive}));
    }

    public compose(space: number, subPeriod: number, replicas?: number, minReplicators?: number, subscriptionPrice?: number, numberSubscriptionPeriods?: number, percentApprovers?: number, privateKey?: string) {
        return observableFrom(this.contractRoutesApi.compose({
            space,
            subPeriod,
            replicas,
            minReplicators,
            subscriptionPrice,
            numberSubscriptionPeriods,
            percentApprovers,
            privateKey
        }));
    }
}
