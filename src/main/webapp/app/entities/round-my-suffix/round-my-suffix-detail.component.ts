import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RoundMySuffix } from './round-my-suffix.model';
import { RoundMySuffixService } from './round-my-suffix.service';

@Component({
    selector: 'jhi-round-my-suffix-detail',
    templateUrl: './round-my-suffix-detail.component.html'
})
export class RoundMySuffixDetailComponent implements OnInit, OnDestroy {

    round: RoundMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private roundService: RoundMySuffixService,
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
            .subscribe((roundResponse: HttpResponse<RoundMySuffix>) => {
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
