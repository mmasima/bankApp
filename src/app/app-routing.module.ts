import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './login-page';
import { HomepageComponent } from './homepage';
import { AuthGuard as AuthGuard } from './auth/auth.guard';
import { DepositComponent } from './deposit';
import { ClientDetailComponent } from './client-detail';

import { OpenAccountComponent } from './open-account';
import { WithdrawComponent } from './withdraw/withdraw.component';

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

