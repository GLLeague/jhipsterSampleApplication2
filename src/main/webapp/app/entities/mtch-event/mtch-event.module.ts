import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication2SharedModule } from '../../shared';
import {
    MtchEventService,
    MtchEventPopupService,
    MtchEventComponent,
    MtchEventDetailComponent,
    MtchEventDialogComponent,
    MtchEventPopupComponent,
    MtchEventDeletePopupComponent,
    MtchEventDeleteDialogComponent,
    mtchEventRoute,
    mtchEventPopupRoute,
} from './';

const ENTITY_STATES = [
    ...mtchEventRoute,
    ...mtchEventPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplication2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MtchEventComponent,
        MtchEventDetailComponent,
        MtchEventDialogComponent,
        MtchEventDeleteDialogComponent,
        MtchEventPopupComponent,
        MtchEventDeletePopupComponent,
    ],
    entryComponents: [
        MtchEventComponent,
        MtchEventDialogComponent,
        MtchEventPopupComponent,
        MtchEventDeleteDialogComponent,
        MtchEventDeletePopupComponent,
    ],
    providers: [
        MtchEventService,
        MtchEventPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplication2MtchEventModule {}
