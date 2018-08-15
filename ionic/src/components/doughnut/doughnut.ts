import { Component, ViewChild,Input, Output, EventEmitter } from '@angular/core';
import { ProcessComponent } from '../../components/process';
import { Chart } from 'chart.js';
/**
 * Generated class for the DoughnutComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'doughnut',
  templateUrl: 'doughnut.html'
})
export class DoughnutComponent implements ProcessComponent {


  @ViewChild('doughnutCanvas') doughnutCanvas;
  @Input('params') params:any;
  @Output('notify') notify = new EventEmitter();

  doughnutChart: any;
  colors : any;


  constructor() {
  }

  ngOnInit() {
    let c = this.params.color;
    this.colors = (this.params.data.length == 2) ? [c,'#eeeef0'] : [c,this.shadeColor(c,-15),'#eeeef0']
  	this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
         datasets: [{
          data: this.params.data,
          backgroundColor: this.colors
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        title: {
          display: false,
          fontStyle: 'bold',
          fontSize: 18
        }
      },
 
    });
  }

  shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt((R * (100 + percent) / 100).toString());
    G = parseInt((G * (100 + percent) / 100).toString());
    B = parseInt((B * (100 + percent) / 100).toString());

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
  }

  onClick() {
    this.notify.emit(this);

  }

}
