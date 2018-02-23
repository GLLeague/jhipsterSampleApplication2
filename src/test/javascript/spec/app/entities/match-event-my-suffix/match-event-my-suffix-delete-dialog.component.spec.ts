/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { MatchEventMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/match-event-my-suffix/match-event-my-suffix-delete-dialog.component';
import { MatchEventMySuffixService } from '../../../../../../main/webapp/app/entities/match-event-my-suffix/match-event-my-suffix.service';

describe('Component Tests', () => {

    describe('MatchEventMySuffix Management Delete Component', () => {
        let comp: MatchEventMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<MatchEventMySuffixDeleteDialogComponent>;
        let service: MatchEventMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [MatchEventMySuffixDeleteDialogComponent],
                providers: [
                    MatchEventMySuffixService
                ]
            })
            .overrideTemplate(MatchEventMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MatchEventMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MatchEventMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
