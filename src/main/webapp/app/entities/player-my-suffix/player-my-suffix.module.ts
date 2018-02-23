import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication2SharedModule } from '../../shared';
import {
    PlayerMySuffixService,
    PlayerMySuffixPopupService,
    PlayerMySuffixComponent,
    PlayerMySuffixDetailComponent,
    PlayerMySuffixDialogComponent,
    PlayerMySuffixPopupComponent,
    PlayerMySuffixDeletePopupComponent,
    PlayerMySuffixDeleteDialogComponent,
    playerRoute,
    playerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...playerRoute,
    ...playerPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplication2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PlayerMySuffixComponent,
        PlayerMySuffixDetailComponent,
        PlayerMySuffixDialogComponent,
        PlayerMySuffixDeleteDialogComponent,
        PlayerMySuffixPopupComponent,
        PlayerMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PlayerMySuffixComponent,
        PlayerMySuffixDialogComponent,
        PlayerMySuffixPopupComponent,
        PlayerMySuffixDeleteDialogComponent,
        PlayerMySuffixDeletePopupComponent,
    ],
    providers: [
        PlayerMySuffixService,
        PlayerMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplication2PlayerMySuffixModule {}
