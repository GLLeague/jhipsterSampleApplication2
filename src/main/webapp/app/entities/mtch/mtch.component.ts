import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Mtch } from './mtch.model';
import { MtchService } from './mtch.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-mtch',
    templateUrl: './mtch.component.html'
})
export class MtchComponent implements OnInit, OnDestroy {
mtches: Mtch[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mtchService: MtchService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.mtchService.query().subscribe(
            (res: HttpResponse<Mtch[]>) => {
                this.mtches = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMtches();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Mtch) {
        return item.id;
    }
    registerChangeInMtches() {
        this.eventSubscriber = this.eventManager.subscribe('mtchListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
