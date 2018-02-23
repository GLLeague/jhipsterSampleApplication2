import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Season } from './season.model';
import { SeasonPopupService } from './season-popup.service';
import { SeasonService } from './season.service';

@Component({
    selector: 'jhi-season-dialog',
    templateUrl: './season-dialog.component.html'
})
export class SeasonDialogComponent implements OnInit {

    season: Season;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private seasonService: SeasonService,
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<Season>>) {
        result.subscribe((res: HttpResponse<Season>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Season) {
        this.eventManager.broadcast({ name: 'seasonListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-season-popup',
    template: ''
})
export class SeasonPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private seasonPopupService: SeasonPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.seasonPopupService
                    .open(SeasonDialogComponent as Component, params['id']);
            } else {
                this.seasonPopupService
                    .open(SeasonDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
