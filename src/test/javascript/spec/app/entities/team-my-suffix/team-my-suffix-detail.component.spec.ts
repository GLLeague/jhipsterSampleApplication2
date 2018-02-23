/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { TeamMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/team-my-suffix/team-my-suffix-detail.component';
import { TeamMySuffixService } from '../../../../../../main/webapp/app/entities/team-my-suffix/team-my-suffix.service';
import { TeamMySuffix } from '../../../../../../main/webapp/app/entities/team-my-suffix/team-my-suffix.model';

describe('Component Tests', () => {

    describe('TeamMySuffix Management Detail Component', () => {
        let comp: TeamMySuffixDetailComponent;
        let fixture: ComponentFixture<TeamMySuffixDetailComponent>;
        let service: TeamMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [TeamMySuffixDetailComponent],
                providers: [
                    TeamMySuffixService
                ]
            })
            .overrideTemplate(TeamMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeamMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeamMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TeamMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.team).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
