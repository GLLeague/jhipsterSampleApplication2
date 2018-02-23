import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication2SharedModule } from '../../shared';
import {
    MtchMySuffixService,
    MtchMySuffixPopupService,
    MtchMySuffixComponent,
    MtchMySuffixDetailComponent,
    MtchMySuffixDialogComponent,
    MtchMySuffixPopupComponent,
    MtchMySuffixDeletePopupComponent,
    MtchMySuffixDeleteDialogComponent,
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
        MtchMySuffixComponent,
        MtchMySuffixDetailComponent,
        MtchMySuffixDialogComponent,
        MtchMySuffixDeleteDialogComponent,
        MtchMySuffixPopupComponent,
        MtchMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MtchMySuffixComponent,
        MtchMySuffixDialogComponent,
        MtchMySuffixPopupComponent,
        MtchMySuffixDeleteDialogComponent,
        MtchMySuffixDeletePopupComponent,
    ],
    providers: [
        MtchMySuffixService,
        MtchMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplication2MtchMySuffixModule {}
