import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplication2PlayerModule } from './player/player.module';
import { JhipsterSampleApplication2TeamModule } from './team/team.module';
import { JhipsterSampleApplication2MtchModule } from './mtch/mtch.module';
import { JhipsterSampleApplication2MtchEventModule } from './mtch-event/mtch-event.module';
import { JhipsterSampleApplication2RoundModule } from './round/round.module';
import { JhipsterSampleApplication2SeasonModule } from './season/season.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterSampleApplication2PlayerModule,
        JhipsterSampleApplication2TeamModule,
        JhipsterSampleApplication2MtchModule,
        JhipsterSampleApplication2MtchEventModule,
        JhipsterSampleApplication2RoundModule,
        JhipsterSampleApplication2SeasonModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplication2EntityModule {}
