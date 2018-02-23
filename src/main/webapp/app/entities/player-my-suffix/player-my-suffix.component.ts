import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PlayerMySuffix } from './player-my-suffix.model';
import { PlayerMySuffixService } from './player-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-player-my-suffix',
    templateUrl: './player-my-suffix.component.html'
})
export class PlayerMySuffixComponent implements OnInit, OnDestroy {
players: PlayerMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private playerService: PlayerMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.playerService.query().subscribe(
            (res: HttpResponse<PlayerMySuffix[]>) => {
                this.players = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPlayers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PlayerMySuffix) {
        return item.id;
    }
    registerChangeInPlayers() {
        this.eventSubscriber = this.eventManager.subscribe('playerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
