import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MatchEvent } from './match-event.model';
import { MatchEventService } from './match-event.service';

@Component({
    selector: 'jhi-match-event-detail',
    templateUrl: './match-event-detail.component.html'
})
export class MatchEventDetailComponent implements OnInit, OnDestroy {

    matchEvent: MatchEvent;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private matchEventService: MatchEventService,
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
            .subscribe((matchEventResponse: HttpResponse<MatchEvent>) => {
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
