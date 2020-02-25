import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { DepositComponent } from './deposit/deposit.component';
import { OpenAccountComponent } from './open-account/open-account.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { from } from 'rxjs';

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
