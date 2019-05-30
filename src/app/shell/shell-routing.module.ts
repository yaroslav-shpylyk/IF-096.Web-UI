import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { AdminPanelGuard } from '../services/admin-panel.guard';
import { StudentGuard } from '../services/student.guard';
import { TeachersGuard } from '../services/teachers.guard';
import { ShellRedirectGuard } from '../services/shell-redirect.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'admin-panel',
        canActivate: [AdminPanelGuard],
        canLoad: [AdminPanelGuard],
        loadChildren: '../admin-panel/admin-panel.module#AdminPanelModule'
      },
      {
        path: 'journals',
        canActivate: [TeachersGuard],
        canLoad: [TeachersGuard],
        loadChildren: '../journal/journal.module#JournalModule'
      },
      {
        path: 'progress',
        canActivate: [TeachersGuard],
        canLoad: [TeachersGuard],
        loadChildren: '../progress/progress.module#ProgressModule'
      },
      {
        path: 'student-book',
        canActivate: [StudentGuard],
        canLoad: [StudentGuard],
        loadChildren: '../student-book/student-book.module#StudentBookModule'
      },
      {
        path: '',
        canActivate: [ShellRedirectGuard],
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
