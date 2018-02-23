import { BaseEntity } from './../../shared';

export class RoundMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public order?: number,
        public matches?: BaseEntity[],
        public season?: BaseEntity,
    ) {
    }
}
