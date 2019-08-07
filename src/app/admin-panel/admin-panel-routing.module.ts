import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DialogEntryComponent } from './teachers/teachers-list/details-dialog/details-dialog-overview';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { GroupsComponent } from './admin-panel/groups/groups.component';
import { StudentDatailsComponent } from './students-list/student-detail-modal/student-detail-modal.component';
import { AddStudentModalComponent } from './students-list/add-student/add-student.component';
import { FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditDialogEntryComponent } from './teachers/teachers-list/edit-dialog/edit-dialog';
import { SubjectsComponent } from './subjects/subjects.component';
import { NewYearComponent } from './new-year/new-year.component';
import { TeacherConnectionComponent } from './teacher-connection/teacher-connection.component';
import { ConnectToJournalComponent } from './teachers/teachers-list/connect-to-journal-dialog/connect-to-journal-dialog.component';
import { MarkTypesComponent } from './mark-types/mark-types.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
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
            component: StudentDatailsComponent,
            pathMatch: 'full'
          },
          {
            path: ':id/edit',
            component: AddStudentModalComponent
          },
        ]
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
          { path: ':id/edit', component: EditDialogEntryComponent },
          { path: ':id/connect-to-journal-dialog', component: ConnectToJournalComponent }
        ]
      },
      {
        path: 'new-year-transition',
        component: NewYearComponent
      },
      {
        path: 'mark-types',
        component: MarkTypesComponent
      },
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'schedule',
        component: ScheduleComponent
      },
      {
        path: 'subjects',
        component: SubjectsComponent
      }
    ]
  },
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      {
        path: 'teacher-connection',
        component: TeacherConnectionComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class AdminPanelRoutingModule { }
