import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  site: string;
  showMenu = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.site = navParams.get('data');
     
  }


  expandComment() {
    document.getElementById('textarea-container').innerHTML = "<div contenteditable='true' id='textbox' class='textarea margin' placeholder='Write your Comment'></div>";

    document.getElementById("commentcontainer").style.height = "259px";
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
    console.log(this.site);
  }

  upload() {
    this.showMenu = !this.showMenu;
    document.getElementById('uploadid').style.display = this.showMenu?"table":"none";
    document.getElementById("uploadid").style.bottom = "40px";
  }


  attachImage() {
    document.getElementById('textbox').innerHTML += "<div class='attached-image'>image.jpg</div><br/>";
    document.getElementById("uploadid").style.bottom = "-79px";
  }



}
