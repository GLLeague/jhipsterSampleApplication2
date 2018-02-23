import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MtchEvent } from './mtch-event.model';
import { MtchEventService } from './mtch-event.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-mtch-event',
    templateUrl: './mtch-event.component.html'
})
export class MtchEventComponent implements OnInit, OnDestroy {
mtchEvents: MtchEvent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mtchEventService: MtchEventService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.mtchEventService.query().subscribe(
            (res: HttpResponse<MtchEvent[]>) => {
                this.mtchEvents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMtchEvents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MtchEvent) {
        return item.id;
    }
    registerChangeInMtchEvents() {
        this.eventSubscriber = this.eventManager.subscribe('mtchEventListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
