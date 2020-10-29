import { from as observableFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContractClientApi, ContractReplicatorApi, NetworkApi } from "../infrastructure/apis";
import { Configuration, ConfigurationParameters } from './runtime';
import { exception } from 'console';
import { ContractClientHttp } from './ContractClientHttp';
import { Peer } from './models';

export class NetworkHttp  {
    /**
     * @internal
     * dfms library network routes api
     */
    private network: NetworkApi;

    /**
     * Constructor
     * @param url
     */
    constructor(configuration: ConfigurationParameters) {
        this.network = new NetworkApi(new Configuration(configuration));
    }

    id(): Observable<string> { // TODO: return type is invalid, fix yaml
        return observableFrom(this.network.getid().then(peerIdWrap => peerIdWrap.iD as string));
    }

    addresses(): Observable<string[]> {
        return observableFrom(this.network.addresses().then(addrListWrap => addrListWrap.addrs as string[]));
    }

    peers(): Observable<Peer[]> {
        return observableFrom(this.network.peers().then(peerListWrap => peerListWrap.peers as Peer[]));
    }

    /**
     * @param address single address as returned from addresses()
     */
    connect(address: string): Observable<void> {
        return observableFrom(this.network.connect({argAddr: address}));
    }

    disconnect(address: string): Observable<void> {
        return observableFrom(this.network.disconnect({argAddr: address}));
    }
}
