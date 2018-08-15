import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController } from 'ionic-angular';
import { PermscopePage } from '../../pages';
import { UsersProvider } from '../../../providers/providers';

/**
 * Generated class for the SelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select',
  templateUrl: 'select.html',
})
export class SelectPage {

   permissions = [];

  // 	{'id': 0 , 'label' : 'User Management' },
  // 	{'id': 1 , 'label' : 'Escalated Non Compliance' },
  // 	{'id': 2 , 'label' : 'Alert Management & Smart Diagnostic' },
  // 	{'id': 3 , 'label' : 'Enterprise Reporting' },
  // 	{'id': 4 , 'label' : 'Site Reporting' },
  // 	{'id': 5 , 'label' : 'Recieve Escalated Non-Compliances' },
  // 	{'id': 6 , 'label' : 'Case Management' },
  // 	{'id': 7 , 'label' : 'Policy Management' },
  // 	{'id': 8 , 'label' : 'Equipment Management' },
  // 	{'id': 9 , 'label' : 'Site Configuration' },
  // 	{'id': 10 , 'label' : 'Food Type Management' },
  // 	{'id': 11 , 'label' : 'Process Management' }
  // ];
  constructor(public usersProvider: UsersProvider,public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams,public modalCtrl:ModalController) {
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPage');
    this.usersProvider.getUserPermissioTypes().subscribe(
        (res: any) => {
          console.log(res);
          this.permissions = res;
        },
        error => {
          console.log(error);
        });
  }

  setParameters(item) {

  	let ownerModal = this.modalCtrl.create(PermscopePage,{data:item
  	});
    ownerModal.onDidDismiss(data => {
    	console.log(data,"select")
         if(data) {
          this.viewCtrl.dismiss(data);
         }
     });
     ownerModal.present();
  }

  dismiss() {
  	this.viewCtrl.dismiss();
  }





}
