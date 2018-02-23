import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Season } from './season.model';
import { SeasonService } from './season.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-season',
    templateUrl: './season.component.html'
})
export class SeasonComponent implements OnInit, OnDestroy {
seasons: Season[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private seasonService: SeasonService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.seasonService.query().subscribe(
            (res: HttpResponse<Season[]>) => {
                this.seasons = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSeasons();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Season) {
        return item.id;
    }
    registerChangeInSeasons() {
        this.eventSubscriber = this.eventManager.subscribe('seasonListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
