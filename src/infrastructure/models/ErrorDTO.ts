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
 * @interface ErrorDTO
 */
export interface ErrorDTO {
    /**
     * Error message
     * @type {string}
     * @memberof ErrorDTO
     */
    message?: string;
    /**
     * * 0 - Normal - is a normal error. The command failed for some reason that\'s not a bug. * 1 - Client - means the client made an invalid request. * 2 - Implementation - means there\'s a bug in the implementation. * 3 - RateLimited - is returned when the operation has been rate-limited. * 4 - Forbidden - is returned when the client doesn\'t have permission to       perform the requested operation. 
     * @type {number}
     * @memberof ErrorDTO
     */
    code?: ErrorDTOCodeEnum;
    /**
     * 
     * @type {string}
     * @memberof ErrorDTO
     */
    type?: ErrorDTOTypeEnum;
}

export function ErrorDTOFromJSON(json: any): ErrorDTO {
    return ErrorDTOFromJSONTyped(json, false);
}

export function ErrorDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'message': !exists(json, 'message') ? undefined : json['message'],
        'code': !exists(json, 'code') ? undefined : json['code'],
        'type': !exists(json, 'type') ? undefined : json['type'],
    };
}

export function ErrorDTOToJSON(value?: ErrorDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'message': value.message,
        'code': value.code,
        'type': value.type,
    };
}

/**
* @export
* @enum {string}
*/
export enum ErrorDTOCodeEnum {
    NUMBER_0 = 0,
    NUMBER_1 = 1,
    NUMBER_2 = 2
}
/**
* @export
* @enum {string}
*/
export enum ErrorDTOTypeEnum {
    Error = 'error'
}


