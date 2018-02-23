import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MtchMySuffix } from './mtch-my-suffix.model';
import { MtchMySuffixPopupService } from './mtch-my-suffix-popup.service';
import { MtchMySuffixService } from './mtch-my-suffix.service';
import { TeamMySuffix, TeamMySuffixService } from '../team-my-suffix';
import { RoundMySuffix, RoundMySuffixService } from '../round-my-suffix';

@Component({
    selector: 'jhi-mtch-my-suffix-dialog',
    templateUrl: './mtch-my-suffix-dialog.component.html'
})
export class MtchMySuffixDialogComponent implements OnInit {

    mtch: MtchMySuffix;
    isSaving: boolean;

    teamones: TeamMySuffix[];

    teamtwos: TeamMySuffix[];

    rounds: RoundMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private mtchService: MtchMySuffixService,
        private teamService: TeamMySuffixService,
        private roundService: RoundMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.teamService
            .query({filter: 'mtch-is-null'})
            .subscribe((res: HttpResponse<TeamMySuffix[]>) => {
                if (!this.mtch.teamOne || !this.mtch.teamOne.id) {
                    this.teamones = res.body;
                } else {
                    this.teamService
                        .find(this.mtch.teamOne.id)
                        .subscribe((subRes: HttpResponse<TeamMySuffix>) => {
                            this.teamones = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.teamService
            .query({filter: 'mtch-is-null'})
            .subscribe((res: HttpResponse<TeamMySuffix[]>) => {
                if (!this.mtch.teamTwo || !this.mtch.teamTwo.id) {
                    this.teamtwos = res.body;
                } else {
                    this.teamService
                        .find(this.mtch.teamTwo.id)
                        .subscribe((subRes: HttpResponse<TeamMySuffix>) => {
                            this.teamtwos = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.roundService.query()
            .subscribe((res: HttpResponse<RoundMySuffix[]>) => { this.rounds = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mtch.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mtchService.update(this.mtch));
        } else {
            this.subscribeToSaveResponse(
                this.mtchService.create(this.mtch));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MtchMySuffix>>) {
        result.subscribe((res: HttpResponse<MtchMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MtchMySuffix) {
        this.eventManager.broadcast({ name: 'mtchListModification', content: 'OK'});
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

    trackRoundById(index: number, item: RoundMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-mtch-my-suffix-popup',
    template: ''
})
export class MtchMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mtchPopupService: MtchMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mtchPopupService
                    .open(MtchMySuffixDialogComponent as Component, params['id']);
            } else {
                this.mtchPopupService
                    .open(MtchMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
