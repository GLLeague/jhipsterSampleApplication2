import { BaseEntity } from './../../shared';

export const enum EventType {
    'GOAL',
    'ASSIST'
}

export class MtchEvent implements BaseEntity {
    constructor(
        public id?: number,
        public eventType?: EventType,
    ) {
    }
}
