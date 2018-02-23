/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { TeamMySuffixComponent } from '../../../../../../main/webapp/app/entities/team-my-suffix/team-my-suffix.component';
import { TeamMySuffixService } from '../../../../../../main/webapp/app/entities/team-my-suffix/team-my-suffix.service';
import { TeamMySuffix } from '../../../../../../main/webapp/app/entities/team-my-suffix/team-my-suffix.model';

describe('Component Tests', () => {

    describe('TeamMySuffix Management Component', () => {
        let comp: TeamMySuffixComponent;
        let fixture: ComponentFixture<TeamMySuffixComponent>;
        let service: TeamMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [TeamMySuffixComponent],
                providers: [
                    TeamMySuffixService
                ]
            })
            .overrideTemplate(TeamMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeamMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeamMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TeamMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.teams[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
