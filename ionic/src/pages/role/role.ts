import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComingPage } from '../pages';
import { CasePage } from '../pages';
import { TaskPage } from '../pages';
import { CreaterolePage } from '../pages';
import { AlertController } from 'ionic-angular'
import { EditrolePage } from '../pages';

/**
 * Generated class for the RolePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-role',
  templateUrl: 'role.html',
})
export class RolePage {

  componentName: string;

  items = [
    {name:'Monika Trainer 1', component: 'rttt'},
    {name:'Monika Engineer', component: ''},
    {name:'Monika Support', component: ''},
    {name:'Head Office', component: ''},
    {name:'Regional Manager', component: ''},
    {name:'Food Safety Manager', component: ''},
    {name:'Maintenance Manager', component: ''},
    {name:'External Engineer', component: ''},
    {name:'Internal Auditor', component: ''},
    {name:'External Auditor', component: ''},
    {name:'Site Manager', component: ''},
    {name:'Site Operator', component: ''}

  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RolePage');
  }
  
  editClick() {
    //console.log(items);
    this.navCtrl.push(EditrolePage);
  }

  deleteClick() {

     let alert = this.alertCtrl.create({
      title: 'Edit Role',
      message: 'Are you sure you want to delete a Regional Manager role?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            //this.navCtrl.push(TaskPage);
             let alert2 = this.alertCtrl.create({
                title: 'Delete Failed',
                message: 'Unable to delete role "Regional <br/> Manager". This role is used by one <br/> or more user accounts. In order to <br/> delete this role, first change the user <br/> accounts to designate a different <span>staff@monika.com</span>',
                buttons: [
                  {
                    text: 'OK'
                  }
                ]
             });
             alert2.present();
          }
        }
      ]
    });

    alert.present();
    
  }

  addClicked() {
    this.navCtrl.push(CreaterolePage);
  }

  moreDisplay(id) {
    document.getElementById(id).remove();
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
         x.className = x.className.replace(" w3-hide", " w3-show");
    } else { 
        x.className = x.className.replace(" w3-show", " w3-hide");
    }
  }

}
