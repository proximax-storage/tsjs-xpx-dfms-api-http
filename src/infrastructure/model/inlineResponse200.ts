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


export class InlineResponse200 {
    /**
    * [Cid](https://github.com/multiformats/cid) (version 1) - special content identifier. 
    */
    'cid'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "cid",
            "baseName": "cid",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return InlineResponse200.attributeTypeMap;
    }
}

