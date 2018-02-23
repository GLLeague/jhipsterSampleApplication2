/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { MtchMySuffixComponent } from '../../../../../../main/webapp/app/entities/mtch-my-suffix/mtch-my-suffix.component';
import { MtchMySuffixService } from '../../../../../../main/webapp/app/entities/mtch-my-suffix/mtch-my-suffix.service';
import { MtchMySuffix } from '../../../../../../main/webapp/app/entities/mtch-my-suffix/mtch-my-suffix.model';

describe('Component Tests', () => {

    describe('MtchMySuffix Management Component', () => {
        let comp: MtchMySuffixComponent;
        let fixture: ComponentFixture<MtchMySuffixComponent>;
        let service: MtchMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [MtchMySuffixComponent],
                providers: [
                    MtchMySuffixService
                ]
            })
            .overrideTemplate(MtchMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MtchMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MtchMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MtchMySuffix(123)],
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
