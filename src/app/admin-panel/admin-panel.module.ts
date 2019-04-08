import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TeachersComponent } from './teachers/teachers.component';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import { TeacherEditComponent } from './teachers/teacher-edit/teacher-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogEntryComponent } from './teachers/teachers-list/dialog/dialog-overview';
import { StudentsListComponent } from './students-list/students-list.component';
import { MatListModule } from '@angular/material/list';
import { PlatformModule } from '@angular/cdk/platform';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AdminPanelComponent,
    ScheduleComponent,
    TeachersComponent,
    TeachersListComponent,
    TeacherEditComponent,
    DialogEntryComponent,
    StudentsListComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    PlatformModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule
  ]

})
export class AdminPanelModule {}
