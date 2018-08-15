import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { Case } from '../../../models/case';
import { CommentsPage } from '../../pages';
import { ProcessPage } from '../../pages';
import { AttachmentsPage } from '../../pages';
import { AssignPage } from '../../pages';

@IonicPage()
@Component({
  selector: 'page-case-detail',
  templateUrl: 'case-detail.html'
})
export class CaseDetailPage {
  //currentItems: Case[];
  item : Case;
  constructor(public navParams: NavParams,public navCtrl: NavController, public modalCtrl: ModalController) {
    

    this.item =navParams.get('case');
    // this.item =  {
    //     "region_site": "VIC Metro - 65 Elizabeth Street",
    //     "location_unit": "Kitchen Freezer",
    //     "case_desc": "(-13.8°C)Temperature too High",
    //     "date_created": "2015-12-25",
    //     "status": "Created",
    //     "resolution": "Unresolved",
    //     "asignee": "John Gamble",
    //     "comments": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    //     "attachments":"File.doc",
    //     "images":"0012.jpg, 0022.jpg, 0014.jpg"
    //   };
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

 
  editCase() {

  }

  clickComment(item) {
     this.navCtrl.push(CommentsPage, {
      data: item
    });
  }

  clickProcess() {
    this.navCtrl.push(ProcessPage)
  }

  clickAttachment(item) {
    this.navCtrl.push(AttachmentsPage, {
      data: item
    });

  }

  clickUsers() {
    this.navCtrl.push(AssignPage);
  }

}




