import { BaseEntity } from './../../shared';

export class TeamMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public teamName?: string,
        public players?: BaseEntity[],
    ) {
    }
}
