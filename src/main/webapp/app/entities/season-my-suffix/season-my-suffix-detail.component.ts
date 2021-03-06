import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SeasonMySuffix } from './season-my-suffix.model';
import { SeasonMySuffixService } from './season-my-suffix.service';

@Component({
    selector: 'jhi-season-my-suffix-detail',
    templateUrl: './season-my-suffix-detail.component.html'
})
export class SeasonMySuffixDetailComponent implements OnInit, OnDestroy {

    season: SeasonMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private seasonService: SeasonMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSeasons();
    }

    load(id) {
        this.seasonService.find(id)
            .subscribe((seasonResponse: HttpResponse<SeasonMySuffix>) => {
                this.season = seasonResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSeasons() {
        this.eventSubscriber = this.eventManager.subscribe(
            'seasonListModification',
            (response) => this.load(this.season.id)
        );
    }
}
