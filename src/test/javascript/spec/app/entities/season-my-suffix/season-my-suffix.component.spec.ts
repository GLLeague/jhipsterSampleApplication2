/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { SeasonMySuffixComponent } from '../../../../../../main/webapp/app/entities/season-my-suffix/season-my-suffix.component';
import { SeasonMySuffixService } from '../../../../../../main/webapp/app/entities/season-my-suffix/season-my-suffix.service';
import { SeasonMySuffix } from '../../../../../../main/webapp/app/entities/season-my-suffix/season-my-suffix.model';

describe('Component Tests', () => {

    describe('SeasonMySuffix Management Component', () => {
        let comp: SeasonMySuffixComponent;
        let fixture: ComponentFixture<SeasonMySuffixComponent>;
        let service: SeasonMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [SeasonMySuffixComponent],
                providers: [
                    SeasonMySuffixService
                ]
            })
            .overrideTemplate(SeasonMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SeasonMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SeasonMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SeasonMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.seasons[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
