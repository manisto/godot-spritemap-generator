import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { SpritemapSettingsComponent } from "../spritemap-settings/spritemap-settings.component";

@NgModule({
  declarations: [
    AppComponent,
    SpritemapSettingsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
