import { Component } from '@angular/core';

import { ModalController, ViewController } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  selector: 'splashp-screen',
  templateUrl: 'index.html'
})
export class Splash {

  constructor(
      public modalCtrl: ModalController,
      public splashScreen: SplashScreen,
      public viewCtrl: ViewController
    ) {

  }

  ionViewDidEnter() {

    this.splashScreen.hide();

    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 4000);

  }
}
