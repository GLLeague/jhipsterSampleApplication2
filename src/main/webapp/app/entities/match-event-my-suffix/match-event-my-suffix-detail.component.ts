import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MatchEventMySuffix } from './match-event-my-suffix.model';
import { MatchEventMySuffixService } from './match-event-my-suffix.service';

@Component({
    selector: 'jhi-match-event-my-suffix-detail',
    templateUrl: './match-event-my-suffix-detail.component.html'
})
export class MatchEventMySuffixDetailComponent implements OnInit, OnDestroy {

    matchEvent: MatchEventMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private matchEventService: MatchEventMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMatchEvents();
    }

    load(id) {
        this.matchEventService.find(id)
            .subscribe((matchEventResponse: HttpResponse<MatchEventMySuffix>) => {
                this.matchEvent = matchEventResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMatchEvents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'matchEventListModification',
            (response) => this.load(this.matchEvent.id)
        );
    }
}
