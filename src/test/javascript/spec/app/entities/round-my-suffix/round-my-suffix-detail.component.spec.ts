/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { RoundMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/round-my-suffix/round-my-suffix-detail.component';
import { RoundMySuffixService } from '../../../../../../main/webapp/app/entities/round-my-suffix/round-my-suffix.service';
import { RoundMySuffix } from '../../../../../../main/webapp/app/entities/round-my-suffix/round-my-suffix.model';

describe('Component Tests', () => {

    describe('RoundMySuffix Management Detail Component', () => {
        let comp: RoundMySuffixDetailComponent;
        let fixture: ComponentFixture<RoundMySuffixDetailComponent>;
        let service: RoundMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [RoundMySuffixDetailComponent],
                providers: [
                    RoundMySuffixService
                ]
            })
            .overrideTemplate(RoundMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoundMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoundMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RoundMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.round).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
