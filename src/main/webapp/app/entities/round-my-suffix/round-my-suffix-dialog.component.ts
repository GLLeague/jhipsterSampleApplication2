import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RoundMySuffix } from './round-my-suffix.model';
import { RoundMySuffixPopupService } from './round-my-suffix-popup.service';
import { RoundMySuffixService } from './round-my-suffix.service';
import { SeasonMySuffix, SeasonMySuffixService } from '../season-my-suffix';

@Component({
    selector: 'jhi-round-my-suffix-dialog',
    templateUrl: './round-my-suffix-dialog.component.html'
})
export class RoundMySuffixDialogComponent implements OnInit {

    round: RoundMySuffix;
    isSaving: boolean;

    seasons: SeasonMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private roundService: RoundMySuffixService,
        private seasonService: SeasonMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.seasonService.query()
            .subscribe((res: HttpResponse<SeasonMySuffix[]>) => { this.seasons = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.round.id !== undefined) {
            this.subscribeToSaveResponse(
                this.roundService.update(this.round));
        } else {
            this.subscribeToSaveResponse(
                this.roundService.create(this.round));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RoundMySuffix>>) {
        result.subscribe((res: HttpResponse<RoundMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RoundMySuffix) {
        this.eventManager.broadcast({ name: 'roundListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSeasonById(index: number, item: SeasonMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-round-my-suffix-popup',
    template: ''
})
export class RoundMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roundPopupService: RoundMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.roundPopupService
                    .open(RoundMySuffixDialogComponent as Component, params['id']);
            } else {
                this.roundPopupService
                    .open(RoundMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
