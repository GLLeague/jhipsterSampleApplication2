/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { MtchComponent } from '../../../../../../main/webapp/app/entities/mtch/mtch.component';
import { MtchService } from '../../../../../../main/webapp/app/entities/mtch/mtch.service';
import { Mtch } from '../../../../../../main/webapp/app/entities/mtch/mtch.model';

describe('Component Tests', () => {

    describe('Mtch Management Component', () => {
        let comp: MtchComponent;
        let fixture: ComponentFixture<MtchComponent>;
        let service: MtchService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [MtchComponent],
                providers: [
                    MtchService
                ]
            })
            .overrideTemplate(MtchComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MtchComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MtchService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Mtch(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.mtches[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
