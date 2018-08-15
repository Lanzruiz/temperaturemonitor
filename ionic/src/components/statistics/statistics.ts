import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProcessComponent } from '../process';


/**
 * Generated class for the StatisticsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'statistics',
  templateUrl: 'statistics.html'
})
export class StatisticsComponent implements ProcessComponent{

  @Input('params') params: any ;
  @Output('notify') notify = new EventEmitter();

  constructor() {
  }

  onClick() {
    this.notify.emit(this);

  }

}
