import { from as observableFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DriveFSApi } from '../infrastructure/apis';
import { Readable } from 'stream';
import { Configuration, HTTPBody, ConfigurationParameters } from './runtime';
import { Stat } from './models';

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

    public add(cid: string, dstPath: string, body: HTTPBody, flush?: boolean): Observable<string> {
        return observableFrom(this.driveFsRoutesApi.driveAdd({
            argDrive: cid,
            argDst: dstPath,
            flush: flush,
            body: body
        }).then(cidWrap => cidWrap.id as string));
    }

    public cp(cid: string, srcPath: string, dstPath: string, flush?: boolean): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveCp({
            argDrive: cid,
            argSrc: srcPath,
            argDst: dstPath,
            flush: flush
        }));
    }

    public flush(cid: string): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveFlush({
            argDrive: cid
        }));
    }

    public getAsText(cid: string, path: string): Observable<string> {
        return observableFrom(this.driveFsRoutesApi.driveGetAsText({
            argDrive: cid,
            argSrc: path
        }));
    }

    public getAsBlob(cid: string, path: string): Observable<Blob> {
        return observableFrom(this.driveFsRoutesApi.driveGetAsBlob({
            argDrive: cid,
            argSrc: path
        }));
    }

    public getAsResponse(cid: string, path: string): Observable<Response> {
        return observableFrom(this.driveFsRoutesApi.driveGetAsResponse({
            argDrive: cid,
            argSrc: path
        }));
    }

    public fileAsText(cid: string, cidFile: string): Observable<string> {
        return observableFrom(this.driveFsRoutesApi.driveFileAsText({
            argDrive: cid,
            argFileCid: cidFile
        }));
    }

    public fileAsBlob(cid: string, cidFile: string): Observable<Blob> {
        return observableFrom(this.driveFsRoutesApi.driveFileAsBlob({
            argDrive: cid,
            argFileCid: cidFile
        }));
    }

    public fileAsResponse(cid: string, cidFile: string): Observable<Response> {
        return observableFrom(this.driveFsRoutesApi.driveFileAsResponse({
            argDrive: cid,
            argFileCid: cidFile
        }));
    }

    public ls(cid: string, path: string): Observable<Stat[]> {
        return observableFrom(this.driveFsRoutesApi.driveLs({
            argDrive: cid,
            argSrc: path
        }).then(statListWrap => statListWrap.list as Stat[]));
    }

    public mkDir(cid: string, path: string, flush?: boolean): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveMkdir({
            argDrive: cid,
            argSrc: path,
            flush: flush
        }).then(_ => {}));
    }

    public mv(cid: string, srcPath: string, dstPath: string, flush?: boolean): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveMv({
            argDrive: cid,
            argSrc: srcPath,
            argDst: dstPath,
            flush: flush
        }).then(_ => {}));
    }

    public rm(cid: string, path: string, flush?: boolean): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveRm({
            argDrive: cid,
            argSrc: path,
            flush: flush
        }).then(_ => {}));
    }

    public stat(cid: string, path: string): Observable<Stat> {
        return observableFrom(this.driveFsRoutesApi.driveStat({
            argDrive: cid,
            argSrc: path
        }).then(statWrap => statWrap.stat as Stat));
    }
}
