import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MtchMySuffix } from './mtch-my-suffix.model';
import { MtchMySuffixService } from './mtch-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-mtch-my-suffix',
    templateUrl: './mtch-my-suffix.component.html'
})
export class MtchMySuffixComponent implements OnInit, OnDestroy {
mtches: MtchMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mtchService: MtchMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.mtchService.query().subscribe(
            (res: HttpResponse<MtchMySuffix[]>) => {
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

    trackId(index: number, item: MtchMySuffix) {
        return item.id;
    }
    registerChangeInMtches() {
        this.eventSubscriber = this.eventManager.subscribe('mtchListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
