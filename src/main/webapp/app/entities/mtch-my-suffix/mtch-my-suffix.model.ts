import { BaseEntity } from './../../shared';

export const enum MatchType {
    'TOURNAMENT',
    'CLASSIC'
}

export class MtchMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public matchType?: MatchType,
        public teamOne?: BaseEntity,
        public teamTwo?: BaseEntity,
        public matchEvents?: BaseEntity[],
        public round?: BaseEntity,
    ) {
    }
}
