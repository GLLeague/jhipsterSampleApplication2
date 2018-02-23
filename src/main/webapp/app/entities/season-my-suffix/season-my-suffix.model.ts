import { BaseEntity } from './../../shared';

export class SeasonMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public rounds?: BaseEntity[],
    ) {
    }
}
