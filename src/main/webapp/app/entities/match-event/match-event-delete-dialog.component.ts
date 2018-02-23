import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MatchEvent } from './match-event.model';
import { MatchEventPopupService } from './match-event-popup.service';
import { MatchEventService } from './match-event.service';

@Component({
    selector: 'jhi-match-event-delete-dialog',
    templateUrl: './match-event-delete-dialog.component.html'
})
export class MatchEventDeleteDialogComponent {

    matchEvent: MatchEvent;

    constructor(
        private matchEventService: MatchEventService,
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
    selector: 'jhi-match-event-delete-popup',
    template: ''
})
export class MatchEventDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private matchEventPopupService: MatchEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.matchEventPopupService
                .open(MatchEventDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
