import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MtchEvent } from './mtch-event.model';
import { MtchEventService } from './mtch-event.service';

@Component({
    selector: 'jhi-mtch-event-detail',
    templateUrl: './mtch-event-detail.component.html'
})
export class MtchEventDetailComponent implements OnInit, OnDestroy {

    mtchEvent: MtchEvent;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mtchEventService: MtchEventService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMtchEvents();
    }

    load(id) {
        this.mtchEventService.find(id)
            .subscribe((mtchEventResponse: HttpResponse<MtchEvent>) => {
                this.mtchEvent = mtchEventResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMtchEvents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mtchEventListModification',
            (response) => this.load(this.mtchEvent.id)
        );
    }
}
