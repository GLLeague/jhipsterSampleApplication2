import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PlayerMySuffix } from './player-my-suffix.model';
import { PlayerMySuffixPopupService } from './player-my-suffix-popup.service';
import { PlayerMySuffixService } from './player-my-suffix.service';

@Component({
    selector: 'jhi-player-my-suffix-delete-dialog',
    templateUrl: './player-my-suffix-delete-dialog.component.html'
})
export class PlayerMySuffixDeleteDialogComponent {

    player: PlayerMySuffix;

    constructor(
        private playerService: PlayerMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.playerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'playerListModification',
                content: 'Deleted an player'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-player-my-suffix-delete-popup',
    template: ''
})
export class PlayerMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private playerPopupService: PlayerMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.playerPopupService
                .open(PlayerMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
