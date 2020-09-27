import { from as observableFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContractClientApi, ContractReplicatorApi, NetworkApi } from "../infrastructure/apis";
import { Configuration, ConfigurationParameters } from './runtime';
import { exception } from 'console';
import { ContractClientHttp } from './ContractClientHttp';

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

    addresses(): Observable<string[]> {
/*
{
    "Addrs": [
        "/ip4/127.0.0.1/tcp/64666/p2p/12D3L7AVCQPG4aTjbShnnADddws8gRvHfJZLDSaCnp3LRW7ZKcEa",
        "/ip4/10.10.0.3/tcp/64666/p2p/12D3L7AVCQPG4aTjbShnnADddws8gRvHfJZLDSaCnp3LRW7ZKcEa",
        "/ip6/::1/tcp/64666/p2p/12D3L7AVCQPG4aTjbShnnADddws8gRvHfJZLDSaCnp3LRW7ZKcEa"
    ]
}*/
        return observableFrom(this.network.addresses());
    }

    peers(): Observable<string[][]> {
        return observableFrom(this.network.peers());
    }

    /**
     * @param address single address as returned from addresses()
     */
    connect(address: string): Observable<void> {
        return observableFrom((this.network.connect({
            arg2: address
        })));
    }
}
