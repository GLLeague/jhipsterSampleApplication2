/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { RoundComponent } from '../../../../../../main/webapp/app/entities/round/round.component';
import { RoundService } from '../../../../../../main/webapp/app/entities/round/round.service';
import { Round } from '../../../../../../main/webapp/app/entities/round/round.model';

describe('Component Tests', () => {

    describe('Round Management Component', () => {
        let comp: RoundComponent;
        let fixture: ComponentFixture<RoundComponent>;
        let service: RoundService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [RoundComponent],
                providers: [
                    RoundService
                ]
            })
            .overrideTemplate(RoundComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoundComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoundService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Round(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rounds[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
