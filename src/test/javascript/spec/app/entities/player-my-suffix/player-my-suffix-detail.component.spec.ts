/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { PlayerMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/player-my-suffix/player-my-suffix-detail.component';
import { PlayerMySuffixService } from '../../../../../../main/webapp/app/entities/player-my-suffix/player-my-suffix.service';
import { PlayerMySuffix } from '../../../../../../main/webapp/app/entities/player-my-suffix/player-my-suffix.model';

describe('Component Tests', () => {

    describe('PlayerMySuffix Management Detail Component', () => {
        let comp: PlayerMySuffixDetailComponent;
        let fixture: ComponentFixture<PlayerMySuffixDetailComponent>;
        let service: PlayerMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [PlayerMySuffixDetailComponent],
                providers: [
                    PlayerMySuffixService
                ]
            })
            .overrideTemplate(PlayerMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlayerMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlayerMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PlayerMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.player).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
