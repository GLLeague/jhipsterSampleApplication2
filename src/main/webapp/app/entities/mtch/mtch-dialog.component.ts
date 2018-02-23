import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Mtch } from './mtch.model';
import { MtchPopupService } from './mtch-popup.service';
import { MtchService } from './mtch.service';

@Component({
    selector: 'jhi-mtch-dialog',
    templateUrl: './mtch-dialog.component.html'
})
export class MtchDialogComponent implements OnInit {

    mtch: Mtch;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private mtchService: MtchService,
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
        if (this.mtch.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mtchService.update(this.mtch));
        } else {
            this.subscribeToSaveResponse(
                this.mtchService.create(this.mtch));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Mtch>>) {
        result.subscribe((res: HttpResponse<Mtch>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Mtch) {
        this.eventManager.broadcast({ name: 'mtchListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-mtch-popup',
    template: ''
})
export class MtchPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mtchPopupService: MtchPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mtchPopupService
                    .open(MtchDialogComponent as Component, params['id']);
            } else {
                this.mtchPopupService
                    .open(MtchDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
