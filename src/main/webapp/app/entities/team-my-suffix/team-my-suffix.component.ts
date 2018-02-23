import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TeamMySuffix } from './team-my-suffix.model';
import { TeamMySuffixService } from './team-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-team-my-suffix',
    templateUrl: './team-my-suffix.component.html'
})
export class TeamMySuffixComponent implements OnInit, OnDestroy {
teams: TeamMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private teamService: TeamMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.teamService.query().subscribe(
            (res: HttpResponse<TeamMySuffix[]>) => {
                this.teams = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTeams();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TeamMySuffix) {
        return item.id;
    }
    registerChangeInTeams() {
        this.eventSubscriber = this.eventManager.subscribe('teamListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
