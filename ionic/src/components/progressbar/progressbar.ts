import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProcessComponent } from '../process';

/**
 * Generated class for the ProgressbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'progressbar',
  templateUrl: 'progressbar.html'
})
export class ProgressbarComponent implements ProcessComponent{

  @Input('params') params: any ;
  @Output('notify') notify = new EventEmitter();

  constructor() {
  }

  onClick() {
    this.notify.emit(this);

  }

}
