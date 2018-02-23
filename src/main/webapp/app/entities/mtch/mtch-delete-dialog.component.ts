import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Mtch } from './mtch.model';
import { MtchPopupService } from './mtch-popup.service';
import { MtchService } from './mtch.service';

@Component({
    selector: 'jhi-mtch-delete-dialog',
    templateUrl: './mtch-delete-dialog.component.html'
})
export class MtchDeleteDialogComponent {

    mtch: Mtch;

    constructor(
        private mtchService: MtchService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mtchService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mtchListModification',
                content: 'Deleted an mtch'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mtch-delete-popup',
    template: ''
})
export class MtchDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mtchPopupService: MtchPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mtchPopupService
                .open(MtchDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
