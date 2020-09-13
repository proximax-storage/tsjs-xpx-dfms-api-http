import { ContractDTO } from "../infrastructure/models";

export class Contract {

    private constructor(
        public readonly drive: string,
        public readonly owner?: string,
        public readonly replicators?: string[],
        public readonly root?: string,
        public readonly created?: number,
        public readonly duration?: number,
        public readonly billingPrice?: number,
        public readonly billingPeriod?: number,
        public readonly space?: number,
        public readonly replicas?: number,
        public readonly minReplicators?: number,
        public readonly percentApprovers?: number,
    ) {

    }

    public static fromDTO(dto: ContractDTO) {
        if (dto.drive === undefined) {
            throw new Error('Missing mandatory "drive" parameter.');
        }
        return new Contract(
            dto.drive,
            dto.owner,
            dto.replicators,
            dto.root,
            dto.created,
            dto.duration,
            dto.billingPrice,
            dto.billingPeriod,
            dto.space,
            dto.replicas,
            dto.minReplicators,
            dto.percentApprovers
        );
    }
}