import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MtchEvent } from './mtch-event.model';
import { MtchEventPopupService } from './mtch-event-popup.service';
import { MtchEventService } from './mtch-event.service';

@Component({
    selector: 'jhi-mtch-event-dialog',
    templateUrl: './mtch-event-dialog.component.html'
})
export class MtchEventDialogComponent implements OnInit {

    mtchEvent: MtchEvent;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private mtchEventService: MtchEventService,
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
        if (this.mtchEvent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mtchEventService.update(this.mtchEvent));
        } else {
            this.subscribeToSaveResponse(
                this.mtchEventService.create(this.mtchEvent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MtchEvent>>) {
        result.subscribe((res: HttpResponse<MtchEvent>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MtchEvent) {
        this.eventManager.broadcast({ name: 'mtchEventListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-mtch-event-popup',
    template: ''
})
export class MtchEventPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mtchEventPopupService: MtchEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mtchEventPopupService
                    .open(MtchEventDialogComponent as Component, params['id']);
            } else {
                this.mtchEventPopupService
                    .open(MtchEventDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
