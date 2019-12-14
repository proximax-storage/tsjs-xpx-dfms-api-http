import { StatDTO } from "../infrastructure/api";

export enum TypeEnum {
    File,
    Dir
}

export class Stat {

    private constructor(
        public readonly name: string,
        public readonly size: number,
        public readonly type: TypeEnum,
    ) {

    }

    public static fromDTO(dto: StatDTO) {
        if (dto.name === undefined) {
            throw new Error('Couldn\'t parse name.');
        }
        if (dto.size === undefined) {
            throw new Error('Couldn\'t parse size.');
        }
        if (dto.type === undefined) {
            throw new Error('Couldn\'t parse type.');
        }
        return new Stat(
            dto.name,
            dto.size,
            dto.type === StatDTO.TypeEnum.File ? TypeEnum.File : TypeEnum.Dir
        );
    }
}