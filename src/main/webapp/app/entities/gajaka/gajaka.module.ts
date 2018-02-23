import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication2SharedModule } from '../../shared';
import {
    GajakaService,
    GajakaPopupService,
    GajakaComponent,
    GajakaDetailComponent,
    GajakaDialogComponent,
    GajakaPopupComponent,
    GajakaDeletePopupComponent,
    GajakaDeleteDialogComponent,
    gajakaRoute,
    gajakaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...gajakaRoute,
    ...gajakaPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplication2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GajakaComponent,
        GajakaDetailComponent,
        GajakaDialogComponent,
        GajakaDeleteDialogComponent,
        GajakaPopupComponent,
        GajakaDeletePopupComponent,
    ],
    entryComponents: [
        GajakaComponent,
        GajakaDialogComponent,
        GajakaPopupComponent,
        GajakaDeleteDialogComponent,
        GajakaDeletePopupComponent,
    ],
    providers: [
        GajakaService,
        GajakaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplication2GajakaModule {}
