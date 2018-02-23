/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { SeasonDetailComponent } from '../../../../../../main/webapp/app/entities/season/season-detail.component';
import { SeasonService } from '../../../../../../main/webapp/app/entities/season/season.service';
import { Season } from '../../../../../../main/webapp/app/entities/season/season.model';

describe('Component Tests', () => {

    describe('Season Management Detail Component', () => {
        let comp: SeasonDetailComponent;
        let fixture: ComponentFixture<SeasonDetailComponent>;
        let service: SeasonService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [SeasonDetailComponent],
                providers: [
                    SeasonService
                ]
            })
            .overrideTemplate(SeasonDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SeasonDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SeasonService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Season(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.season).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
