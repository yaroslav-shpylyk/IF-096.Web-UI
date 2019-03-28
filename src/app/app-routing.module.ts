import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'shell',
    loadChildren: './shell/shell.module#ShellModule'
  },
  {
    path: 'admin-panel',
    loadChildren: './admin-panel/admin-panel.module#AdminPanelModule'
  },
  {
    path: 'journal',
    loadChildren: './journal/journal.module#JournalModule'
  },
  {
    path: 'progress',
    loadChildren: './progress/progress.module#ProgressModule'
  },
  {
    path: 'student-book',
    loadChildren: './student-book/student-book.module#StudentBookModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
