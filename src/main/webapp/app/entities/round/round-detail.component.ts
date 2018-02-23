import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Round } from './round.model';
import { RoundService } from './round.service';

@Component({
    selector: 'jhi-round-detail',
    templateUrl: './round-detail.component.html'
})
export class RoundDetailComponent implements OnInit, OnDestroy {

    round: Round;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private roundService: RoundService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRounds();
    }

    load(id) {
        this.roundService.find(id)
            .subscribe((roundResponse: HttpResponse<Round>) => {
                this.round = roundResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRounds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'roundListModification',
            (response) => this.load(this.round.id)
        );
    }
}
