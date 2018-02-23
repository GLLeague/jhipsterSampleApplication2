import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplication2PlayerMySuffixModule } from './player-my-suffix/player-my-suffix.module';
import { JhipsterSampleApplication2TeamMySuffixModule } from './team-my-suffix/team-my-suffix.module';
import { JhipsterSampleApplication2MtchMySuffixModule } from './mtch-my-suffix/mtch-my-suffix.module';
import { JhipsterSampleApplication2MatchEventMySuffixModule } from './match-event-my-suffix/match-event-my-suffix.module';
import { JhipsterSampleApplication2RoundMySuffixModule } from './round-my-suffix/round-my-suffix.module';
import { JhipsterSampleApplication2SeasonMySuffixModule } from './season-my-suffix/season-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterSampleApplication2PlayerMySuffixModule,
        JhipsterSampleApplication2TeamMySuffixModule,
        JhipsterSampleApplication2MtchMySuffixModule,
        JhipsterSampleApplication2MatchEventMySuffixModule,
        JhipsterSampleApplication2RoundMySuffixModule,
        JhipsterSampleApplication2SeasonMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplication2EntityModule {}
