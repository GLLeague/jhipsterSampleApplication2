import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TeamMySuffix } from './team-my-suffix.model';
import { TeamMySuffixPopupService } from './team-my-suffix-popup.service';
import { TeamMySuffixService } from './team-my-suffix.service';

@Component({
    selector: 'jhi-team-my-suffix-dialog',
    templateUrl: './team-my-suffix-dialog.component.html'
})
export class TeamMySuffixDialogComponent implements OnInit {

    team: TeamMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private teamService: TeamMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.team.id !== undefined) {
            this.subscribeToSaveResponse(
                this.teamService.update(this.team));
        } else {
            this.subscribeToSaveResponse(
                this.teamService.create(this.team));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TeamMySuffix>>) {
        result.subscribe((res: HttpResponse<TeamMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TeamMySuffix) {
        this.eventManager.broadcast({ name: 'teamListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-team-my-suffix-popup',
    template: ''
})
export class TeamMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private teamPopupService: TeamMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.teamPopupService
                    .open(TeamMySuffixDialogComponent as Component, params['id']);
            } else {
                this.teamPopupService
                    .open(TeamMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
