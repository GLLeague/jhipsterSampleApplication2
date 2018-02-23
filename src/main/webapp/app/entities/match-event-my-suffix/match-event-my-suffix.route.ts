import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MatchEventMySuffixComponent } from './match-event-my-suffix.component';
import { MatchEventMySuffixDetailComponent } from './match-event-my-suffix-detail.component';
import { MatchEventMySuffixPopupComponent } from './match-event-my-suffix-dialog.component';
import { MatchEventMySuffixDeletePopupComponent } from './match-event-my-suffix-delete-dialog.component';

export const matchEventRoute: Routes = [
    {
        path: 'match-event-my-suffix',
        component: MatchEventMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MatchEvents'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'match-event-my-suffix/:id',
        component: MatchEventMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MatchEvents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const matchEventPopupRoute: Routes = [
    {
        path: 'match-event-my-suffix-new',
        component: MatchEventMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MatchEvents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'match-event-my-suffix/:id/edit',
        component: MatchEventMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MatchEvents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'match-event-my-suffix/:id/delete',
        component: MatchEventMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MatchEvents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
