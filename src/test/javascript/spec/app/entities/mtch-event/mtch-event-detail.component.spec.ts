/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { MtchEventDetailComponent } from '../../../../../../main/webapp/app/entities/mtch-event/mtch-event-detail.component';
import { MtchEventService } from '../../../../../../main/webapp/app/entities/mtch-event/mtch-event.service';
import { MtchEvent } from '../../../../../../main/webapp/app/entities/mtch-event/mtch-event.model';

describe('Component Tests', () => {

    describe('MtchEvent Management Detail Component', () => {
        let comp: MtchEventDetailComponent;
        let fixture: ComponentFixture<MtchEventDetailComponent>;
        let service: MtchEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [MtchEventDetailComponent],
                providers: [
                    MtchEventService
                ]
            })
            .overrideTemplate(MtchEventDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MtchEventDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MtchEventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MtchEvent(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.mtchEvent).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
