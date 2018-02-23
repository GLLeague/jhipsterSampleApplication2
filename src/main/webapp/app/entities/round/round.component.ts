import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Round } from './round.model';
import { RoundService } from './round.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-round',
    templateUrl: './round.component.html'
})
export class RoundComponent implements OnInit, OnDestroy {
rounds: Round[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private roundService: RoundService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.roundService.query().subscribe(
            (res: HttpResponse<Round[]>) => {
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

    trackId(index: number, item: Round) {
        return item.id;
    }
    registerChangeInRounds() {
        this.eventSubscriber = this.eventManager.subscribe('roundListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
