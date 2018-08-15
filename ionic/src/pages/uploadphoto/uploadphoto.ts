import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegsuccessPage } from '../pages';

/**
 * Generated class for the UploadphotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-uploadphoto',
  templateUrl: 'uploadphoto.html',
})
export class UploadphotoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  doUpload() {
    this.navCtrl.push(RegsuccessPage);
  }

}
