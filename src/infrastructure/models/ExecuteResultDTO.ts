import { exists } from '../runtime';

export interface ExecuteResultDTO {

    ScId?: string;

    TxHash?: {'/': string};
}

export function ExecuteResultDTOFromJSON(json: any): ExecuteResultDTO {
    return ExecuteResultDTOFromJSONTyped(json, false);
}

export function ExecuteResultDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ExecuteResultDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'ScId': !exists(json, 'ScId') ? undefined : json['ScId'],
        'TxHash': !exists(json, 'TxHash') ? undefined : json['TxHash']
    };
}

export function ExecuteResultDTOToJSON(value?: ExecuteResultDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'ScId': value.ScId,
        'TxHash': value.TxHash === undefined ? undefined : value.TxHash,
    };
}

