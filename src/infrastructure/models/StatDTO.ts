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
 * File statistics
 * @export
 * @interface StatDTO
 */
export interface StatDTO {
    /**
     *
     * @type {string}
     * @memberof StatDTO
     */
    name?: string;
    /**
     *
     * @type {number}
     * @memberof StatDTO
     */
    size?: number;
    /**
     *
     * @type {string}
     * @memberof StatDTO
     */
    type?: StatDTOTypeEnum;
}

export function StatDTOFromJSON(json: any): StatDTO {
    return StatDTOFromJSONTyped(json, false);
}

export function StatDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): StatDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'name': !exists(json, 'name') ? (!exists(json, 'Name') ? undefined : json['Name']) : json['name'],
        'size': !exists(json, 'size') ? (!exists(json, 'Size') ? undefined : json['Size']) : json['size'],
        'type': !exists(json, 'type') ? (!exists(json, 'Type') ? undefined : json['Type']) : json['type'],
    };
}

export function StatDTOToJSON(value?: StatDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'name': value.name,
        'size': value.size,
        'type': value.type,
    };
}

/**
* @export
* @enum {string}
*/
export enum StatDTOTypeEnum {
    File = 'file',
    Dir = 'dir'
}


