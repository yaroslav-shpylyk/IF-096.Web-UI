import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TeacherEditComponent } from './teachers/teacher-edit/teacher-edit.component';
import { DialogEntryComponent } from './teachers/teachers-list/dialog/dialog-overview';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentDatails } from './students-list/student-detail-modal/student-detail-modal.component';
import { AddStudentComponent } from './students-list/add-student/add-student.component';
import { AddStudentModalComponent } from './students-list/add-student/add-student.component';
import { FullscreenOverlayContainer } from '@angular/cdk/overlay';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent
  },
  {
    path: 'students',
    component: StudentsListComponent,
    children: [
      {
        path: 'add',
        component: AddStudentModalComponent
      },
      {
        path: ':id',
        component: StudentDatails,
        pathMatch: 'full'
      },
      {
        path: ':id/edit',
        component: AddStudentModalComponent
      },
    ],
  },

  {
    path: 'students/:id/edit',
    component: AddStudentModalComponent
  },


  { path: 'teachers/new', component: TeacherEditComponent },
  {
    path: 'teachers',
    component: TeachersListComponent,
    children: [
      {
        path: ':id',
        component: DialogEntryComponent
      }
    ]
  },
  { path: 'teachers/:id/edit', component: TeacherEditComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
