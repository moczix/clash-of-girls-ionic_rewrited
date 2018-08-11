import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {GooglePlus} from '@ionic-native/google-plus';
import {AuthService} from "../pages/shared/auth.service";
import {BaseHttpInterceptor} from "../pages/shared/base-http-interceptor";
import {AuthInterceptor} from "../pages/shared/auth-interceptor";
import {ErrorService} from "../pages/shared/error.service";
import {InGamePage} from "../pages/in-game/in-game";
import {InGamePageModule} from "../pages/in-game/in-game.module";


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    InGamePageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
  ],
  providers: [

    {provide: HTTP_INTERCEPTORS, useClass: BaseHttpInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    StatusBar,
    SplashScreen,

    ErrorService,
    AuthService,

    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
