import { BaseEntity } from './../../shared';

export class Player implements BaseEntity {
    constructor(
        public id?: number,
        public playerName?: string,
        public nickname?: string,
    ) {
    }
}
