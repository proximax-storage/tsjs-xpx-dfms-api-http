import { from as observableFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DriveFSApi } from "./api/apis";
import { Stat } from '../model/Stat';

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
        this.driveFsRoutesApi = new DriveFSApi(url);
    }

    public add(cid: string, dstPath: string, flush?: boolean, options?: any): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveAdd(cid, dstPath, flush, options).then(_ => {}));
    }

    public cp(cid: string, srcPath: string, dstPath: string, flush?: boolean, options?: any): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveCp(cid, srcPath, dstPath, flush, options).then(_ => {}));
    }

    public flush(cid: string, options?: any): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveFlush(cid, options).then(_ => {}));
    }

    public get(cid: string, path: string, flush?: boolean, options?: any): Observable<string> {
        return observableFrom(this.driveFsRoutesApi.driveGet(cid, path, flush, options).then(response => response.body));
    }

    public ls(cid: string, path: string, options?: any): Observable<Stat[]> {
        return observableFrom(this.driveFsRoutesApi.driveLs(cid, path, options).then(response => response.body.map(dto => Stat.fromDTO(dto))));
    }

    public mkDir(cid: string, path: string, flush?: boolean, options?: any): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveMkdir(cid, path, flush, options).then(_ => {}));
    }

    public mv(cid: string, srcPath: string, dstPath: string, flush?: boolean, options?: any): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveMv(cid, srcPath, dstPath, flush, options).then(_ => {}));
    }

    public rm(cid: string, path: string, flush?: boolean, local?: boolean, options?: any): Observable<void> {
        return observableFrom(this.driveFsRoutesApi.driveRm(cid, path, flush, local, options).then(_ => {}));
    }

    public stat(cid: string, path: string, options?: any): Observable<Stat> {
        return observableFrom(this.driveFsRoutesApi.driveStat(cid, path, options).then(response => Stat.fromDTO(response.body)));
    }
}
