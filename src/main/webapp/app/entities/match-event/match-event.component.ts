import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MatchEvent } from './match-event.model';
import { MatchEventService } from './match-event.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-match-event',
    templateUrl: './match-event.component.html'
})
export class MatchEventComponent implements OnInit, OnDestroy {
matchEvents: MatchEvent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private matchEventService: MatchEventService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.matchEventService.query().subscribe(
            (res: HttpResponse<MatchEvent[]>) => {
                this.matchEvents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMatchEvents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MatchEvent) {
        return item.id;
    }
    registerChangeInMatchEvents() {
        this.eventSubscriber = this.eventManager.subscribe('matchEventListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
