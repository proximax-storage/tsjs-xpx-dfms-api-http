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
/**
 * 
 * @export
 * @interface VerifyResult
 */
export interface VerifyResult {
    /**
     * Hex encoded public key.
     * @type {string}
     * @memberof VerifyResult
     */
    replicator?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof VerifyResult
     */
    faultyBlocks?: Array<string>;
}

export function VerifyResultFromJSON(json: any): VerifyResult {
    return VerifyResultFromJSONTyped(json, false);
}

export function VerifyResultFromJSONTyped(json: any, ignoreDiscriminator: boolean): VerifyResult {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'replicator': !exists(json, 'replicator') ? undefined : json['replicator'],
        'faultyBlocks': !exists(json, 'faultyBlocks') ? undefined : json['faultyBlocks'],
    };
}

export function VerifyResultToJSON(value?: VerifyResult | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'replicator': value.replicator,
        'faultyBlocks': value.faultyBlocks,
    };
}

