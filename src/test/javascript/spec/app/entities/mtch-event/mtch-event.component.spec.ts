/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { MtchEventComponent } from '../../../../../../main/webapp/app/entities/mtch-event/mtch-event.component';
import { MtchEventService } from '../../../../../../main/webapp/app/entities/mtch-event/mtch-event.service';
import { MtchEvent } from '../../../../../../main/webapp/app/entities/mtch-event/mtch-event.model';

describe('Component Tests', () => {

    describe('MtchEvent Management Component', () => {
        let comp: MtchEventComponent;
        let fixture: ComponentFixture<MtchEventComponent>;
        let service: MtchEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [MtchEventComponent],
                providers: [
                    MtchEventService
                ]
            })
            .overrideTemplate(MtchEventComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MtchEventComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MtchEventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MtchEvent(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.mtchEvents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
