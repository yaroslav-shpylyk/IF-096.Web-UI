import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellGuard } from './services/shell.guard';

const routes: Routes = [
  {
    path: 'journal',
    loadChildren: './journal/journal.module#JournalModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  // {
  //   path: 'shell',
  //   loadChildren: './shell/shell.module#ShellModule',
  //   canActivate: [ShellGuard],
  //   canLoad: [ShellGuard]
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
