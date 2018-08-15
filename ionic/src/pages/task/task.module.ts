import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskPage } from './task';
import { ProgressbarComponent } from '../../components/progressbar/progressbar';
import { HealthComponent } from '../../components/health/health';
import { DoughnutComponent } from '../../components/doughnut/doughnut';
import { GuageComponent } from '../../components/guage/guage';
import { LiveMonitoringComponent } from '../../components/live-monitoring/live-monitoring';
import { UnitCurrentComponent } from '../../components/unit-current/unit-current';
import { MapComponent } from '../../components/map/map';
import { BarComponent } from '../../components/bar/bar';
import { StatisticsComponent } from '../../components/statistics/statistics';
import { WidgetsProvider } from '../../providers/widgets/widgets'
@NgModule({
  declarations: [
    TaskPage,
    ProgressbarComponent,
    HealthComponent,
    LiveMonitoringComponent,
    DoughnutComponent,
    UnitCurrentComponent,
    MapComponent,
    GuageComponent,
    BarComponent,
    StatisticsComponent
  ],
  imports: [
    IonicPageModule.forChild(TaskPage),
  ],
  entryComponents: [
    ProgressbarComponent,
    HealthComponent,
    LiveMonitoringComponent,
    DoughnutComponent,
    UnitCurrentComponent,
    MapComponent,
    GuageComponent,
    BarComponent,
    StatisticsComponent
  ],
  providers: [
    WidgetsProvider // <-- List providers here
  ]
})
export class TaskPageModule {}
