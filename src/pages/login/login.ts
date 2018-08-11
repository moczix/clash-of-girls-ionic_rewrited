import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {GooglePlus} from "@ionic-native/google-plus";
import {config} from "../../config";
import {fromPromise} from "rxjs/internal/observable/fromPromise";
import {AuthService} from "../shared/auth.service";
import {mergeMap} from "rxjs/internal/operators";
import {forkJoin, of} from "rxjs/index";
import {InGamePage} from "../in-game/in-game";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  initialized = false;
  signStep = 0;
  error: string = "";

  username: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private googlePlus: GooglePlus,
    private authService: AuthService) {
  }

  ionViewDidLoad() {
    if (this.authService.isSigned()) {
      this.googleLogin('trySilentLogin')
        .subscribe(([account, auth]) => {
          if (auth.status) {
            this.authService.googleToken = account.idToken;
            this.goToInGame();
          }
        })
    }else {
      this.initialized = true;
    }
  }

  googleSignIn() {
    this.googleLogin('login')
      .subscribe(([account, auth]) => {
        this.authService.googleToken = account.idToken;
        if (auth.status) {
          this.authService.setSigned(true);
          this.goToInGame();
        }else {
          this.signStep = 1;
        }
      })
  }

  googleLogin(method: string) {
    return fromPromise(this.googlePlus[method]({webClientId: config.googleClientId}))
      .pipe(
        mergeMap((account: any) => forkJoin(
          of(account), this.authService.isAuth(account.idToken)
        ))
      )
  }

  createAccount() {
    console.log(this.username);
    this.authService.createAccount(this.username, "pl", "pl")
      .subscribe(
        () => {
          this.authService.setSigned(true);
          this.goToInGame();
      });
  }

  async goToInGame(){
    await this.navCtrl.push(InGamePage);
    const startIndex = this.navCtrl.getActive().index - 1;
    this.navCtrl.remove(startIndex, 1);
  }



}
