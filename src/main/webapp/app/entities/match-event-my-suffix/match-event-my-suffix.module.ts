import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication2SharedModule } from '../../shared';
import {
    MatchEventMySuffixService,
    MatchEventMySuffixPopupService,
    MatchEventMySuffixComponent,
    MatchEventMySuffixDetailComponent,
    MatchEventMySuffixDialogComponent,
    MatchEventMySuffixPopupComponent,
    MatchEventMySuffixDeletePopupComponent,
    MatchEventMySuffixDeleteDialogComponent,
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
        MatchEventMySuffixComponent,
        MatchEventMySuffixDetailComponent,
        MatchEventMySuffixDialogComponent,
        MatchEventMySuffixDeleteDialogComponent,
        MatchEventMySuffixPopupComponent,
        MatchEventMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MatchEventMySuffixComponent,
        MatchEventMySuffixDialogComponent,
        MatchEventMySuffixPopupComponent,
        MatchEventMySuffixDeleteDialogComponent,
        MatchEventMySuffixDeletePopupComponent,
    ],
    providers: [
        MatchEventMySuffixService,
        MatchEventMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplication2MatchEventMySuffixModule {}
