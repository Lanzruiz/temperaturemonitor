import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProcessComponent } from '../process';

import { ColorGuageModule } from 'ng2-gauge-with-color-band';
// import { Timer } from 'flat-gauge-js';

import * as HighCharts from 'highcharts';
import HighchartsMore from 'highcharts-more';
HighchartsMore(HighCharts);

declare var opts;
declare var target;
declare var gauge; 

@Component({
  selector: 'guage',
  templateUrl: 'guage.html'
})
export class GuageComponent implements ProcessComponent{

  // timer: Timer;

  @Input('params') params:any;
  @Output('notify') notify = new EventEmitter();

  constructor() {

  }

  onClick() {
    this.notify.emit(this);

  }

  


}
