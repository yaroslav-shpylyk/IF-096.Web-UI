import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellGuard } from './services/shell.guard';
import { NotFoundComponent } from './error/not-found/not-found.component';

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
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
