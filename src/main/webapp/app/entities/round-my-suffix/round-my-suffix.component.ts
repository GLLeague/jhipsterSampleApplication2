import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RoundMySuffix } from './round-my-suffix.model';
import { RoundMySuffixService } from './round-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-round-my-suffix',
    templateUrl: './round-my-suffix.component.html'
})
export class RoundMySuffixComponent implements OnInit, OnDestroy {
rounds: RoundMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private roundService: RoundMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.roundService.query().subscribe(
            (res: HttpResponse<RoundMySuffix[]>) => {
                this.rounds = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRounds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RoundMySuffix) {
        return item.id;
    }
    registerChangeInRounds() {
        this.eventSubscriber = this.eventManager.subscribe('roundListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
