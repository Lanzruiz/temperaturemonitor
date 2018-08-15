import { Component, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

import { ColorGuageModule } from 'ng2-gauge-with-color-band';

import * as HighCharts from 'highcharts';
import HighchartsMore from 'highcharts-more';
HighchartsMore(HighCharts);

import { ProcessComponent } from '../../components/process';

import { WidgetsProvider } from '../../providers/providers';
import { AddWidgetPage } from '../pages';

/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {

  doughnutChart: any;
  loadProgress:any;
  healthStatus:any;
  alarms:any;

  widget : any; 
  widgetList : any;
  currentSelectedWidget: any;

  @ViewChild('processContainer', {read: ViewContainerRef }) container;
  constructor(public navCtrl: NavController, public navParams: NavParams, private resolver: ComponentFactoryResolver, public widgetsProvider: WidgetsProvider) {
    this.widget = navParams.get('widget');
    console.log(this.widget);
  }

  ionViewDidLoad() {
    this.reloadWidgets();
  }

  ionViewWillEnter() {
    
  }

  reloadWidgets(){
    this.widgetsProvider.getWidgets().subscribe(
        (res: any) => {
          console.log(res);
          this.widgetList = res;
          for(let widget of this.widgetList) {
            const factory = this.resolver.resolveComponentFactory(this.widgetsProvider.resolveComponent(widget.type));
            let componentRef = this.container.createComponent(factory);
            (<ProcessComponent>componentRef.instance).params = widget;

            (<ProcessComponent>componentRef.instance).notify.subscribe(instance => this.widgetClicked(instance));
          }
        },
        error => {
          console.log(error);
        });
  }


  addClicked() {
    this.navCtrl.push(AddWidgetPage);
  }


  addWidget() {
    this.navCtrl.push(AddWidgetPage);
  }


  removeClicked() {
    
    this.widgetsProvider.removeWidget(this.currentSelectedWidget.params.id);
    this.container.clear();
    this.reloadWidgets();
    document.getElementById('settings').style.display = "none";
  }
  
  widgetClicked(instance) {

    console.log(instance);
      var display = document.getElementById('settings').style.display;

    if(instance === this.currentSelectedWidget) {
       document.getElementById('settings').style.display = (display=="flex") ? "none" : "flex";
  
    
    } else {
         document.getElementById('settings').style.display = "flex";
    }
    
    console.log(document.getElementById('settings').style.display); 
    this.currentSelectedWidget = instance;
  }



}
