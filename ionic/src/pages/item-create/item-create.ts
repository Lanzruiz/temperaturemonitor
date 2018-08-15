import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, NavParams} from 'ionic-angular';
import { TenantsProvider } from '../../providers/providers'; 
import { ListMasterPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  features:any;

  isEditOperation : any;


  data : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, public tenantsProvider: TenantsProvider) {
    this.data = navParams.get('data');
    this.isEditOperation = (this.data)?true:false;

    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      subdomain:['',Validators.required],
      legalName: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      email:['', Validators.required]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
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
    this.editTenant(field);
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
        this.editTenant('profilePic');
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
      this.editTenant('profilePic');
    };

    reader.readAsDataURL(event .target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

  saveTenant() {
    this.tenantsProvider.addTenant(this.form.value).subscribe(
      (res: any) => {
        console.log(res,'-------');

       this.navCtrl.push(ListMasterPage);
      },
      error => {
        console.log(error);
      });
  }

  editTenant(field) {

    if(this.isEditOperation && this.data[field] && this.data[field].trim() !== this.form.controls[field].value.trim()) {
     
     var params = [{
      "op" : "replace",
      "path":"/"+field,
      "value": this.form.controls[field].value
     }];
     this.tenantsProvider.editTenant(this.data.id,params).subscribe(
      (res: any) => {
        this.data[field] = this.form.controls[field].value;
      },
      error => {
        console.log(error);
      });

    } 
  }


}
