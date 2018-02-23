import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoundMySuffix } from './round-my-suffix.model';
import { RoundMySuffixPopupService } from './round-my-suffix-popup.service';
import { RoundMySuffixService } from './round-my-suffix.service';

@Component({
    selector: 'jhi-round-my-suffix-delete-dialog',
    templateUrl: './round-my-suffix-delete-dialog.component.html'
})
export class RoundMySuffixDeleteDialogComponent {

    round: RoundMySuffix;

    constructor(
        private roundService: RoundMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.roundService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'roundListModification',
                content: 'Deleted an round'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-round-my-suffix-delete-popup',
    template: ''
})
export class RoundMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private roundPopupService: RoundMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.roundPopupService
                .open(RoundMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
