import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication2SharedModule } from '../../shared';
import {
    RoundMySuffixService,
    RoundMySuffixPopupService,
    RoundMySuffixComponent,
    RoundMySuffixDetailComponent,
    RoundMySuffixDialogComponent,
    RoundMySuffixPopupComponent,
    RoundMySuffixDeletePopupComponent,
    RoundMySuffixDeleteDialogComponent,
    roundRoute,
    roundPopupRoute,
} from './';

const ENTITY_STATES = [
    ...roundRoute,
    ...roundPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplication2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RoundMySuffixComponent,
        RoundMySuffixDetailComponent,
        RoundMySuffixDialogComponent,
        RoundMySuffixDeleteDialogComponent,
        RoundMySuffixPopupComponent,
        RoundMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        RoundMySuffixComponent,
        RoundMySuffixDialogComponent,
        RoundMySuffixPopupComponent,
        RoundMySuffixDeleteDialogComponent,
        RoundMySuffixDeletePopupComponent,
    ],
    providers: [
        RoundMySuffixService,
        RoundMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplication2RoundMySuffixModule {}
