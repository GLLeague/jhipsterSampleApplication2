/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { MatchEventMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/match-event-my-suffix/match-event-my-suffix-dialog.component';
import { MatchEventMySuffixService } from '../../../../../../main/webapp/app/entities/match-event-my-suffix/match-event-my-suffix.service';
import { MatchEventMySuffix } from '../../../../../../main/webapp/app/entities/match-event-my-suffix/match-event-my-suffix.model';
import { MtchMySuffixService } from '../../../../../../main/webapp/app/entities/mtch-my-suffix';
import { PlayerMySuffixService } from '../../../../../../main/webapp/app/entities/player-my-suffix';

describe('Component Tests', () => {

    describe('MatchEventMySuffix Management Dialog Component', () => {
        let comp: MatchEventMySuffixDialogComponent;
        let fixture: ComponentFixture<MatchEventMySuffixDialogComponent>;
        let service: MatchEventMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [MatchEventMySuffixDialogComponent],
                providers: [
                    MtchMySuffixService,
                    PlayerMySuffixService,
                    MatchEventMySuffixService
                ]
            })
            .overrideTemplate(MatchEventMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MatchEventMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MatchEventMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MatchEventMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.matchEvent = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'matchEventListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MatchEventMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.matchEvent = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'matchEventListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
