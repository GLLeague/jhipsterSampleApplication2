import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication2SharedModule } from '../../shared';
import {
    TeamMySuffixService,
    TeamMySuffixPopupService,
    TeamMySuffixComponent,
    TeamMySuffixDetailComponent,
    TeamMySuffixDialogComponent,
    TeamMySuffixPopupComponent,
    TeamMySuffixDeletePopupComponent,
    TeamMySuffixDeleteDialogComponent,
    teamRoute,
    teamPopupRoute,
} from './';

const ENTITY_STATES = [
    ...teamRoute,
    ...teamPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplication2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TeamMySuffixComponent,
        TeamMySuffixDetailComponent,
        TeamMySuffixDialogComponent,
        TeamMySuffixDeleteDialogComponent,
        TeamMySuffixPopupComponent,
        TeamMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TeamMySuffixComponent,
        TeamMySuffixDialogComponent,
        TeamMySuffixPopupComponent,
        TeamMySuffixDeleteDialogComponent,
        TeamMySuffixDeletePopupComponent,
    ],
    providers: [
        TeamMySuffixService,
        TeamMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplication2TeamMySuffixModule {}
