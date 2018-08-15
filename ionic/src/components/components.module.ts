import { NgModule } from '@angular/core';
import { AccordionListComponent } from './accordion-list/accordion-list';
import { ProgressbarComponent } from './progressbar/progressbar';
import { HealthComponent } from './health/health';
import { GuageComponent } from './guage/guage';
import { LiveMonitoringComponent } from './live-monitoring/live-monitoring';
import { UnitCurrentComponent } from './unit-current/unit-current';
import { DoughnutComponent } from './doughnut/doughnut';
import { MapComponent } from './map/map';
import { BarComponent } from './bar/bar';
import { StatisticsComponent } from './statistics/statistics';
@NgModule({
	declarations: [AccordionListComponent,
    ProgressbarComponent,
    HealthComponent,
    GuageComponent,
    LiveMonitoringComponent,
    UnitCurrentComponent,
    DoughnutComponent,
    MapComponent,
    BarComponent,
    StatisticsComponent],
	imports: [],
	exports: [AccordionListComponent,
    ProgressbarComponent,
    HealthComponent,
    GuageComponent,
    LiveMonitoringComponent,
    UnitCurrentComponent,
    DoughnutComponent,
    MapComponent,
    BarComponent,
    StatisticsComponent]
})
export class ComponentsModule {}
