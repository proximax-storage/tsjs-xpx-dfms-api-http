import { exists, mapValues } from '../runtime';

export class CidParam extends String {

}

export function CidParamFromJSON(json: any): CidParam {
    return CidParamFromJSONTyped(json, false);
}

export function CidParamFromJSONTyped(json: any, ignoreDiscriminator: boolean): CidParam {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return !exists(json, 'cid') ? undefined : json['cid'];
}

export function CidParamToJSON(value?: CidParam | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'cid': value
    };
}
