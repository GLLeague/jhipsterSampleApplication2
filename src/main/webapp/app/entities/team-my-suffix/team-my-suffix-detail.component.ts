import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TeamMySuffix } from './team-my-suffix.model';
import { TeamMySuffixService } from './team-my-suffix.service';

@Component({
    selector: 'jhi-team-my-suffix-detail',
    templateUrl: './team-my-suffix-detail.component.html'
})
export class TeamMySuffixDetailComponent implements OnInit, OnDestroy {

    team: TeamMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private teamService: TeamMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTeams();
    }

    load(id) {
        this.teamService.find(id)
            .subscribe((teamResponse: HttpResponse<TeamMySuffix>) => {
                this.team = teamResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTeams() {
        this.eventSubscriber = this.eventManager.subscribe(
            'teamListModification',
            (response) => this.load(this.team.id)
        );
    }
}
