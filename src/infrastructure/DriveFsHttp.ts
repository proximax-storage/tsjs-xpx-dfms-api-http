import { from as observableFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DriveFSApi } from '../infrastructure/apis';
import { Stat } from '../model/Stat';
import { Readable } from 'stream';
import { Configuration, HTTPBody } from './runtime';

const fetchApi = require('node-fetch');

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
    constructor(url: string) {
        this.driveFsRoutesApi = new DriveFSApi(new Configuration({
            basePath: url,
            fetchApi: fetchApi
        }));
    }

    public add(cid: string, dstPath: string, body: HTTPBody, flush?: boolean): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveAdd({
            arg1: cid,
            arg3: dstPath,
            flush: flush,
            body: body
        }).then(_ => {}));
    }

    public cp(cid: string, srcPath: string, dstPath: string, flush?: boolean): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveCp({
            arg1: cid,
            arg2: srcPath,
            arg3: dstPath,
            flush: flush
        }).then(_ => {}));
    }

    public flush(cid: string): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveFlush({
            arg1: cid
        }).then(_ => {}));
    }

    public get(cid: string, path: string, flush?: boolean): Observable<string> {
        return observableFrom(this.driveFsRoutesApi.driveGet({
            arg1: cid,
            arg2: path,
            flush: flush
        }));
    }

    public ls(cid: string, path: string): Observable<Stat[]> {
        return observableFrom(this.driveFsRoutesApi.driveLs({
            arg1: cid,
            arg2: path
        }).then(response => response.map(dto => Stat.fromDTO(dto))));
    }

    public mkDir(cid: string, path: string, flush?: boolean): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveMkdir({
            arg1: cid,
            arg2: path,
            flush: flush
        }).then(_ => {}));
    }

    public mv(cid: string, srcPath: string, dstPath: string, flush?: boolean): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveMv({
            arg1: cid,
            arg2: srcPath,
            arg3: dstPath,
            flush: flush
        }).then(_ => {}));
    }

    public rm(cid: string, path: string, flush?: boolean, local?: boolean): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveRm({
            arg1: cid,
            arg2: path,
            flush: flush,
            local: local
        }).then(_ => {}));
    }

    public stat(cid: string, path: string): Observable<Stat> {
        return observableFrom(this.driveFsRoutesApi.driveStat({
            arg1: cid,
            arg2: path
        }).then(response => Stat.fromDTO(response)));
    }
}
