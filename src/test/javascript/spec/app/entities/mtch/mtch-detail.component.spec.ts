/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { MtchDetailComponent } from '../../../../../../main/webapp/app/entities/mtch/mtch-detail.component';
import { MtchService } from '../../../../../../main/webapp/app/entities/mtch/mtch.service';
import { Mtch } from '../../../../../../main/webapp/app/entities/mtch/mtch.model';

describe('Component Tests', () => {

    describe('Mtch Management Detail Component', () => {
        let comp: MtchDetailComponent;
        let fixture: ComponentFixture<MtchDetailComponent>;
        let service: MtchService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [MtchDetailComponent],
                providers: [
                    MtchService
                ]
            })
            .overrideTemplate(MtchDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MtchDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MtchService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Mtch(123)
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
