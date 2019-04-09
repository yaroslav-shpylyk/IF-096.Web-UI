import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { AdminPanelGuard } from '../admin-panel/admin-panel.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'admin-panel',
        loadChildren: '../admin-panel/admin-panel.module#AdminPanelModule'
      },
      {
        path: 'journal',
        canActivate: [AdminPanelGuard],
        canLoad: [AdminPanelGuard],
        loadChildren: '../journal/journal.module#JournalModule'
      },
      {
        path: 'progress',
        canActivate: [AdminPanelGuard],
        canLoad: [AdminPanelGuard],
        loadChildren: '../progress/progress.module#ProgressModule'
      },
      {
        path: 'student-book',
        canActivate: [AdminPanelGuard],
        canLoad: [AdminPanelGuard],
        loadChildren: '../student-book/student-book.module#StudentBookModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
