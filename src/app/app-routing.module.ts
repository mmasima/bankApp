import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './view/login-page';
import { HomepageComponent } from './view/homepage';
import { AuthGuard as AuthGuard } from './config/auth/authGuard/auth.guard';
import { DepositComponent } from './view/deposit';
import { ClientDetailComponent } from './view/client-detail';

import { OpenAccountComponent } from './view/open-account';
import { WithdrawComponent } from './view/withdraw/withdraw.component';

const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'homepage', component: HomepageComponent , canActivate: [AuthGuard]},
  {path: 'deposit', component: DepositComponent, canActivate: [AuthGuard]},
  {path: 'client-detail', component: ClientDetailComponent, canActivate: [AuthGuard]},
  {path: 'open-account', component: OpenAccountComponent, canActivate: [AuthGuard]},
  {path: 'withdraw', component: WithdrawComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingModule = RouterModule.forRoot(routes);

