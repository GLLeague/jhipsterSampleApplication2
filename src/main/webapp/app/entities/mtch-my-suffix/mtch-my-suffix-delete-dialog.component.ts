import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MtchMySuffix } from './mtch-my-suffix.model';
import { MtchMySuffixPopupService } from './mtch-my-suffix-popup.service';
import { MtchMySuffixService } from './mtch-my-suffix.service';

@Component({
    selector: 'jhi-mtch-my-suffix-delete-dialog',
    templateUrl: './mtch-my-suffix-delete-dialog.component.html'
})
export class MtchMySuffixDeleteDialogComponent {

    mtch: MtchMySuffix;

    constructor(
        private mtchService: MtchMySuffixService,
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
    selector: 'jhi-mtch-my-suffix-delete-popup',
    template: ''
})
export class MtchMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mtchPopupService: MtchMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mtchPopupService
                .open(MtchMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
