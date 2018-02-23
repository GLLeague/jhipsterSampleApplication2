import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PlayerMySuffix } from './player-my-suffix.model';
import { PlayerMySuffixService } from './player-my-suffix.service';

@Component({
    selector: 'jhi-player-my-suffix-detail',
    templateUrl: './player-my-suffix-detail.component.html'
})
export class PlayerMySuffixDetailComponent implements OnInit, OnDestroy {

    player: PlayerMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private playerService: PlayerMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPlayers();
    }

    load(id) {
        this.playerService.find(id)
            .subscribe((playerResponse: HttpResponse<PlayerMySuffix>) => {
                this.player = playerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPlayers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'playerListModification',
            (response) => this.load(this.player.id)
        );
    }
}
