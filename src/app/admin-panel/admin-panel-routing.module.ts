import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TeacherEditComponent } from './teachers/teacher-edit/teacher-edit.component';
import { DialogEntryComponent } from './teachers/teachers-list/dialog/dialog-overview';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { GroupsComponent } from './admin-panel/groups/groups.component';
import { StudentDatails } from './students-list/student-detail-modal/student-detail-modal.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent
  },
  {
    path: 'groups',
    component: GroupsComponent
  },
  {
    path: 'students',
    component: StudentsListComponent,
    children: [
      {
        path: ':id',
        component: StudentDatails
      }
    ]
  },
  {
    path: 'teachers/new',
    component: TeacherEditComponent
  },
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
  {
    path: 'teachers/:id/edit',
    component: TeacherEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
