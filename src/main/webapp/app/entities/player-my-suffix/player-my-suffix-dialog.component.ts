import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PlayerMySuffix } from './player-my-suffix.model';
import { PlayerMySuffixPopupService } from './player-my-suffix-popup.service';
import { PlayerMySuffixService } from './player-my-suffix.service';
import { TeamMySuffix, TeamMySuffixService } from '../team-my-suffix';

@Component({
    selector: 'jhi-player-my-suffix-dialog',
    templateUrl: './player-my-suffix-dialog.component.html'
})
export class PlayerMySuffixDialogComponent implements OnInit {

    player: PlayerMySuffix;
    isSaving: boolean;

    teams: TeamMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private playerService: PlayerMySuffixService,
        private teamService: TeamMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.teamService.query()
            .subscribe((res: HttpResponse<TeamMySuffix[]>) => { this.teams = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.player.id !== undefined) {
            this.subscribeToSaveResponse(
                this.playerService.update(this.player));
        } else {
            this.subscribeToSaveResponse(
                this.playerService.create(this.player));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PlayerMySuffix>>) {
        result.subscribe((res: HttpResponse<PlayerMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PlayerMySuffix) {
        this.eventManager.broadcast({ name: 'playerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTeamById(index: number, item: TeamMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-player-my-suffix-popup',
    template: ''
})
export class PlayerMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private playerPopupService: PlayerMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.playerPopupService
                    .open(PlayerMySuffixDialogComponent as Component, params['id']);
            } else {
                this.playerPopupService
                    .open(PlayerMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
