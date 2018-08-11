import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InGamePage } from './in-game';
import {NewsPage} from "./news/news";

@NgModule({
  declarations: [
    InGamePage,
    NewsPage,
  ],
  entryComponents: [
    NewsPage
  ],
  imports: [
    IonicPageModule.forChild(InGamePage),
  ],
})
export class InGamePageModule {}
