import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DialogEntryComponent } from './teachers/teachers-list/details-dialog/details-dialog-overview';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import { StudentsListComponent } from './students-list/students-list.component';
<<<<<<< HEAD
import { TeacherConnectionComponent } from './teacher-connection/teacher-connection.component';
 
=======
import { EditDialogEntryComponent } from './teachers/teachers-list/edit-dialog/edit-dialog';
import { GroupsComponent } from './admin-panel/groups/groups.component';
import { StudentDatails } from './students-list/student-detail-modal/student-detail-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubjectsComponent } from './subjects/subjects.component';

>>>>>>> master
const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      {
        path: 'students',
        component: StudentsListComponent
      },
      {
        path: 'groups',
        component: GroupsComponent
      },
      {
        path: 'teachers',
        component: TeachersListComponent,
        children: [
          { path: 'new', component: EditDialogEntryComponent },
          {
            path: ':id',
            component: DialogEntryComponent
          },
          { path: ':id/edit', component: EditDialogEntryComponent }
        ]
      },
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'subjects',
        component: SubjectsComponent
      }
    ]
<<<<<<< HEAD
  },
  { path: 'teachers/:id/edit', component: TeacherEditComponent },
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      {
        path:'teacher-connection',
        component: TeacherConnectionComponent
      }
    ]
=======
>>>>>>> master
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule {}
