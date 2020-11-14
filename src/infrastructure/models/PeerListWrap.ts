/* tslint:disable */
/* eslint-disable */
/**
 * DFMS API
 * DFMS node HTTP API. [Reference implementation in GO](https://github.com/proximax-storage/go-xpx-dfms-api-http) [API definition](https://github.com/proximax-storage/go-xpx-dfms-api)  API does not tries to follow idiomatic REST or other API patterns for reasons. 
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    Peer,
    PeerFromJSON,
    PeerFromJSONTyped,
    PeerToJSON,
} from './';

/**
 * 
 * @export
 * @interface PeerListWrap
 */
export interface PeerListWrap {
    /**
     * 
     * @type {Array<Peer>}
     * @memberof PeerListWrap
     */
    peers?: Array<Peer>;
}

export function PeerListWrapFromJSON(json: any): PeerListWrap {
    return PeerListWrapFromJSONTyped(json, false);
}

export function PeerListWrapFromJSONTyped(json: any, ignoreDiscriminator: boolean): PeerListWrap {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'peers': !exists(json, 'Peers') ? undefined : ((json['Peers'] as Array<any>).map(PeerFromJSON)),
    };
}

export function PeerListWrapToJSON(value?: PeerListWrap | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'Peers': value.peers === undefined ? undefined : ((value.peers as Array<any>).map(PeerToJSON)),
    };
}


