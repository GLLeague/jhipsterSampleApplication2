import { BaseEntity } from './../../shared';

export const enum MtchType {
    'TOURNAMENT',
    'CLASSIC'
}

export class Mtch implements BaseEntity {
    constructor(
        public id?: number,
        public matchType?: MtchType,
    ) {
    }
}
