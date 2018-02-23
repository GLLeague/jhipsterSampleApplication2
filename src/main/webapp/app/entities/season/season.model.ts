import { BaseEntity } from './../../shared';

export class Season implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
