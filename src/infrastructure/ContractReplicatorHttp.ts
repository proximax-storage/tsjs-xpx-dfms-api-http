import { concat, from as observableFromPromise, Observable, of, pipe } from 'rxjs';
import { concatAll, flatMap, map, mergeMap } from 'rxjs/operators';
import { ContractClientApi, ContractReplicatorApi } from "../infrastructure/apis";
import { Configuration, ConfigurationParameters } from './runtime';
import { exception } from 'console';
import { ContractClientHttp } from './ContractClientHttp';
import { Contract, ContractWrapFromJSON, InviteWrapFromJSON } from './models';
const readline = require('readline');
export class ContractReplicatorHttp extends ContractClientHttp {
    /**
     * @internal
     * dfms library replicator contract routes api
     */
    private contractReplicator: ContractReplicatorApi;

    /**
     * Constructor
     * @param url
     */
    constructor(configuration: ConfigurationParameters) {
        super(configuration);
        this.contractReplicator = new ContractReplicatorApi(new Configuration(configuration));
    }

    public invites(): Observable<Contract> {
/*
wget -q -O - http://localhost:6468/api/v1/contract/invites
{"Invite":{"drive":"baegaajaiaqjcbfwppizwbuajbfxvybu4i7zf5qwp5azdkgecjmklbpp7rxvccj4e","owner":"080412200eb448d07c7ccb312989ac27aa052738ff589e2f83973f909b506b450dc5c4e2","duration":295704,"space":66,"payedReplicas":6,"minReplicators":5,"percentApprovers":80,"billingPrice":123,"billingPeriod":444}}
{"Invite":{"drive":"baegaajaiaqjcbzlrl4mpuaiel2cl76hfhxyhkvsbsjpps6wobx4yutsizknm5xlt","owner":"080412200eb448d07c7ccb312989ac27aa052738ff589e2f83973f909b506b450dc5c4e2","duration":295704,"space":66,"payedReplicas":6,"minReplicators":5,"percentApprovers":80,"billingPrice":123,"billingPeriod":444}}
*/
        return observableFromPromise(this.contractReplicator.invitesRaw())
        .pipe(flatMap(response => {
            return new Observable<Contract> (subscriber => {
                const rl = readline.createInterface({
                    input: response.response.body,
                    crlfDelay: Infinity
                });
                rl.on('line', (line) => {
                    const parsed = JSON.parse(line);
                    subscriber.next(InviteWrapFromJSON(parsed).invite as Contract);
                });
                rl.on('close', () => {
                    subscriber.complete();
                });
                return function unsubscribe() {
                    response.abortController.abort();
                }
            });
        }));
    }

    public accept(drive: string): Observable<void> {
        return observableFromPromise(this.contractReplicator.accept({argDrive: drive}));
    }

    public accepted(): Observable<Contract> {
        return observableFromPromise(this.contractReplicator.acceptedRaw())
        .pipe(flatMap(response => {
            return new Observable<Contract> (subscriber => {
                const rl = readline.createInterface({
                    input: response.response.body,
                    crlfDelay: Infinity
                });
                rl.on('line', (line) => {
                    const parsed = JSON.parse(line);
                    subscriber.next(ContractWrapFromJSON(parsed).contract as Contract);
                });
                rl.on('close', () => {
                    subscriber.complete();
                });
                return function unsubscribe() {
                    response.abortController.abort();
                }
            });
        }));
    }
}
