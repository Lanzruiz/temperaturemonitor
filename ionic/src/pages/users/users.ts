import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/providers';

import { UserDetailPage } from '../pages';
/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  items = [];
  //  = [
  //   {name:'John Gamble', position: 'Manager', company: 'Monika'},
  //   {name:'William Blake', position: 'Manager', company: 'Monika'},
  //   {name:'Lanz Cameron', position: 'Manager', company: 'Monika'},
  //   {name:'Maxine Stewart', position: 'Manager', company: 'Monika'},
  //   {name:'Ian Mcbride', position: 'Manager', company: 'Monika'}
  // ];

 
  constructor(public navCtrl: NavController, public navParams: NavParams, public usersProvider: UsersProvider) {
  }

  ionViewDidLoad() {
    this.reloadUsers();
  }

  ionViewWillEnter() {
    this.reloadUsers();
  }

  reloadUsers(){
    this.usersProvider.getUsers().subscribe(
        (res: any) => {
          //console.log(res,"-----",res.status);
          //this.items = res;
          this.items = [];
          for (let entry of res) {

            let ownership = entry.ownership;
            let ownerText = "";
            console.log(ownership.tenantName);
            if(ownership && ownership.tenantName) {
              ownerText = ownership.tenantName;
            if(ownership.regionName)
              ownerText = ownership.tenantName +", "+ ownership.regionName;
            if(ownership.siteName)
              ownerText = ownership.tenantName +", "+ ownership.regionName +", "+ownership.siteName;
            } else if(ownership) {
              ownerText = ownership.ownershipType;
            }



            let data = {
              "status" : entry.status,
              "lastname" : entry.lastname,
              "firstName" : entry.firstName,
              "email" : entry.email,
              "password": entry.password,
              "phone" : entry.phone,
              "roleId" : entry.roleId,
              "roleName" : entry.roleName,
              "companyName" : entry.companyName,
              "id" : entry.id,
              "ownership" : ownership,
              "ownerText" : ownerText,
              "profilePic" : entry.profilePic
            }
            this.items.push(data);
          }
        },
        error => {
          console.log(error);
        });
  }

  addClicked () {
    this.navCtrl.push(UserDetailPage);
  }

  itemSelected(user) { 
    this.navCtrl.push(UserDetailPage, { user: user });
  }



}
