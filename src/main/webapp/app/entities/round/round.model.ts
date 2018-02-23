import { BaseEntity } from './../../shared';

export class Round implements BaseEntity {
    constructor(
        public id?: number,
        public order?: number,
    ) {
    }
}
