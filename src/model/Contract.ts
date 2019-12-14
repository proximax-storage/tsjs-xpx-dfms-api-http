import { ContractDTO } from "../infrastructure/api";

export class Contract {

    private constructor(
        public readonly drive: string,
        public readonly duration?: number
    ) {

    }

    public static fromDTO(dto: ContractDTO) {
        if (dto.drive === undefined) {
            throw new Error('Missing mandatory "drive" parameter.');
        }
        return new Contract(
            dto.drive,
            dto.duration
        );
    }
}