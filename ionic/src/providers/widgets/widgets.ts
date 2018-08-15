import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { AppConfig } from '../../config/app.config';

import { ProgressbarComponent } from '../../components/progressbar/progressbar';
import { HealthComponent } from '../../components/health/health';
import { GuageComponent } from '../../components/guage/guage';
import { LiveMonitoringComponent } from '../../components/live-monitoring/live-monitoring';
import { UnitCurrentComponent } from '../../components/unit-current/unit-current';
import { DoughnutComponent } from '../../components/doughnut/doughnut';
import { MapComponent } from '../../components/map/map';
import { StatisticsComponent } from '../../components/statistics/statistics';
import { BarComponent } from '../../components/bar/bar';

@Injectable()
export class WidgetsProvider {

  widgets:any[];	

  url = this.appConfig.monikaApiBaseUrl + "/dashboard";
  constructor(public http: HttpClient, public appConfig: AppConfig) {
    console.log('Hello WidgetsProvider Provider');
  }


  getWidgets() {
    return this.http.get(this.url+`/list`)
      .map((res:Response) => res);
  }

  getWidgetType() {
    return this.http.get(this.url+`/widgetType/list`)
      .map((res:Response) => res);
  }

  addWidget(widget) {
    var data = {
      "title": widget.title,
      "region": widget.region,
      "site": widget.size,
      "color": widget.color,
      "type": widget.type
    }
    return this.http.post(this.url,data)
      .map((res:Response) => res);
  }


  removeWidget(id) {
    console.log(id);
    return this.http.delete(this.url+`/`+id)
    .map((res:Response) => res);
  }


  editWdiget(id, data) {
    console.log('ID:', id);
    console.log(data);
    return this.http.patch(this.url+`/`+id,data)
      .map((res:Response) => res);
  }


  resolveComponent(type) {

    if(type == 'donut') {
      return DoughnutComponent;
    } else if ( type == 'progress') {
      return ProgressbarComponent;
    } else if ( type == 'health') {
      return HealthComponent;
    } else if ( type == 'icon2') {
      return UnitCurrentComponent; 
    } else if ( type == 'overview') {
      return LiveMonitoringComponent;
    } else if ( type == 'map' ) {
      return MapComponent;
    } else if ( type == 'gauge' ) {
      return GuageComponent;
    } else if ( type == 'statistics') {
      return StatisticsComponent;
    } else if ( type == 'bar' ) {
      return BarComponent;
    }

  }

}

