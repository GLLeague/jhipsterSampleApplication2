import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Mtch } from './mtch.model';
import { MtchService } from './mtch.service';

@Component({
    selector: 'jhi-mtch-detail',
    templateUrl: './mtch-detail.component.html'
})
export class MtchDetailComponent implements OnInit, OnDestroy {

    mtch: Mtch;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mtchService: MtchService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMtches();
    }

    load(id) {
        this.mtchService.find(id)
            .subscribe((mtchResponse: HttpResponse<Mtch>) => {
                this.mtch = mtchResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMtches() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mtchListModification',
            (response) => this.load(this.mtch.id)
        );
    }
}
