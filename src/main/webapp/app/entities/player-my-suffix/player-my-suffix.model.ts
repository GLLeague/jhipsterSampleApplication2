import { BaseEntity } from './../../shared';

export class PlayerMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public playerName?: string,
        public nickname?: string,
        public team?: BaseEntity,
    ) {
    }
}
