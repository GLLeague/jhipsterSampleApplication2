import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication2SharedModule } from '../../shared';
import {
    SeasonService,
    SeasonPopupService,
    SeasonComponent,
    SeasonDetailComponent,
    SeasonDialogComponent,
    SeasonPopupComponent,
    SeasonDeletePopupComponent,
    SeasonDeleteDialogComponent,
    seasonRoute,
    seasonPopupRoute,
} from './';

const ENTITY_STATES = [
    ...seasonRoute,
    ...seasonPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplication2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SeasonComponent,
        SeasonDetailComponent,
        SeasonDialogComponent,
        SeasonDeleteDialogComponent,
        SeasonPopupComponent,
        SeasonDeletePopupComponent,
    ],
    entryComponents: [
        SeasonComponent,
        SeasonDialogComponent,
        SeasonPopupComponent,
        SeasonDeleteDialogComponent,
        SeasonDeletePopupComponent,
    ],
    providers: [
        SeasonService,
        SeasonPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplication2SeasonModule {}
