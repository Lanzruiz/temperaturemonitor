import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ModalController, ViewController NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { UsersProvider } from '../../../providers/providers';

import { OwnerPage } from '../../pages';
import { PermissionPage } from '../../pages';
import { UsersPage } from '../../pages';




/**
 * Generated class for the UserDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {

@ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  features:any;

  isEditOperation : any;

  permission = 'Select Permissions';

  owner : any;

  ownerText= '';

  data : any;

  permissionList = [];
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera,public usersProvider: UsersProvider) {
    let userInfo = navParams.get('user');
    if(userInfo) {

      let first  =  (userInfo.firstName)? userInfo.firstName+" ":'';
      let last = (userInfo.lastname)? userInfo.lastname:'';
      this.data = {
        id : userInfo.id,
        fullname: first+last,
        roleName: userInfo.roleName,
        email: userInfo.email,
        password : userInfo.password,
        company : userInfo.companyName,
        mobile : userInfo.phone,
        profilePic : userInfo.profilePic
      };


      if(userInfo.ownership.ownershipType == "monika") 
        this.owner = "monika";
      else if(userInfo.ownership.ownershipType == "none") 
        this.owner = "none";
      else {
         this.owner = {
          tenant : userInfo.ownership.tenantName,
          region : userInfo.ownership.regionName,
          site : userInfo.ownership.siteName
        }; 
      }

      this.createOwnershipLabel(this.owner);
    }
    this.isEditOperation = (this.data)?true:false;

    this.form = formBuilder.group({
      profilePic: [''],
      fullname: ['', Validators.required],
      roleName:['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
      company: ['', Validators.required],
      mobile: ['', Validators.required]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.enableSaveButton();
      
    });


    if(this.isEditOperation) {
      this.form.patchValue({ 'profilePic': this.data.profilePic });
    }


    this.features = [
      {'id':1,'label':'feature 1'},
      {'id':2,'label':'feature 2'},
      {'id':3,'label':'feature 3'},
    ]
  }

  ionViewDidLoad() {

  }

  onBlur(field){
    this.editUser(field);
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
        this.editUser('profilePic');
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
      this.editUser('profilePic');
    };

    reader.readAsDataURL(event .target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }


 presentOwnerModal() {
   let ownerModal = this.modalCtrl.create(OwnerPage, { owner: this.owner });
   ownerModal.onDidDismiss(data => {
    if(data) {
      console.log(data);
      this.owner = data;

      this.createOwnershipLabel(data);
      this.enableSaveButton();
    }

   });

   ownerModal.present();
 }

 addPermission() {
  let permissionModal = this.modalCtrl.create(PermissionPage, { permission: this.permissionList });
   permissionModal.onDidDismiss(data => {
      this.permissionList = data;
      if(data.length > 0) {
        this.permission = "Tap to view permissions";
        this.enableSaveButton();
      }
   });  

   permissionModal.present();
 }

 createUser() {
  let ownershipType = "None"
  if(this.owner && this.owner.tenant) {
        ownershipType = 'tenant';
        if(this.owner.region)
          ownershipType = 'region';
        if(this.owner.site)
          ownershipType = 'site';
  } else {
          ownershipType = this.owner;
  }

  let params = { 
    "status" : "active",
    "lastname" : this.getLastName(this.form.controls['fullname'].value),
    "firstName": this.getFirstName(this.form.controls['fullname'].value),
    "email": this.form.controls['email'].value,
    "password": this.form.controls['password'].value,
    "phone": this.form.controls['mobile'].value,
    "companyName": this.form.controls['company'].value,
    "profilePic": this.form.controls['profilePic'].value,
    "roleName" : this.form.controls['roleName'].value,
    "ownership": {
      "ownershipType": ownershipType,
      "tenantId": "fa8518a0-89df-11e8-9a94-a6cf71072f71",
      "tenantName": this.owner.tenant,
      "regionId": "fa8518a0-89df-11e8-9a94-a6cf71072f72",
      "regionName": this.owner.region,
      "siteId": "fa8518a0-89df-11e8-9a94-a6cf71072f73",
      "siteName": this.owner.site
    }
  };
  this.usersProvider.addUser(params).subscribe(
      (res: any) => {
        if(this.permissionList.length>0 && res.userId) {
          
          this.usersProvider.addPermission(res.userId, this.permissionList).subscribe(
            (res: any) => {
                this.navCtrl.push(UsersPage);
            },
            error => {
              console.log(error);

            });
        }
      },
      error => {
        console.log(error);
  });
 }

  getLastName(fullname) {
      var n = fullname.trim().split(" ");
      return n[n.length - 1];
  }
 
  getFirstName(fullname) {
        let spacePosition = fullname.indexOf(' ');
        if (spacePosition === -1)
            return fullname;
        else
            return fullname.substr(0, spacePosition);
  };

  enableSaveButton() {
    this.isReadyToSave = this.form.valid && this.owner && (this.permissionList.length>0);
  }

  editUser(field) {
    if(this.isEditOperation && this.data[field] && this.data[field].trim() !== this.form.controls[field].value.trim()) {
      if(field === "fullname") {
          var params1 = [{
            "op" : "replace",
            "path":"/firstName",
            "value": this.getFirstName(this.form.controls[field].value)
          }];
          this.callEditApi(this.data.id,params1,field);

          params1 = [{
            "op" : "replace",
            "path":"/lastName",
            "value": this.getLastName(this.form.controls[field].value)
          }];
          this.callEditApi(this.data.id,params1,field);

      } else {
          let path = "/"+field;
          if(field === "company")
            path = "/companyName";
          if(field === "mobile")
            path = "/phone";

          var params2 = [{
          "op" : "replace",
          "path":path,
          "value": this.form.controls[field].value
          }];
          
          this.callEditApi(this.data.id,params2,field);

      }
     

    } 
  }

  callEditApi(id, params, field) {
    this.usersProvider.editUser(id,params).subscribe(
    (res: any) => {
      this.data[field] = this.form.controls[field].value;
    },
    error => {
      console.log(error);
    });
  }

  createOwnershipLabel(data) {

      if(data && data.tenant) {
        this.ownerText = data.tenant;
        if(data.region)
          this.ownerText = data.tenant +","+ data.region;
        if(data.site)
          this.ownerText = data.tenant +","+ data.region +","+data.site;
      } else {
        this.ownerText = data;
      }
  }



}
