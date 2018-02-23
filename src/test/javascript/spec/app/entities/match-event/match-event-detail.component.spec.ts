/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { MatchEventDetailComponent } from '../../../../../../main/webapp/app/entities/match-event/match-event-detail.component';
import { MatchEventService } from '../../../../../../main/webapp/app/entities/match-event/match-event.service';
import { MatchEvent } from '../../../../../../main/webapp/app/entities/match-event/match-event.model';

describe('Component Tests', () => {

    describe('MatchEvent Management Detail Component', () => {
        let comp: MatchEventDetailComponent;
        let fixture: ComponentFixture<MatchEventDetailComponent>;
        let service: MatchEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [MatchEventDetailComponent],
                providers: [
                    MatchEventService
                ]
            })
            .overrideTemplate(MatchEventDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MatchEventDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MatchEventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MatchEvent(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.matchEvent).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
