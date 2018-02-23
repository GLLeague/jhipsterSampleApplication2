import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TeamMySuffix } from './team-my-suffix.model';
import { TeamMySuffixPopupService } from './team-my-suffix-popup.service';
import { TeamMySuffixService } from './team-my-suffix.service';

@Component({
    selector: 'jhi-team-my-suffix-delete-dialog',
    templateUrl: './team-my-suffix-delete-dialog.component.html'
})
export class TeamMySuffixDeleteDialogComponent {

    team: TeamMySuffix;

    constructor(
        private teamService: TeamMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.teamService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'teamListModification',
                content: 'Deleted an team'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-team-my-suffix-delete-popup',
    template: ''
})
export class TeamMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private teamPopupService: TeamMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.teamPopupService
                .open(TeamMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
