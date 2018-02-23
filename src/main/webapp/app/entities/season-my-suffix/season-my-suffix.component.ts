import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SeasonMySuffix } from './season-my-suffix.model';
import { SeasonMySuffixService } from './season-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-season-my-suffix',
    templateUrl: './season-my-suffix.component.html'
})
export class SeasonMySuffixComponent implements OnInit, OnDestroy {
seasons: SeasonMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private seasonService: SeasonMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.seasonService.query().subscribe(
            (res: HttpResponse<SeasonMySuffix[]>) => {
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

    trackId(index: number, item: SeasonMySuffix) {
        return item.id;
    }
    registerChangeInSeasons() {
        this.eventSubscriber = this.eventManager.subscribe('seasonListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
