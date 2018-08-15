import { Component } from '@angular/core';

/**
 * Generated class for the AccordionListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'accordion-list',
  templateUrl: 'accordion-list.html'
})
export class AccordionListComponent {

  text: string;

  constructor() {
    console.log('Hello AccordionListComponent Component');
    this.text = 'Hello World';
  }

}
