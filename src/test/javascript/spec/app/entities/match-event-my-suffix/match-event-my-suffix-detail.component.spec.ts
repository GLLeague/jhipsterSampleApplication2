/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { MatchEventMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/match-event-my-suffix/match-event-my-suffix-detail.component';
import { MatchEventMySuffixService } from '../../../../../../main/webapp/app/entities/match-event-my-suffix/match-event-my-suffix.service';
import { MatchEventMySuffix } from '../../../../../../main/webapp/app/entities/match-event-my-suffix/match-event-my-suffix.model';

describe('Component Tests', () => {

    describe('MatchEventMySuffix Management Detail Component', () => {
        let comp: MatchEventMySuffixDetailComponent;
        let fixture: ComponentFixture<MatchEventMySuffixDetailComponent>;
        let service: MatchEventMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [MatchEventMySuffixDetailComponent],
                providers: [
                    MatchEventMySuffixService
                ]
            })
            .overrideTemplate(MatchEventMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MatchEventMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MatchEventMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MatchEventMySuffix(123)
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
