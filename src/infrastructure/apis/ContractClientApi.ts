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


import * as runtime from '../runtime';
import {
    ContractDTO,
    ContractDTOFromJSON,
    ContractDTOToJSON,
    ErrorDTO,
    ErrorDTOFromJSON,
    ErrorDTOToJSON,
    VerifyResultDTO,
    VerifyResultDTOFromJSON,
    VerifyResultDTOToJSON,
} from '../models';

export interface AmmendsRequest {
    arg1: string;
}

export interface ComposeRequest {
    space: number;
    subPeriod: number;
    replicas?: number;
    minReplicators?: number;
    subscriptionPrice?: number;
    numberSubscriptionPeriods?: number;
    percentApprovers?: number;
    privateKey?: string;
}

export interface FinishRequest {
    arg1: string;
}

export interface GetContractRequest {
    arg1: string;
}

export interface VerifyRequest {
    arg1: string;
}

/**
 *
 */
export class ContractClientApi extends runtime.BaseAPI {

    /**
     * Creates subscription for Drive Contract updates/corrections of any contract from the network by ID.
     * Ammendments subscription
     */
    async ammendsRaw(requestParameters: AmmendsRequest): Promise<runtime.ApiResponse<Array<ContractDTO>>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling ammends.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.arg1 !== undefined) {
            queryParameters['arg'] = requestParameters.arg1;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/contract/ammends`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ContractDTOFromJSON));
    }

    /**
     * Creates subscription for Drive Contract updates/corrections of any contract from the network by ID.
     * Ammendments subscription
     */
    async ammends(requestParameters: AmmendsRequest): Promise<Array<ContractDTO>> {
        const response = await this.ammendsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Compose synchronously announces invites to the Network with current node as an owner and tries to find members which agrees on specified parameters and options. It does not guarantee success on resolving members. On success persists contract locally and gives ability to use DriveFS.
     * Creates new Drive contract
     */
    async composeRaw(requestParameters: ComposeRequest): Promise<runtime.ApiResponse<ContractDTO>> {
        if (requestParameters.space === null || requestParameters.space === undefined) {
            throw new runtime.RequiredError('space','Required parameter requestParameters.space was null or undefined when calling compose.');
        }

        if (requestParameters.subPeriod === null || requestParameters.subPeriod === undefined) {
            throw new runtime.RequiredError('subPeriod','Required parameter requestParameters.subPeriod was null or undefined when calling compose.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        // oh boy, this duplicate "arg" stuff is just plain stupid
        queryParameters['arg'] = [
            requestParameters.space,
            requestParameters.subPeriod + 's',
            // requestParameters.replicas || '',
            // requestParameters.minReplicators || '',
            // requestParameters.subscriptionPrice || '',
            // requestParameters.numberSubscriptionPeriods || '',
            // requestParameters.percentApprovers || '',
            // requestParameters.privateKey || ''
         ];
        /*
        if (requestParameters.space !== undefined) {
            queryParameters['space'] = requestParameters.space;
        }

        if (requestParameters.subPeriod !== undefined) {
            queryParameters['subPeriod'] = requestParameters.subPeriod;
        }*/

        if (requestParameters.replicas !== undefined) {
            queryParameters['replicas'] = requestParameters.replicas;
        }

        if (requestParameters.minReplicators !== undefined) {
            queryParameters['min-replicators'] = requestParameters.minReplicators;
        }

        if (requestParameters.subscriptionPrice !== undefined) {
            queryParameters['subscription-price'] = requestParameters.subscriptionPrice;
        }

        if (requestParameters.numberSubscriptionPeriods !== undefined) {
            queryParameters['number-subscription-periods'] = requestParameters.numberSubscriptionPeriods;
        }

        if (requestParameters.percentApprovers !== undefined) {
            queryParameters['percent-approvers'] = requestParameters.percentApprovers;
        }

        if (requestParameters.privateKey !== undefined) {
            queryParameters['private-key'] = requestParameters.privateKey;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/contract/compose`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ContractDTOFromJSON(jsonValue.Contract));
    }

    /**
     * Compose synchronously announces invites to the Network with current node as an owner and tries to find members which agrees on specified parameters and options. It does not guarantee success on resolving members. On success persists contract locally and gives ability to use DriveFS.
     * Creates new Drive contract
     */
    async compose(requestParameters: ComposeRequest): Promise<ContractDTO> {
        const response = await this.composeRaw(requestParameters);
        return await response.value();
    }

    /**
     * Finish contract.
     * Finish contract
     */
    async finishRaw(requestParameters: FinishRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling finish.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.arg1 !== undefined) {
            queryParameters['arg'] = requestParameters.arg1;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/contract/finish`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Finish contract.
     * Finish contract
     */
    async finish(requestParameters: FinishRequest): Promise<void> {
        await this.finishRaw(requestParameters);
    }

    /**
     * Searches for Drive Contract information over the network.
     * Get Drive contract infromation
     */
    async getContractRaw(requestParameters: GetContractRequest): Promise<runtime.ApiResponse<ContractDTO>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling getContract.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.arg1 !== undefined) {
            queryParameters['arg'] = requestParameters.arg1;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/contract/get`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ContractDTOFromJSON(jsonValue.Contract));
    }

    /**
     * Searches for Drive Contract information over the network.
     * Get Drive contract infromation
     */
    async getContract(requestParameters: GetContractRequest): Promise<ContractDTO> {
        const response = await this.getContractRaw(requestParameters);
        return await response.value();
    }

    /**
     * Lists all the contracts in which Node participates as an owner or a member
     * List Drive contracts node aware of
     */
    async lsRaw(): Promise<runtime.ApiResponse<Array<ContractDTO>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/contract/ls`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.Ids.map(id => { return { drive: id }}).map(ContractDTOFromJSON));
    }

    /**
     * Lists all the contracts in which Node participates as an owner or a member
     * List Drive contracts node aware of
     */
    async ls(): Promise<Array<ContractDTO>> {
        const response = await this.lsRaw();
        return await response.value();
    }

    /**
     * Initiates verification round between replicators.
     * Contract verify
     */
    async verifyRaw(requestParameters: VerifyRequest): Promise<runtime.ApiResponse<Array<VerifyResultDTO>>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling verify.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.arg1 !== undefined) {
            queryParameters['arg'] = requestParameters.arg1;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/contract/verify`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(VerifyResultDTOFromJSON));
    }

    /**
     * Initiates verification round between replicators.
     * Contract verify
     */
    async verify(requestParameters: VerifyRequest): Promise<Array<VerifyResultDTO>> {
        const response = await this.verifyRaw(requestParameters);
        return await response.value();
    }

}
