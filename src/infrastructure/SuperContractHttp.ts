import { from as observableFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DriveFSApi, SuperContractApi } from '../infrastructure/apis';
import { Readable } from 'stream';
import { Configuration, HTTPBody, ConfigurationParameters } from './runtime';
import { CidParam, CidParamFromJSON, StatDTO, SuperContractDTO } from './models';
import { ExecuteResultDTO } from './models/ExecuteResultDTO';

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
            arg1: cid,
            arg2: driveFilePath
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

    public execute(cid, gas, functionName): Observable<ExecuteResultDTO> {
        return observableFrom(this.superContractRoutesApi.execute({
            arg1: cid,
            gas: gas,
            funName: functionName
        }));
    }

    public executions(): Observable<ExecuteResultDTO[]> {
        return observableFrom(this.superContractRoutesApi.executions());
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
