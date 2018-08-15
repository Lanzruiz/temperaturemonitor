import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html',
})
export class PreviewPage {
  title:any;
  file:any

  constructor(public navParams: NavParams,public navCtrl: NavController, public modalCtrl: ModalController) {
    this.title =navParams.get('title');
    this.file = navParams.get('file');
    console.log(this.title,this.file);
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }
}

