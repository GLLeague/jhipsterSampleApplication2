/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { SeasonMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/season-my-suffix/season-my-suffix-detail.component';
import { SeasonMySuffixService } from '../../../../../../main/webapp/app/entities/season-my-suffix/season-my-suffix.service';
import { SeasonMySuffix } from '../../../../../../main/webapp/app/entities/season-my-suffix/season-my-suffix.model';

describe('Component Tests', () => {

    describe('SeasonMySuffix Management Detail Component', () => {
        let comp: SeasonMySuffixDetailComponent;
        let fixture: ComponentFixture<SeasonMySuffixDetailComponent>;
        let service: SeasonMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [SeasonMySuffixDetailComponent],
                providers: [
                    SeasonMySuffixService
                ]
            })
            .overrideTemplate(SeasonMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SeasonMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SeasonMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SeasonMySuffix(123)
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
