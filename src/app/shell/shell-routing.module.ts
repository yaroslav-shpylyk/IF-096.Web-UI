import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShellComponent} from './shell/shell.component';


const routes: Routes = [
  {
    path: 'admin-panel',
    loadChildren: '../admin-panel/admin-panel.module#AdminPanelModule'
  },
  {
    path: 'journal',
    loadChildren: '../journal/journal.module#JournalModule'
  },
  {
    path: 'progress',
    loadChildren: '../progress/progress.module#ProgressModule'
  },
  {
    path: 'student-book',
    loadChildren: '../student-book/student-book.module#StudentBookModule'
  },
  {
    path: '',
    component: ShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
