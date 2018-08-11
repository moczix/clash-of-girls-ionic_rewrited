import {Component, OnInit} from '@angular/core';
import {AlertController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {ErrorService} from "../pages/shared/error.service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private alertCtrl: AlertController, private errorService: ErrorService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.hide();
      splashScreen.hide();
      this.rootPage = LoginPage;
    });
  }

  ngOnInit() {
    this.errorService.getMessage()
      .subscribe(message => {
        this.alertCtrl.create({
          title: 'Mamy problemik!',
          subTitle: message,
          buttons: ['Kapisz!']
        }).present();
      })
  }

}

