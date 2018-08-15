import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
//import { CaseFilterModal } from './case-filter-modal';
//import { Settings } from '../../../models/settings';
import { CaseFilterModal } from '../../pages';

@IonicPage()
@Component({
  selector: 'page-case-filter',
  templateUrl: 'case-filter.html',
})
export class CaseFilterPage {
  
  filter : any;
  change : any;


  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams) { 

    

    console.log('change is', this.change);

    if(this.change == '') {

      let initFilter = {
        "region" : "Melbourne",
        "site" : "121 Elizabeth st. Melbourne",
        "keyword" : "Kitchen",
        "assignee" : "John Gamble",
        "status" : "Too High",
        "resolution" : "",
        "priority" : ""
      };
      this.filter = initFilter;
      this.applyBtn = false;

    } else {
    
      let initFilter = {
        "region" : "",
        "site" : "",
        "keyword" : "",
        "assignee" : "John Gamble",
        "status" : "Too High",
        "resolution" : "",
        "priority" : ""
      };
      this.filter = initFilter;

    }  

      console.log(navParams.get('data'));

  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  openModal(id : any) {
    let caseModal = this.modalCtrl.create(CaseFilterModal, { data: id });
    caseModal.onDidDismiss(change => {
      this.change = change;
    });
    caseModal.present();
  }
}

