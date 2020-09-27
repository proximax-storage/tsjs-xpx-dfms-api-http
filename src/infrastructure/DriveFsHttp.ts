import { from as observableFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DriveFSApi } from '../infrastructure/apis';
import { Readable } from 'stream';
import { Configuration, HTTPBody, ConfigurationParameters } from './runtime';
import { CidParam, CidParamFromJSON, StatDTO } from './models';

export class DriveFsHttp {
    /**
     * @internal
     * dfms library drive fs routes api
     */
    private driveFsRoutesApi: DriveFSApi;

    /**
     * Constructor
     * @param url
     */
    constructor(configuration: ConfigurationParameters) {
        this.driveFsRoutesApi = new DriveFSApi(new Configuration(configuration));
    }

    public add(cid: string, dstPath: string, body: HTTPBody, flush?: boolean): Observable<CidParam> {
        return observableFrom(this.driveFsRoutesApi.driveAdd({
            arg1: cid,
            arg4: dstPath,
            flush: flush,
            body: body
        }).then(result => CidParamFromJSON(result)));
    }

    public cp(cid: string, srcPath: string, dstPath: string, flush?: boolean): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveCp({
            arg1: cid,
            arg3: srcPath,
            arg4: dstPath,
            flush: flush
        }).then(_ => {}));
    }

    public flush(cid: string): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveFlush({
            arg1: cid
        }).then(_ => {}));
    }

    public getAsText(cid: string, path: string): Observable<string> {
        return observableFrom(this.driveFsRoutesApi.driveGetAsText({
            arg1: cid,
            arg3: path
        }));
    }

    public getAsBlob(cid: string, path: string): Observable<Blob> {
        return observableFrom(this.driveFsRoutesApi.driveGetAsBlob({
            arg1: cid,
            arg3: path
        }));
    }

    public getAsResponse(cid: string, path: string): Observable<Response> {
        return observableFrom(this.driveFsRoutesApi.driveGetAsResponse({
            arg1: cid,
            arg3: path
        }));
    }

    public fileAsText(cid: string, cidFile: string): Observable<string> {
        return observableFrom(this.driveFsRoutesApi.driveFileAsText({
            arg1: cid,
            arg5: cidFile
        }));
    }

    public fileAsBlob(cid: string, cidFile: string): Observable<Blob> {
        return observableFrom(this.driveFsRoutesApi.driveFileAsBlob({
            arg1: cid,
            arg5: cidFile
        }));
    }

    public fileAsResponse(cid: string, cidFile: string): Observable<Response> {
        return observableFrom(this.driveFsRoutesApi.driveFileAsResponse({
            arg1: cid,
            arg5: cidFile
        }));
    }

    public ls(cid: string, path: string): Observable<StatDTO[]> {
        return observableFrom(this.driveFsRoutesApi.driveLs({
            arg1: cid,
            arg3: path
        }));
    }

    public mkDir(cid: string, path: string, flush?: boolean): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveMkdir({
            arg1: cid,
            arg3: path,
            flush: flush
        }).then(_ => {}));
    }

    public mv(cid: string, srcPath: string, dstPath: string, flush?: boolean): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveMv({
            arg1: cid,
            arg3: srcPath,
            arg4: dstPath,
            flush: flush
        }).then(_ => {}));
    }

    public rm(cid: string, path: string, flush?: boolean): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveRm({
            arg1: cid,
            arg3: path,
            flush: flush
        }).then(_ => {}));
    }

    public stat(cid: string, path: string): Observable<StatDTO> {
        return observableFrom(this.driveFsRoutesApi.driveStat({
            arg1: cid,
            arg3: path
        }));
    }
}
