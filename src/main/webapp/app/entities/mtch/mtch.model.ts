import { BaseEntity } from './../../shared';

export const enum MatchType {
    'TOURNAMENT',
    'CLASSIC'
}

export class Mtch implements BaseEntity {
    constructor(
        public id?: number,
        public matchType?: MatchType,
    ) {
    }
}
