/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { MatchEventMySuffixComponent } from '../../../../../../main/webapp/app/entities/match-event-my-suffix/match-event-my-suffix.component';
import { MatchEventMySuffixService } from '../../../../../../main/webapp/app/entities/match-event-my-suffix/match-event-my-suffix.service';
import { MatchEventMySuffix } from '../../../../../../main/webapp/app/entities/match-event-my-suffix/match-event-my-suffix.model';

describe('Component Tests', () => {

    describe('MatchEventMySuffix Management Component', () => {
        let comp: MatchEventMySuffixComponent;
        let fixture: ComponentFixture<MatchEventMySuffixComponent>;
        let service: MatchEventMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [MatchEventMySuffixComponent],
                providers: [
                    MatchEventMySuffixService
                ]
            })
            .overrideTemplate(MatchEventMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MatchEventMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MatchEventMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MatchEventMySuffix(123)],
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
