/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { MtchMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/mtch-my-suffix/mtch-my-suffix-detail.component';
import { MtchMySuffixService } from '../../../../../../main/webapp/app/entities/mtch-my-suffix/mtch-my-suffix.service';
import { MtchMySuffix } from '../../../../../../main/webapp/app/entities/mtch-my-suffix/mtch-my-suffix.model';

describe('Component Tests', () => {

    describe('MtchMySuffix Management Detail Component', () => {
        let comp: MtchMySuffixDetailComponent;
        let fixture: ComponentFixture<MtchMySuffixDetailComponent>;
        let service: MtchMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [MtchMySuffixDetailComponent],
                providers: [
                    MtchMySuffixService
                ]
            })
            .overrideTemplate(MtchMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MtchMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MtchMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MtchMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.mtch).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
