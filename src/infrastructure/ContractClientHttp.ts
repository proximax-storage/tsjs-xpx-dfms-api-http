import { from as observableFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContractClientApi } from "../infrastructure/apis";
import { Configuration, ConfigurationParameters } from './runtime';
import { exception } from 'console';
import { Contract, VerifyResult } from './models';

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

    public ls(): Observable<string[]> {
        return observableFrom(this.contractRoutesApi.ls().then(cidListWrap => cidListWrap.ids as string[]));
    }

    public getContract(drive: string): Observable<Contract> {
        return observableFrom(this.contractRoutesApi.getContract({argDrive: drive}).then(contractWrap => contractWrap.contract as Contract));
    }

    public compose(space: number, duration: string, replicas?: number, minReplicators?: number, subscriptionPrice?: number, numberSubscriptionPeriods?: number, percentApprovers?: number, privateKey?: string): Observable<Contract> {
        return observableFrom(this.contractRoutesApi.compose({
            argSpace: space,
            argDuration: duration,
            replicas,
            minReplicators,
            subscriptionPrice,
            numberSubscriptionPeriods,
            percentApprovers,
            privateKey
        }).then(contractWrap => contractWrap.contract as Contract));
    }

    public verify(drive: string): Observable<VerifyResult[]> {
        return observableFrom(this.contractRoutesApi.verify({argDrive: drive}));
    }

    public finish(drive: string): Observable<void> {
        return observableFrom(this.contractRoutesApi.finish({argDrive: drive}));
    }

    public ammends(drive: string): Observable<Contract> {
        return observableFrom(this.contractRoutesApi.ammends({argDrive: drive}).then(contractWrap => contractWrap.contract as Contract));
    }
}
