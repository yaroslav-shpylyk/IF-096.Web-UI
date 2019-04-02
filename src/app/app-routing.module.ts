import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellGuard } from './services/shell.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: '',
    loadChildren: './shell/shell.module#ShellModule',
    canActivate: [ShellGuard],
    canLoad: [ShellGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
