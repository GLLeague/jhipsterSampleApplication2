import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication2SharedModule } from '../../shared';
import {
    SeasonMySuffixService,
    SeasonMySuffixPopupService,
    SeasonMySuffixComponent,
    SeasonMySuffixDetailComponent,
    SeasonMySuffixDialogComponent,
    SeasonMySuffixPopupComponent,
    SeasonMySuffixDeletePopupComponent,
    SeasonMySuffixDeleteDialogComponent,
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
        SeasonMySuffixComponent,
        SeasonMySuffixDetailComponent,
        SeasonMySuffixDialogComponent,
        SeasonMySuffixDeleteDialogComponent,
        SeasonMySuffixPopupComponent,
        SeasonMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SeasonMySuffixComponent,
        SeasonMySuffixDialogComponent,
        SeasonMySuffixPopupComponent,
        SeasonMySuffixDeleteDialogComponent,
        SeasonMySuffixDeletePopupComponent,
    ],
    providers: [
        SeasonMySuffixService,
        SeasonMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplication2SeasonMySuffixModule {}
