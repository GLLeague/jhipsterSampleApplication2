import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MatchEventMySuffix } from './match-event-my-suffix.model';
import { MatchEventMySuffixService } from './match-event-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-match-event-my-suffix',
    templateUrl: './match-event-my-suffix.component.html'
})
export class MatchEventMySuffixComponent implements OnInit, OnDestroy {
matchEvents: MatchEventMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private matchEventService: MatchEventMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.matchEventService.query().subscribe(
            (res: HttpResponse<MatchEventMySuffix[]>) => {
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

    trackId(index: number, item: MatchEventMySuffix) {
        return item.id;
    }
    registerChangeInMatchEvents() {
        this.eventSubscriber = this.eventManager.subscribe('matchEventListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
