
import { Component, ViewChild,Input, Output, EventEmitter } from '@angular/core';
import { ProcessComponent } from '../../components/process';
import { Chart } from 'chart.js';


/**
 * Generated class for the BarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'bar',
  templateUrl: 'bar.html'
})
export class BarComponent implements ProcessComponent{

  @Input('params') params: any ;
  @Output('notify') notify = new EventEmitter();
  constructor() {
  }

  onClick() {
    this.notify.emit(this);

  }

}
