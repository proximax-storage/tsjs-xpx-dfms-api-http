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
    InlineResponse200,
    InlineResponse200FromJSON,
    InlineResponse200ToJSON,
    StatDTO,
    StatDTOFromJSON,
    StatDTOToJSON,
} from '../models';

export interface DriveAddRequest {
    arg1: string;
    arg4: string;
    body: runtime.HTTPBody;
    flush?: boolean;
}

export interface DriveCpRequest {
    arg1: string;
    arg3: string;
    arg4: string;
    flush?: boolean;
}

export interface DriveFileRequest {
    arg1: string;
    arg5: string;
}

export interface DriveFlushRequest {
    arg1: string;
}

export interface DriveGetRequest {
    arg1: string;
    arg3: string;
}

export interface DriveLsRequest {
    arg1: string;
    arg3: string;
}

export interface DriveMkdirRequest {
    arg1: string;
    arg3: string;
    flush?: boolean;
}

export interface DriveMvRequest {
    arg1: string;
    arg3: string;
    arg4: string;
    flush?: boolean;
}

export interface DriveRmRequest {
    arg1: string;
    arg3: string;
    flush?: boolean;
}

export interface DriveStatRequest {
    arg1: string;
    arg3: string;
}

/**
 *
 */
export class DriveFSApi extends runtime.BaseAPI {

    /**
     * Sends file or directory to remote node which adds it to the path of the contract
     * Add file
     */
    async driveAddRaw(requestParameters: DriveAddRequest): Promise<runtime.ApiResponse<InlineResponse200>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling driveAdd.');
        }

        if (requestParameters.arg4 === null || requestParameters.arg4 === undefined) {
            throw new runtime.RequiredError('arg4','Required parameter requestParameters.arg4 was null or undefined when calling driveAdd.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        queryParameters['arg'] = [ requestParameters.arg1, requestParameters.arg4 ];

        if (requestParameters.flush !== undefined) {
            queryParameters['flush'] = requestParameters.flush;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/drive/add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse200FromJSON(jsonValue));
    }

    /**
     * Sends file or directory to remote node which adds it to the path of the contract
     * Add file
     */
    async driveAdd(requestParameters: DriveAddRequest): Promise<InlineResponse200> {
        const response = await this.driveAddRaw(requestParameters);
        return await response.value();
    }

    /**
     * Copy copies file or directory from the givens source path to the given destination path It does not makes the full copy of the file or directory, it just copies the reference
     * Copy file
     */
    async driveCpRaw(requestParameters: DriveCpRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling driveCp.');
        }

        if (requestParameters.arg3 === null || requestParameters.arg3 === undefined) {
            throw new runtime.RequiredError('arg3','Required parameter requestParameters.arg3 was null or undefined when calling driveCp.');
        }

        if (requestParameters.arg4 === null || requestParameters.arg4 === undefined) {
            throw new runtime.RequiredError('arg4','Required parameter requestParameters.arg4 was null or undefined when calling driveCp.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        queryParameters['arg'] = [ requestParameters.arg1, requestParameters.arg3, requestParameters.arg4 ];

        if (requestParameters.flush !== undefined) {
            queryParameters['flush'] = requestParameters.flush;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/drive/cp`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Copy copies file or directory from the givens source path to the given destination path It does not makes the full copy of the file or directory, it just copies the reference
     * Copy file
     */
    async driveCp(requestParameters: DriveCpRequest): Promise<void> {
        await this.driveCpRaw(requestParameters);
    }

    /**
     * Gets file or directory from remote node
     * Get file
     */
    async driveFileRaw(requestParameters: DriveFileRequest): Promise<Response> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling driveFile.');
        }

        if (requestParameters.arg5 === null || requestParameters.arg5 === undefined) {
            throw new runtime.RequiredError('arg5','Required parameter requestParameters.arg5 was null or undefined when calling driveFile.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        queryParameters['arg'] = [ requestParameters.arg1, requestParameters.arg5 ];

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/drive/file`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return response;
    }

    /**
     * Gets file or directory from the remote node
     * Get file
     */
    async driveFileAsText(requestParameters: DriveFileRequest): Promise<string> {
        const response = await this.driveFileRaw(requestParameters);
        return new runtime.TextApiResponse(response).value();
    }

    async driveFileAsBlob(requestParameters: DriveFileRequest): Promise<Blob> {
        const response = await this.driveFileRaw(requestParameters);
        return new runtime.BlobApiResponse(response).value();
    }

    async driveFileAsResponse(requestParameters: DriveFileRequest): Promise<Response> {
        return this.driveFileRaw(requestParameters);
    }

    /**
     * Flush pushes state of the local Drive to all replicators
     * Flush drive
     */
    async driveFlushRaw(requestParameters: DriveFlushRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling driveFlush.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        queryParameters['arg'] = requestParameters.arg1;

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/drive/flush`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Flush pushes state of the local Drive to all replicators
     * Flush drive
     */
    async driveFlush(requestParameters: DriveFlushRequest): Promise<void> {
        await this.driveFlushRaw(requestParameters);
    }

    /**
     * Sends file or directory to remote node which adds it to the path of the contract
     * Get file
     */
    async driveGetRaw(requestParameters: DriveGetRequest): Promise<Response> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling driveGet.');
        }

        if (requestParameters.arg3 === null || requestParameters.arg3 === undefined) {
            throw new runtime.RequiredError('arg3','Required parameter requestParameters.arg3 was null or undefined when calling driveGet.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        queryParameters['arg'] = [ requestParameters.arg1, requestParameters.arg3 ];

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/drive/get`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return response;
    }

    /**
     * Gets file or directory from the remote node
     * Get file
     */
    async driveGetAsText(requestParameters: DriveGetRequest): Promise<string> {
        const response = await this.driveGetRaw(requestParameters);
        return new runtime.TextApiResponse(response).value();
    }

    async driveGetAsBlob(requestParameters: DriveGetRequest): Promise<Blob> {
        const response = await this.driveGetRaw(requestParameters);
        return new runtime.BlobApiResponse(response).value();
    }

    async driveGetAsResponse(requestParameters: DriveGetRequest): Promise<Response> {
        return this.driveGetRaw(requestParameters);
    }

    /**
     * Ls returns information about the files and directories under the given path
     * List files
     */
    async driveLsRaw(requestParameters: DriveLsRequest): Promise<runtime.ApiResponse<Array<StatDTO>>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling driveLs.');
        }

        if (requestParameters.arg3 === null || requestParameters.arg3 === undefined) {
            throw new runtime.RequiredError('arg3','Required parameter requestParameters.arg3 was null or undefined when calling driveLs.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        queryParameters['arg'] = [ requestParameters.arg1, requestParameters.arg3 ];

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/drive/ls`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.List.map(StatDTOFromJSON));
    }

    /**
     * Ls returns information about the files and directories under the given path
     * List files
     */
    async driveLs(requestParameters: DriveLsRequest): Promise<Array<StatDTO>> {
        const response = await this.driveLsRaw(requestParameters);
        return await response.value();
    }

    /**
     * MakeDir creates new directory on the given path
     * Make directory
     */
    async driveMkdirRaw(requestParameters: DriveMkdirRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling driveMkdir.');
        }

        if (requestParameters.arg3 === null || requestParameters.arg3 === undefined) {
            throw new runtime.RequiredError('arg3','Required parameter requestParameters.arg3 was null or undefined when calling driveMkdir.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        queryParameters['arg'] = [ requestParameters.arg1, requestParameters.arg3 ];

        if (requestParameters.flush !== undefined) {
            queryParameters['flush'] = requestParameters.flush;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/drive/mkdir`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * MakeDir creates new directory on the given path
     * Make directory
     */
    async driveMkdir(requestParameters: DriveMkdirRequest): Promise<void> {
        await this.driveMkdirRaw(requestParameters);
    }

    /**
     * Move moves file or directory from the givens source path to the given destination path Use also to rename file or directory
     * Move file
     */
    async driveMvRaw(requestParameters: DriveMvRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling driveMv.');
        }

        if (requestParameters.arg3 === null || requestParameters.arg3 === undefined) {
            throw new runtime.RequiredError('arg3','Required parameter requestParameters.arg3 was null or undefined when calling driveMv.');
        }

        if (requestParameters.arg4 === null || requestParameters.arg4 === undefined) {
            throw new runtime.RequiredError('arg4','Required parameter requestParameters.arg4 was null or undefined when calling driveMv.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        queryParameters['arg'] = [ requestParameters.arg1, requestParameters.arg3, requestParameters.arg4 ];

        if (requestParameters.flush !== undefined) {
            queryParameters['flush'] = requestParameters.flush;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/drive/mv`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Move moves file or directory from the givens source path to the given destination path Use also to rename file or directory
     * Move file
     */
    async driveMv(requestParameters: DriveMvRequest): Promise<void> {
        await this.driveMvRaw(requestParameters);
    }

    /**
     * Remove removes the file or directory from the path
     * Remove file
     */
    async driveRmRaw(requestParameters: DriveRmRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling driveRm.');
        }

        if (requestParameters.arg3 === null || requestParameters.arg3 === undefined) {
            throw new runtime.RequiredError('arg3','Required parameter requestParameters.arg3 was null or undefined when calling driveRm.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        queryParameters['arg'] = [ requestParameters.arg1, requestParameters.arg3 ];

        if (requestParameters.flush !== undefined) {
            queryParameters['flush'] = requestParameters.flush;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/drive/rm`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Remove removes the file or directory from the path
     * Remove file
     */
    async driveRm(requestParameters: DriveRmRequest): Promise<void> {
        await this.driveRmRaw(requestParameters);
    }

    /**
     * Stat returns information about the file or directory under the given path
     * File information
     */
    async driveStatRaw(requestParameters: DriveStatRequest): Promise<runtime.ApiResponse<StatDTO>> {
        if (requestParameters.arg1 === null || requestParameters.arg1 === undefined) {
            throw new runtime.RequiredError('arg1','Required parameter requestParameters.arg1 was null or undefined when calling driveStat.');
        }

        if (requestParameters.arg3 === null || requestParameters.arg3 === undefined) {
            throw new runtime.RequiredError('arg3','Required parameter requestParameters.arg3 was null or undefined when calling driveStat.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        queryParameters['arg'] = [ requestParameters.arg1, requestParameters.arg3 ];

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/drive/stat`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => StatDTOFromJSON(jsonValue.Stat));
    }

    /**
     * Stat returns information about the file or directory under the given path
     * File information
     */
    async driveStat(requestParameters: DriveStatRequest): Promise<StatDTO> {
        const response = await this.driveStatRaw(requestParameters);
        return await response.value();
    }

}
