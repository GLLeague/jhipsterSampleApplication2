import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MtchComponent } from './mtch.component';
import { MtchDetailComponent } from './mtch-detail.component';
import { MtchPopupComponent } from './mtch-dialog.component';
import { MtchDeletePopupComponent } from './mtch-delete-dialog.component';

export const mtchRoute: Routes = [
    {
        path: 'mtch',
        component: MtchComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mtches'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'mtch/:id',
        component: MtchDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mtches'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mtchPopupRoute: Routes = [
    {
        path: 'mtch-new',
        component: MtchPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mtches'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mtch/:id/edit',
        component: MtchPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mtches'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mtch/:id/delete',
        component: MtchDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Mtches'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
