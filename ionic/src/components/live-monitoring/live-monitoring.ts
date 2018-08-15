import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProcessComponent } from '../process';
/**
/**
 * Generated class for the LiveMonitoringComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'live-monitoring',
  templateUrl: 'live-monitoring.html'
})
export class LiveMonitoringComponent implements ProcessComponent{

  
  @Input('params') params: any ;
  @Output('notify') notify = new EventEmitter();

  constructor() {
    console.log('Hello LiveMonitoringComponent Component');
  }

  onClick() {
    this.notify.emit(this);

  }

}
