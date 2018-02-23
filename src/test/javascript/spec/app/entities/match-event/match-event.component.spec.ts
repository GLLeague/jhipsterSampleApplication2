/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { MatchEventComponent } from '../../../../../../main/webapp/app/entities/match-event/match-event.component';
import { MatchEventService } from '../../../../../../main/webapp/app/entities/match-event/match-event.service';
import { MatchEvent } from '../../../../../../main/webapp/app/entities/match-event/match-event.model';

describe('Component Tests', () => {

    describe('MatchEvent Management Component', () => {
        let comp: MatchEventComponent;
        let fixture: ComponentFixture<MatchEventComponent>;
        let service: MatchEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [MatchEventComponent],
                providers: [
                    MatchEventService
                ]
            })
            .overrideTemplate(MatchEventComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MatchEventComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MatchEventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MatchEvent(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.matchEvents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
