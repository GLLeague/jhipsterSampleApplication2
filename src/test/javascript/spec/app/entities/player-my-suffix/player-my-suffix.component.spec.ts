/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplication2TestModule } from '../../../test.module';
import { PlayerMySuffixComponent } from '../../../../../../main/webapp/app/entities/player-my-suffix/player-my-suffix.component';
import { PlayerMySuffixService } from '../../../../../../main/webapp/app/entities/player-my-suffix/player-my-suffix.service';
import { PlayerMySuffix } from '../../../../../../main/webapp/app/entities/player-my-suffix/player-my-suffix.model';

describe('Component Tests', () => {

    describe('PlayerMySuffix Management Component', () => {
        let comp: PlayerMySuffixComponent;
        let fixture: ComponentFixture<PlayerMySuffixComponent>;
        let service: PlayerMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplication2TestModule],
                declarations: [PlayerMySuffixComponent],
                providers: [
                    PlayerMySuffixService
                ]
            })
            .overrideTemplate(PlayerMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlayerMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlayerMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PlayerMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.players[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
