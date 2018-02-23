import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MatchEventMySuffix } from './match-event-my-suffix.model';
import { MatchEventMySuffixPopupService } from './match-event-my-suffix-popup.service';
import { MatchEventMySuffixService } from './match-event-my-suffix.service';

@Component({
    selector: 'jhi-match-event-my-suffix-delete-dialog',
    templateUrl: './match-event-my-suffix-delete-dialog.component.html'
})
export class MatchEventMySuffixDeleteDialogComponent {

    matchEvent: MatchEventMySuffix;

    constructor(
        private matchEventService: MatchEventMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.matchEventService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'matchEventListModification',
                content: 'Deleted an matchEvent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-match-event-my-suffix-delete-popup',
    template: ''
})
export class MatchEventMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private matchEventPopupService: MatchEventMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.matchEventPopupService
                .open(MatchEventMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
