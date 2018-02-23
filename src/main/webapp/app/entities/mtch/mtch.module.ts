import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication2SharedModule } from '../../shared';
import {
    MtchService,
    MtchPopupService,
    MtchComponent,
    MtchDetailComponent,
    MtchDialogComponent,
    MtchPopupComponent,
    MtchDeletePopupComponent,
    MtchDeleteDialogComponent,
    mtchRoute,
    mtchPopupRoute,
} from './';

const ENTITY_STATES = [
    ...mtchRoute,
    ...mtchPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplication2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MtchComponent,
        MtchDetailComponent,
        MtchDialogComponent,
        MtchDeleteDialogComponent,
        MtchPopupComponent,
        MtchDeletePopupComponent,
    ],
    entryComponents: [
        MtchComponent,
        MtchDialogComponent,
        MtchPopupComponent,
        MtchDeleteDialogComponent,
        MtchDeletePopupComponent,
    ],
    providers: [
        MtchService,
        MtchPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplication2MtchModule {}
