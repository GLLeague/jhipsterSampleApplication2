import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RoundMySuffixComponent } from './round-my-suffix.component';
import { RoundMySuffixDetailComponent } from './round-my-suffix-detail.component';
import { RoundMySuffixPopupComponent } from './round-my-suffix-dialog.component';
import { RoundMySuffixDeletePopupComponent } from './round-my-suffix-delete-dialog.component';

export const roundRoute: Routes = [
    {
        path: 'round-my-suffix',
        component: RoundMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rounds'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'round-my-suffix/:id',
        component: RoundMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rounds'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const roundPopupRoute: Routes = [
    {
        path: 'round-my-suffix-new',
        component: RoundMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rounds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'round-my-suffix/:id/edit',
        component: RoundMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rounds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'round-my-suffix/:id/delete',
        component: RoundMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rounds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
