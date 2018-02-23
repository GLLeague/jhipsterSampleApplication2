import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MtchEventComponent } from './mtch-event.component';
import { MtchEventDetailComponent } from './mtch-event-detail.component';
import { MtchEventPopupComponent } from './mtch-event-dialog.component';
import { MtchEventDeletePopupComponent } from './mtch-event-delete-dialog.component';

export const mtchEventRoute: Routes = [
    {
        path: 'mtch-event',
        component: MtchEventComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MtchEvents'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'mtch-event/:id',
        component: MtchEventDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MtchEvents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mtchEventPopupRoute: Routes = [
    {
        path: 'mtch-event-new',
        component: MtchEventPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MtchEvents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mtch-event/:id/edit',
        component: MtchEventPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MtchEvents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mtch-event/:id/delete',
        component: MtchEventDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MtchEvents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
