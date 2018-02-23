import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SeasonMySuffix } from './season-my-suffix.model';
import { SeasonMySuffixPopupService } from './season-my-suffix-popup.service';
import { SeasonMySuffixService } from './season-my-suffix.service';

@Component({
    selector: 'jhi-season-my-suffix-delete-dialog',
    templateUrl: './season-my-suffix-delete-dialog.component.html'
})
export class SeasonMySuffixDeleteDialogComponent {

    season: SeasonMySuffix;

    constructor(
        private seasonService: SeasonMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.seasonService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'seasonListModification',
                content: 'Deleted an season'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-season-my-suffix-delete-popup',
    template: ''
})
export class SeasonMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private seasonPopupService: SeasonMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.seasonPopupService
                .open(SeasonMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
