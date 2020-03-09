import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomepageComponent } from './view/homepage/homepage.component';
import { NavbarComponent } from './view/navbar/navbar.component';
import { ClientDetailComponent } from './view/client-detail/client-detail.component';
import { DepositComponent } from './view/deposit/deposit.component';
import { OpenAccountComponent } from './view/open-account/open-account.component';
import { WithdrawComponent } from './view/withdraw/withdraw.component';
import { LoginPageComponent } from './view/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomepageComponent,
    NavbarComponent,
    ClientDetailComponent,
    DepositComponent,
    OpenAccountComponent,
    WithdrawComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
