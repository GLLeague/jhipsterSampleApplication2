import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MtchMySuffix } from './mtch-my-suffix.model';
import { MtchMySuffixService } from './mtch-my-suffix.service';

@Component({
    selector: 'jhi-mtch-my-suffix-detail',
    templateUrl: './mtch-my-suffix-detail.component.html'
})
export class MtchMySuffixDetailComponent implements OnInit, OnDestroy {

    mtch: MtchMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mtchService: MtchMySuffixService,
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
            .subscribe((mtchResponse: HttpResponse<MtchMySuffix>) => {
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
