import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MatchEvent } from './match-event.model';
import { MatchEventPopupService } from './match-event-popup.service';
import { MatchEventService } from './match-event.service';

@Component({
    selector: 'jhi-match-event-dialog',
    templateUrl: './match-event-dialog.component.html'
})
export class MatchEventDialogComponent implements OnInit {

    matchEvent: MatchEvent;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private matchEventService: MatchEventService,
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
        if (this.matchEvent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.matchEventService.update(this.matchEvent));
        } else {
            this.subscribeToSaveResponse(
                this.matchEventService.create(this.matchEvent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MatchEvent>>) {
        result.subscribe((res: HttpResponse<MatchEvent>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MatchEvent) {
        this.eventManager.broadcast({ name: 'matchEventListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-match-event-popup',
    template: ''
})
export class MatchEventPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private matchEventPopupService: MatchEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.matchEventPopupService
                    .open(MatchEventDialogComponent as Component, params['id']);
            } else {
                this.matchEventPopupService
                    .open(MatchEventDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
