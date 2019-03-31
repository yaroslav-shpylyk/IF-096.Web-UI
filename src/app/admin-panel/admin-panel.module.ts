import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TeachersComponent } from './teachers/teachers.component';
import { MaterialModule } from '../material';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import { DefaultTeacherComponent } from './teachers/default-teacher/default-teacher.component';
import { TeacherDetailComponent } from './teachers/teacher-detail/teacher-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TeacherEditComponent } from './teachers/teacher-edit/teacher-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminPanelComponent,
    TeachersComponent,
    TeachersListComponent,
    DefaultTeacherComponent,
    TeacherDetailComponent,
    TeacherEditComponent
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
