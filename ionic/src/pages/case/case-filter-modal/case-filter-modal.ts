import { Component } from '@angular/core';
import { IonicPage, ViewController , NavParams , Platform, ModalController, NavController } from 'ionic-angular';
import { CasePage } from '../../pages';
import { CaseFilterPage } from '../../pages';

@IonicPage()
@Component({
  selector: 'case-filter-modal',
  templateUrl: 'case-filter-modal.html'
})
export class CaseFilterModal {
  currFilter : any;
  currName  : any;
  yourname  : any;
  caseModal : any;
  caseName  : any;
  caseItems : any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController
  ) {
    var filters = [
      {
        name: 'region',   
        items: [
          { label : "Melbourne" },
          { label : "Queensland" },
          { label : "Sydney" },
          { label : "Perth" },
          { label : "Adelaide" },
          { label : "Brisbane" },
          { label : "Canbera" }
        ]
      },
      {
        name: 'site',   
        items: [
          { label : "Sample site 1" },
          { label : "Sample site 2" },
          { label : "Sample site 3" },
          { label : "Sample site 4" }
        ]
      },
      {
        name: 'keyword',   
        items: [
          { label : "Kitchen" },
          { label : "Keyword 2" },
          { label : "Keyword 3" },
        ]
      },
      {
        name: 'assignee',   
        items: [
          { label : "John Gamble" },
          { label : "Maxine Catubigan" },
          { label : "Lanz Ruiz" },
          { label : "Ian Romero" }
        ]
      },
      {
        name: 'status',   
        items: [
          { label : "Investigating" },
          { label : "Unresolved" },
          { label : "Assign to Technician" },
        ]
      },
      {
        name: 'resolution',   
        items: [
          { label : "Resolution 1" },
          { label : "Resolution 2" },
          { label : "Resolution 3" },
        ]
      },
      {
        name: 'priority',   
        items: [
          { label : "Priority 1" },
          { label : "Priority 2" },
          { label : "Priority 3" },
        ]
      },

    ];
    this.caseModal = this.params.get('data');
    this.currFilter = filters[this.caseModal.id];
    console.log('id', this.caseModal.id);
    this.caseName = this.currFilter.name;
    console.log('case name', this.caseName);
    this.caseItems = this.currFilter.items;
    console.log('items', this.caseItems);


    this.yourname = 'lanz';
  }

  saveSort() {
     this.navCtrl.push(CasePage);
  }

  dismiss() {
   this.viewCtrl.dismiss({ change : 'yes' });
  
  }

}