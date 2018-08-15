import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { Settings } from '../../../models/settings';
import { CasePage } from '../../pages';

@IonicPage()
@Component({
  selector: 'page-case-sort',
  templateUrl: 'case-sort.html'
})
export class CaseSortPage {
  currSortBy : any;
  currSortOrder : any;

  sortBy = {
    "date_created": "Date Created",
    "case_desc" : "Case Description",
    "assignee" : "Assignee",
    "status" : "Status",
    "resolution" : "Resolution",
    "region" : "Region",
    "site" : "Site",
    "priority" : "Priority"
  }
  constructor(public navParams: NavParams,public navCtrl: NavController, public modalCtrl: ModalController) {
    this.currSortBy = navParams.get('sortBy');
  }

  saveSort() {
     this.navCtrl.push(CasePage);
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {

  }





}


