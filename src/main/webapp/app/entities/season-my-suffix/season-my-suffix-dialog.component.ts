import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SeasonMySuffix } from './season-my-suffix.model';
import { SeasonMySuffixPopupService } from './season-my-suffix-popup.service';
import { SeasonMySuffixService } from './season-my-suffix.service';

@Component({
    selector: 'jhi-season-my-suffix-dialog',
    templateUrl: './season-my-suffix-dialog.component.html'
})
export class SeasonMySuffixDialogComponent implements OnInit {

    season: SeasonMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private seasonService: SeasonMySuffixService,
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
        if (this.season.id !== undefined) {
            this.subscribeToSaveResponse(
                this.seasonService.update(this.season));
        } else {
            this.subscribeToSaveResponse(
                this.seasonService.create(this.season));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SeasonMySuffix>>) {
        result.subscribe((res: HttpResponse<SeasonMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SeasonMySuffix) {
        this.eventManager.broadcast({ name: 'seasonListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-season-my-suffix-popup',
    template: ''
})
export class SeasonMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private seasonPopupService: SeasonMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.seasonPopupService
                    .open(SeasonMySuffixDialogComponent as Component, params['id']);
            } else {
                this.seasonPopupService
                    .open(SeasonMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
