import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SeasonMySuffixComponent } from './season-my-suffix.component';
import { SeasonMySuffixDetailComponent } from './season-my-suffix-detail.component';
import { SeasonMySuffixPopupComponent } from './season-my-suffix-dialog.component';
import { SeasonMySuffixDeletePopupComponent } from './season-my-suffix-delete-dialog.component';

export const seasonRoute: Routes = [
    {
        path: 'season-my-suffix',
        component: SeasonMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Seasons'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'season-my-suffix/:id',
        component: SeasonMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Seasons'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const seasonPopupRoute: Routes = [
    {
        path: 'season-my-suffix-new',
        component: SeasonMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Seasons'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'season-my-suffix/:id/edit',
        component: SeasonMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Seasons'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'season-my-suffix/:id/delete',
        component: SeasonMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Seasons'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
