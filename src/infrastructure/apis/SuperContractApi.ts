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
    ErrorDTO,
    ErrorDTOFromJSON,
    ErrorDTOToJSON,
    SuperContractDTO,
    SuperContractDTOFromJSON,
    SuperContractDTOToJSON,
} from '../models';

export interface DeactivateRequest {
    arg1: string;
}

export interface DeployRequest {
    arg1: string;
}

export interface ExecuteRequest {
    arg1: string;
    gas: number;
    funName: string;
    params?: Array<string>;
}

export interface ExecutionsRequest {
    arg1: string;
}

export interface GetSCRequest {
    arg1: string;
}

export interface LsSCRequest {
    arg1: string;
}

export interface ResultsRequest {
    arg1: string;
}

/**
 *
 */
export class SuperContractApi extends runtime.BaseAPI {

    /**
     * Deactivate some SuperContract by its ID.
     * Deactivate SuperContract
     */
    async deactivateRaw(requestParameters: DeactivateRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling deactivate.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.arg1 !== undefined) {
            queryParameters['arg'] = requestParameters.arg1;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/supercontract/deactivate`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deactivate some SuperContract by its ID.
     * Deactivate SuperContract
     */
    async deactivate(requestParameters: DeactivateRequest): Promise<void> {
        await this.deactivateRaw(requestParameters);
    }

    /**
     * Deploy a new SuperContract by file hash. Return the SuperContract ID.
     * Deploy a supercontract
     */
    async deployRaw(requestParameters: DeployRequest): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling deploy.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.arg1 !== undefined) {
            queryParameters['arg'] = requestParameters.arg1;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/supercontract/deploy`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Deploy a new SuperContract by file hash. Return the SuperContract ID.
     * Deploy a supercontract
     */
    async deploy(requestParameters: DeployRequest): Promise<string> {
        const response = await this.deployRaw(requestParameters);
        return await response.value();
    }

    /**
     * Start execution of a supercontract. Return the Transaction ID.
     * Execute a supercontract
     */
    async executeRaw(requestParameters: ExecuteRequest): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling execute.');
        }

        if (requestParameters.gas === null || requestParameters.gas === undefined) {
            throw new runtime.RequiredError('gas','Required parameter requestParameters.gas was null or undefined when calling execute.');
        }

        if (requestParameters.funName === null || requestParameters.funName === undefined) {
            throw new runtime.RequiredError('funName','Required parameter requestParameters.funName was null or undefined when calling execute.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.arg1 !== undefined) {
            queryParameters['arg'] = requestParameters.arg1;
        }

        if (requestParameters.gas !== undefined) {
            queryParameters['gas'] = requestParameters.gas;
        }

        if (requestParameters.funName !== undefined) {
            queryParameters['funName'] = requestParameters.funName;
        }

        if (requestParameters.params) {
            queryParameters['params'] = requestParameters.params;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/supercontract/execute`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Start execution of a supercontract. Return the Transaction ID.
     * Execute a supercontract
     */
    async execute(requestParameters: ExecuteRequest): Promise<string> {
        const response = await this.executeRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get all execution results by SuperContract ID. Returns CID of results.
     * Executions results
     */
    async executionsRaw(requestParameters: ExecutionsRequest): Promise<runtime.ApiResponse<Array<string>>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling executions.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.arg1 !== undefined) {
            queryParameters['arg'] = requestParameters.arg1;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/supercontract/executions`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Get all execution results by SuperContract ID. Returns CID of results.
     * Executions results
     */
    async executions(requestParameters: ExecutionsRequest): Promise<Array<string>> {
        const response = await this.executionsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get a supercontract by ID.
     * Get a supercontract
     */
    async getSCRaw(requestParameters: GetSCRequest): Promise<runtime.ApiResponse<SuperContractDTO>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling getSC.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.arg1 !== undefined) {
            queryParameters['arg'] = requestParameters.arg1;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/supercontract/get`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => SuperContractDTOFromJSON(jsonValue));
    }

    /**
     * Get a supercontract by ID.
     * Get a supercontract
     */
    async getSC(requestParameters: GetSCRequest): Promise<SuperContractDTO> {
        const response = await this.getSCRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get all drive SuperContects.
     * Get SuperContects
     */
    async lsSCRaw(requestParameters: LsSCRequest): Promise<runtime.ApiResponse<Array<string>>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling lsSC.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.arg1 !== undefined) {
            queryParameters['arg'] = requestParameters.arg1;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/supercontract/ls`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Get all drive SuperContects.
     * Get SuperContects
     */
    async lsSC(requestParameters: LsSCRequest): Promise<Array<string>> {
        const response = await this.lsSCRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get results of a Supercontract by its ID.
     * Results of a Supercontract
     */
    async resultsRaw(requestParameters: ResultsRequest): Promise<runtime.ApiResponse<Array<string>>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling results.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.arg1 !== undefined) {
            queryParameters['arg'] = requestParameters.arg1;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/supercontract/results`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Get results of a Supercontract by its ID.
     * Results of a Supercontract
     */
    async results(requestParameters: ResultsRequest): Promise<Array<string>> {
        const response = await this.resultsRaw(requestParameters);
        return await response.value();
    }

}
