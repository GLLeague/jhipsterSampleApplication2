import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TeamMySuffixComponent } from './team-my-suffix.component';
import { TeamMySuffixDetailComponent } from './team-my-suffix-detail.component';
import { TeamMySuffixPopupComponent } from './team-my-suffix-dialog.component';
import { TeamMySuffixDeletePopupComponent } from './team-my-suffix-delete-dialog.component';

export const teamRoute: Routes = [
    {
        path: 'team-my-suffix',
        component: TeamMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teams'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'team-my-suffix/:id',
        component: TeamMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teams'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teamPopupRoute: Routes = [
    {
        path: 'team-my-suffix-new',
        component: TeamMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teams'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'team-my-suffix/:id/edit',
        component: TeamMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teams'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'team-my-suffix/:id/delete',
        component: TeamMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teams'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
