import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Player } from './player.model';
import { PlayerService } from './player.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-player',
    templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit, OnDestroy {
players: Player[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private playerService: PlayerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.playerService.query().subscribe(
            (res: HttpResponse<Player[]>) => {
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

    trackId(index: number, item: Player) {
        return item.id;
    }
    registerChangeInPlayers() {
        this.eventSubscriber = this.eventManager.subscribe('playerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
