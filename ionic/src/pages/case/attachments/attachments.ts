import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PreviewPage } from '../../pages';
import { AlertController } from 'ionic-angular'
import { Camera } from '@ionic-native/camera';


/**
 * Generated class for the AttachmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attachments',
  templateUrl: 'attachments.html',
})
export class AttachmentsPage {


    @ViewChild('fileInput') fileInput;


    
	attachments : any;
	case : any
	currSelected : any;
	showMenu = false;
	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public camera: Camera) {
		//this.attachments = ['file.jpg','file2.jpg','file3.jpg'];
		this.case =navParams.get('data');
    	this.attachments =this.case.attachments;
	}

	ionViewDidLoad() {
	    console.log('ionViewDidLoad AttachmentsPage');
	}

	moreDisplay(id) {
		document.getElementById(id+'-hide').style.display = "none";
		document.getElementById(id+'-show').style.display = "unset";
		this.reset(id);
		this.currSelected = id;

	}

	reset(id) {
		for(let i = 0; i< this.attachments.length; i++) {
			if(id+'-show' != i+'-more-show') {
				document.getElementById(i+'-more-show').style.display = "none";
				document.getElementById(i+'-more-hide').style.display = "unset";
			}
		}

	}

	upload() {
		this.showMenu = !this.showMenu;
		document.getElementById('uploadid').style.display = this.showMenu?"table":"none";
	}

	deleteClick(file) {

        let alert = this.alertCtrl.create({
        title: 'File Deleted',
	    message: 'File03.jpg was succesfully <br/> deleted in your list.',
	    buttons: [
	       
	        {
	          text: 'OK',
	          handler: () => {
	            
	          }
	        }
	      ]
	    });

	    alert.present();	   
	}

	getImage() {
        
         this.fileInput.nativeElement.click();
       
    }

    getPdf() {
       this.fileInput.nativeElement.click();
    }

    getDocs() {
       this.fileInput.nativeElement.click();
    }

    getVideo() {
     
         this.fileInput.nativeElement.click();
       
    }

    
	fileClick(file) {
		 this.navCtrl.push(PreviewPage, {
      		title: this.case.region_site,
      		file: file
   	 	});
	}

	clickCamera() {

		let alert = this.alertCtrl.create({
	    message: '<span><strong>"Monika"</strong> would like to access your camera and photos.</span> <br/><p class="paragraph2">Monika will only upload and share photos you choose</p>',
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
		            
			        this.fileInput.nativeElement.click();
			        
	          }
	        }
	      ]
	    });

	    alert.present();
	}



}
