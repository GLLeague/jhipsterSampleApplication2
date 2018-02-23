import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MtchMySuffixComponent } from './mtch-my-suffix.component';
import { MtchMySuffixDetailComponent } from './mtch-my-suffix-detail.component';
import { MtchMySuffixPopupComponent } from './mtch-my-suffix-dialog.component';
import { MtchMySuffixDeletePopupComponent } from './mtch-my-suffix-delete-dialog.component';

export const mtchRoute: Routes = [
    {
        path: 'mtch-my-suffix',
        component: MtchMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mtches'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'mtch-my-suffix/:id',
        component: MtchMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mtches'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mtchPopupRoute: Routes = [
    {
        path: 'mtch-my-suffix-new',
        component: MtchMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mtches'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mtch-my-suffix/:id/edit',
        component: MtchMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mtches'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mtch-my-suffix/:id/delete',
        component: MtchMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mtches'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
