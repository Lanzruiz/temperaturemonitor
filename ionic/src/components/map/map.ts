import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProcessComponent } from '../process';


/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements ProcessComponent{

  @Input('params') params: any ;
  @Output('notify') notify = new EventEmitter();

  constructor() {
  }

  onClick() {
    this.notify.emit(this);

  }

}
