import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Case } from '../../models/case';
import { CasesProvider } from '../../providers/providers';
import { CaseDetailPage } from '../pages';
import { CaseFilterPage } from '../pages';
import { CaseSortPage } from '../pages';
import { OptionsPage } from '../pages'

@IonicPage()
@Component({
  selector: 'page-case',
  templateUrl: 'case.html'
})
export class CasePage {
  currentItems: Case[];
  sortBy:any;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public casesProvider: CasesProvider) {

    // let cases = [
    //   {
    //     "region_site": "VIC Metro - 60 Elizabeth Street",
    //     "location_unit": "Kitchen Freezer",
    //     "case_desc": "(-13.8°C)Temperature too High",
    //     "date_created": "2015-12-25",
    //    "status": "Created",
    //    "resolution": "Unresolved",
    //     "asignee": "John Gamble",
    //     "comments": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    //     "attachments":["File.doc", "0012.jpg", "0022.jpg", "0014.jpg"],
    //    "notify": "yes"
    //   },
    //   {
    //     "region_site": "VIC Metro - 61 Elizabeth Street",
    //     "location_unit": "Kitchen Freezer",
    //     "case_desc": "(-13.8°C)Temperature too High",
    //     "date_created": "2015-12-25",
    //     "status": "Created",
    //     "resolution": "Unresolved",
    //     "asignee": "John Gamble",
    //     "comments": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    //     "attachments":["File.doc", "0012.jpg", "0022.jpg", "0014.jpg"],
    //     "notify": "yes"
    //   },
    //   {
    //     "region_site": "VIC Metro - 62 Elizabeth Street",
    //     "location_unit": "Kitchen Freezer",
    //     "case_desc": "(-13.8°C)Temperature too High",
    //     "date_created": "2015-12-25",
    //     "status": "Created",
    //     "resolution": "Unresolved",
    //     "asignee": "John Gamble",
    //     "comments": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    //     "attachments":["File.doc", "0012.jpg", "0022.jpg", "0014.jpg"],
    //     "notify": "no"
    //   },
    //   {
    //     "region_site": "VIC Metro - 63 Elizabeth Street",
    //     "location_unit": "Kitchen Freezer",
    //     "case_desc": "(-13.8°C)Temperature too High",
    //     "date_created": "2015-12-25",
    //     "status": "Created",
    //     "resolution": "Unresolved",
    //     "asignee": "John Gamble",
    //     "comments": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    //     "attachments":["File.doc", "0012.jpg", "0022.jpg", "0014.jpg"],
    //     "notify": "yes"
    //   },
    //   {
    //     "region_site": "VIC Metro - 64 Elizabeth Street",
    //     "location_unit": "Kitchen Freezer",
    //     "case_desc": "(-13.8°C)Temperature too High",
    //     "date_created": "2015-12-25",
    //     "status": "Created",
    //     "resolution": "Unresolved",
    //     "asignee": "John Gamble",
    //     "comments": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    //     "attachments":["File.doc", "0012.jpg", "0022.jpg", "0014.jpg"],
    //     "notify": "yes"
    //   },
    //   {
    //     "region_site": "VIC Metro - 65 Elizabeth Street",
    //     "location_unit": "Kitchen Freezer",
    //     "case_desc": "(-13.8°C)Temperature too High",
    //     "date_created": "2015-12-25",
    //     "status": "Created",
    //     "resolution": "Unresolved",
    //     "asignee": "John Gamble",
    //     "comments": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    //     "attachments":["File.doc", "0012.jpg", "0022.jpg", "0014.jpg"],
    //     "notify": "yes"
    //   }

    // ];


    // for (let item of cases) {
    //   currentItems.push(new Case(item));
    // }


   // this.currentItems = cases;
   // this.sortBy = {"label":"Date Created","value":"date_created"};

  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

   ionViewWillEnter() {
    this.reloadTenants();
  }

  toggleMenu() {
    document.getElementById("menu").style.display = "block";
  }

  caseClick(item){
    this.navCtrl.push(CaseDetailPage, { case:item });
  }
  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  filterClick() {
    this.navCtrl.push(CaseFilterPage);
  }

  sortClick() {
    this.navCtrl.push(OptionsPage);
  }

  reloadTenants() {
    this.casesProvider.getCases().subscribe(
        (res: any) => {
          console.log(res);
          this.currentItems = res; 
        },
        error => {
          console.log(error);
        });
  }

  /**
   * Delete an item from the list of items.
   */
 //  deleteItem(item) {
 //    this.cases.delete(item);
 //  }

 //  moreDisplay(id) {
 //    var x = document.getElementById(id);
 //    if (x.className.indexOf("w3-show") == -1) {
 //        x.className += " w3-show";
 //    } else { 
 //        x.className = x.className.replace(" w3-show", "");
 //    }
 // }

  /**
   * Navigate to the detail page for this item.
   */


}


