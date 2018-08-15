import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular'
import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import { TenantfilterPage, ItemCreatePage } from '../pages';
import { TenantsProvider } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item = [
    //{name: 'test', subdomain: 'staff.monika.com', image: 'https://oxypro.com.ph/wp-content/uploads/2016/04/beta-logo.png'},
    //{name: 'test', subdomain: 'staff.monika.com', image: 'https://oxypro.com.ph/wp-content/uploads/2016/04/beta-logo.png'}
  ];

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController,  public tenantsProvider: TenantsProvider, public alertCtrl: AlertController) {
    
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

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    this.navCtrl.push(ItemCreatePage);
  }

  editItem(item) {
    this.navCtrl.push(ItemCreatePage,{data : item});
  }

  activateTenant(id) {
    let alert = this.alertCtrl.create({
       title: 'Activated',
       message: 'Tenant NHS Trust was <br/>successfully activated.',
       buttons: [
          {
            text: "OK",
            handler: () => {
              console.log('Disagree clicked');
            }
          }
       ]
    });
    alert.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteTenant(id) {
    this.tenantsProvider.deleteTenant(id).subscribe(
        (res: any) => {
          console.log(res);
         //this.reloadTenants();
           // alert //
               let alert = this.alertCtrl.create({
                 title: 'Warning: Deleting Tenant <br/> "NHS Trust"',
                   message: 'Deleting a tenant deletes all data <br/> for the client. This should ony be <br/> done if a backup has been <br/> downloaded first. Are you sure you <br/> wish to delete this tenant?',
                   buttons: [

                      {
                         text: "Don't Allow",
                          handler: () => {
                             console.log('Disagree clicked');
                          }
                       },
         
                     {
                        text: 'OK',
                        handler: () => {
                            let alert2 = this.alertCtrl.create({
                                title: "Secruty Measure",
                                message: 'Enter the password for your account <br/> "email@monika.com".',
                                inputs: [ { placeholder: '', }],
                                buttons: [
                                  {
                                      text: "Cancel",
                                      handler: () => {
                                        console.log('Disagree clicked');
                                      }
                                  },
                                  {
                                      text: "Ok",
                                      handler: () => {
                                         //console.log('Disagree clicked');
                                         let alert3 = this.alertCtrl.create({
                                            message: '<img src="../assets/imgs/Touch_ID_Icon.png"> <h3>Touch ID for "Monika"</h3> Deleting "NHS Trust"',
                                            buttons: [
                                              {
                                                 text: "Cancel",
                                                 handler: () => {
                                                     console.log('Disagree clicked');
                                                  }
                                               }
                                            ]
                                         });
                                         alert3.present();
                                      }
                                  },
                                ]
                            });

                            alert2.present();
                        }
                        
                     }
              ]
            });

            alert.present();
           // alert//
        },
        error => {
          console.log(error);
        });
  }

  changeStatus(tenant) {
    this.tenantsProvider.changeStatus(tenant).subscribe(
        (res: any) => {
          console.log(res);
         this.reloadTenants();
        },
        error => {
          console.log(error);
        });
  }

  displayOption() {
     this.navCtrl.push(TenantfilterPage);
  }

  moreDisplay(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
         x.className = x.className.replace(" w3-hide", " w3-show");
    } else { 
        x.className = x.className.replace(" w3-show", " w3-hide");
    }
  }

  reloadTenants() {
    this.tenantsProvider.getTenants().subscribe(
        (res: any) => {
          this.currentItems = res; 
        },
        error => {
          console.log(error);
        });
  }



}


