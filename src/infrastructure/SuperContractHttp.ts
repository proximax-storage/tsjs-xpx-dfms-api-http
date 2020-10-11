import { from as observableFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DriveFSApi, SuperContractApi } from '../infrastructure/apis';
import { Readable } from 'stream';
import { Configuration, HTTPBody, ConfigurationParameters } from './runtime';
import { CidParam, CidParamFromJSON, StatDTO, SuperContractDTO } from './models';

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

    public deploy(cid: string): Observable<string> {
        return observableFrom(this.superContractRoutesApi.deploy({
            arg1: cid
        }));
    }

    public ls(cid: string): Observable<String[]> {
        return observableFrom(this.superContractRoutesApi.lsSC({
            arg1: cid
        }));
    }

    public get(cid: string): Observable<SuperContractDTO> {
        return observableFrom(this.superContractRoutesApi.getSC({
            arg1: cid
        }));
    }

    public execute(cid, gas, functionName): Observable<String> {
        return observableFrom(this.superContractRoutesApi.execute({
            arg1: cid,
            gas: gas,
            funName: functionName
        }));
    }

    public executions(cid): Observable<String[]> {
        return observableFrom(this.superContractRoutesApi.executions({
            arg1: cid
        }));
    }

    public results(cid): Observable<String[]> {
        return observableFrom(this.superContractRoutesApi.results({
            arg1: cid
        }));
    }

    public deactivate(cid: string): Observable<void> {
        return observableFrom(this.superContractRoutesApi.deactivate({
            arg1: cid
        }));
    }
}
