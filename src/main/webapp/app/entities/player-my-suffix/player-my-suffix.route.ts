import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PlayerMySuffixComponent } from './player-my-suffix.component';
import { PlayerMySuffixDetailComponent } from './player-my-suffix-detail.component';
import { PlayerMySuffixPopupComponent } from './player-my-suffix-dialog.component';
import { PlayerMySuffixDeletePopupComponent } from './player-my-suffix-delete-dialog.component';

export const playerRoute: Routes = [
    {
        path: 'player-my-suffix',
        component: PlayerMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Players'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'player-my-suffix/:id',
        component: PlayerMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Players'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const playerPopupRoute: Routes = [
    {
        path: 'player-my-suffix-new',
        component: PlayerMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Players'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'player-my-suffix/:id/edit',
        component: PlayerMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Players'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'player-my-suffix/:id/delete',
        component: PlayerMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Players'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
