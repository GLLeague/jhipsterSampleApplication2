import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MatchEventMySuffix } from './match-event-my-suffix.model';
import { MatchEventMySuffixPopupService } from './match-event-my-suffix-popup.service';
import { MatchEventMySuffixService } from './match-event-my-suffix.service';
import { MtchMySuffix, MtchMySuffixService } from '../mtch-my-suffix';
import { PlayerMySuffix, PlayerMySuffixService } from '../player-my-suffix';

@Component({
    selector: 'jhi-match-event-my-suffix-dialog',
    templateUrl: './match-event-my-suffix-dialog.component.html'
})
export class MatchEventMySuffixDialogComponent implements OnInit {

    matchEvent: MatchEventMySuffix;
    isSaving: boolean;

    mtches: MtchMySuffix[];

    players: PlayerMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private matchEventService: MatchEventMySuffixService,
        private mtchService: MtchMySuffixService,
        private playerService: PlayerMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.mtchService.query()
            .subscribe((res: HttpResponse<MtchMySuffix[]>) => { this.mtches = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.playerService
            .query({filter: 'matchevent-is-null'})
            .subscribe((res: HttpResponse<PlayerMySuffix[]>) => {
                if (!this.matchEvent.player || !this.matchEvent.player.id) {
                    this.players = res.body;
                } else {
                    this.playerService
                        .find(this.matchEvent.player.id)
                        .subscribe((subRes: HttpResponse<PlayerMySuffix>) => {
                            this.players = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.matchEvent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.matchEventService.update(this.matchEvent));
        } else {
            this.subscribeToSaveResponse(
                this.matchEventService.create(this.matchEvent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MatchEventMySuffix>>) {
        result.subscribe((res: HttpResponse<MatchEventMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MatchEventMySuffix) {
        this.eventManager.broadcast({ name: 'matchEventListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMtchById(index: number, item: MtchMySuffix) {
        return item.id;
    }

    trackPlayerById(index: number, item: PlayerMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-match-event-my-suffix-popup',
    template: ''
})
export class MatchEventMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private matchEventPopupService: MatchEventMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.matchEventPopupService
                    .open(MatchEventMySuffixDialogComponent as Component, params['id']);
            } else {
                this.matchEventPopupService
                    .open(MatchEventMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
