import { from as observableFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DriveFSApi, SuperContractApi } from '../infrastructure/apis';
import { Readable } from 'stream';
import { Configuration, HTTPBody, ConfigurationParameters } from './runtime';
import { CidWithPath, SuperContract, SupercontractExec } from './models';

export class SuperContractHttp {
    /**
     * @internal
     * dfms library super contract routes api
     */
    private superContractRoutesApi: SuperContractApi;

    /**
     * Constructor
     * @param url
     */
    constructor(configuration: ConfigurationParameters) {
        this.superContractRoutesApi = new SuperContractApi(new Configuration(configuration));
    }

    public deploy(cid: string, driveFilePath: string): Observable<string> {
        return observableFrom(this.superContractRoutesApi.deploy({
            argDrive: cid,
            argSrc: driveFilePath
        }).then(cidResultWrap => cidResultWrap.result as string));
    }

    public ls(cid: string): Observable<string[]> {
        return observableFrom(this.superContractRoutesApi.lsSC({
            argDrive: cid
        }).then(cidListWrap => cidListWrap.ids as string[]));
    }

    public get(cid: string): Observable<SuperContract> {
        return observableFrom(this.superContractRoutesApi.getSC({
            argScId: cid
        }).then(superContractWrap => superContractWrap.superContract as SuperContract));
    }

    public execute(cid: string, gas: number, functionName: string, params: string[] = []): Observable<SupercontractExec> {
        return observableFrom(this.superContractRoutesApi.execute({
            argScId: cid,
            argGas: gas,
            argFuncName: functionName,
            argArgsArray: params
        }));
    }

    public executions(): Observable<CidWithPath[]> {
        return observableFrom(this.superContractRoutesApi.executions().then(executionsWrap => executionsWrap.ids as CidWithPath[]));
    }

    public results(cid): Observable<string[]> {
        return observableFrom(this.superContractRoutesApi.results({
            argTxId: cid
        }).then(resultsWrap => resultsWrap.results as string[]));
    }

    public deactivate(cid: string): Observable<void> {
        return observableFrom(this.superContractRoutesApi.deactivate({
            argScId: cid
        }));
    }
}
