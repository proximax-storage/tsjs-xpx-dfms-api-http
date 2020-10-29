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
    Contract,
    ContractFromJSON,
    ContractFromJSONTyped,
    ContractToJSON,
} from './';

/**
 * Wrapper for single drive contract as part of invite polling
 * @export
 * @interface InviteWrap
 */
export interface InviteWrap {
    /**
     * 
     * @type {Contract}
     * @memberof InviteWrap
     */
    invite?: Contract;
}

export function InviteWrapFromJSON(json: any): InviteWrap {
    return InviteWrapFromJSONTyped(json, false);
}

export function InviteWrapFromJSONTyped(json: any, ignoreDiscriminator: boolean): InviteWrap {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'invite': !exists(json, 'Invite') ? undefined : ContractFromJSON(json['Invite']),
    };
}

export function InviteWrapToJSON(value?: InviteWrap | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'Invite': ContractToJSON(value.invite),
    };
}


