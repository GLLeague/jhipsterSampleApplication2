/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { RoundMySuffixComponent } from '../../../../../../main/webapp/app/entities/round-my-suffix/round-my-suffix.component';
import { RoundMySuffixService } from '../../../../../../main/webapp/app/entities/round-my-suffix/round-my-suffix.service';
import { RoundMySuffix } from '../../../../../../main/webapp/app/entities/round-my-suffix/round-my-suffix.model';

describe('Component Tests', () => {

    describe('RoundMySuffix Management Component', () => {
        let comp: RoundMySuffixComponent;
        let fixture: ComponentFixture<RoundMySuffixComponent>;
        let service: RoundMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [RoundMySuffixComponent],
                providers: [
                    RoundMySuffixService
                ]
            })
            .overrideTemplate(RoundMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoundMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoundMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RoundMySuffix(123)],
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
