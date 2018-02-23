import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MatchEventComponent } from './match-event.component';
import { MatchEventDetailComponent } from './match-event-detail.component';
import { MatchEventPopupComponent } from './match-event-dialog.component';
import { MatchEventDeletePopupComponent } from './match-event-delete-dialog.component';

export const matchEventRoute: Routes = [
    {
        path: 'match-event',
        component: MatchEventComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MatchEvents'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'match-event/:id',
        component: MatchEventDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MatchEvents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const matchEventPopupRoute: Routes = [
    {
        path: 'match-event-new',
        component: MatchEventPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MatchEvents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'match-event/:id/edit',
        component: MatchEventPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MatchEvents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'match-event/:id/delete',
        component: MatchEventDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MatchEvents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
