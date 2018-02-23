import { BaseEntity } from './../../shared';

export const enum EventType {
    'GOAL',
    'ASSIST'
}

export class MatchEventMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public eventType?: EventType,
        public mtch?: BaseEntity,
        public player?: BaseEntity,
    ) {
    }
}
