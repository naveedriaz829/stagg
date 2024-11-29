import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreLoaderComponent } from './pages/pre-loader/pre-loader.component';
import { HomeModule } from './pages/home/home.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { AboutUsModule } from './pages/about-us/about-us.module';
import { ContactUsModule } from './pages/contact-us/contact-us.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PartnershipModule } from './pages/partnership/partnership.module';
import { HttpClientModule } from '@angular/common/http';
import { ToasterComponent } from './shared/toaster/toaster.component';

@NgModule({
  declarations: [
    AppComponent,
    PreLoaderComponent,
    ToasterComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    NavbarModule,
    AboutUsModule,
    ContactUsModule,
    BrowserAnimationsModule,
    PartnershipModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
