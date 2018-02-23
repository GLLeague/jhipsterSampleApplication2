import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication2SharedModule } from '../../shared';
import {
    MatchEventService,
    MatchEventPopupService,
    MatchEventComponent,
    MatchEventDetailComponent,
    MatchEventDialogComponent,
    MatchEventPopupComponent,
    MatchEventDeletePopupComponent,
    MatchEventDeleteDialogComponent,
    matchEventRoute,
    matchEventPopupRoute,
} from './';

const ENTITY_STATES = [
    ...matchEventRoute,
    ...matchEventPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplication2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MatchEventComponent,
        MatchEventDetailComponent,
        MatchEventDialogComponent,
        MatchEventDeleteDialogComponent,
        MatchEventPopupComponent,
        MatchEventDeletePopupComponent,
    ],
    entryComponents: [
        MatchEventComponent,
        MatchEventDialogComponent,
        MatchEventPopupComponent,
        MatchEventDeleteDialogComponent,
        MatchEventDeletePopupComponent,
    ],
    providers: [
        MatchEventService,
        MatchEventPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplication2MatchEventModule {}
