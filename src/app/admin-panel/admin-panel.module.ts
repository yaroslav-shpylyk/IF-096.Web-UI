import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
<<<<<<< HEAD
import { ScheduleComponent } from './schedule/schedule.component';
=======
import { TeachersComponent } from './teachers/teachers.component';
import { MaterialModule } from '../material';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TeacherEditComponent } from './teachers/teacher-edit/teacher-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogEntryComponent } from './teachers/teachers-list/dialog/dialog-overview';
>>>>>>> master

@NgModule({
  declarations: [
    AdminPanelComponent,
<<<<<<< HEAD
    ScheduleComponent
=======
    TeachersComponent,
    TeachersListComponent,
    TeacherEditComponent,
    DialogEntryComponent
>>>>>>> master
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminPanelModule {}
