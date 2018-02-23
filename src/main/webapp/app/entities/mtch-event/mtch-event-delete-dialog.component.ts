import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MtchEvent } from './mtch-event.model';
import { MtchEventPopupService } from './mtch-event-popup.service';
import { MtchEventService } from './mtch-event.service';

@Component({
    selector: 'jhi-mtch-event-delete-dialog',
    templateUrl: './mtch-event-delete-dialog.component.html'
})
export class MtchEventDeleteDialogComponent {

    mtchEvent: MtchEvent;

    constructor(
        private mtchEventService: MtchEventService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mtchEventService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mtchEventListModification',
                content: 'Deleted an mtchEvent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mtch-event-delete-popup',
    template: ''
})
export class MtchEventDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mtchEventPopupService: MtchEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mtchEventPopupService
                .open(MtchEventDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
