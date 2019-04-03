import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
<<<<<<< HEAD
import { SubjectsComponent } from './admin-panel/subjects/subjects.component';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [AdminPanelComponent, SubjectsComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule
=======
import { TeachersComponent } from './teachers/teachers.component';
import { MaterialModule } from '../material';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TeacherEditComponent } from './teachers/teacher-edit/teacher-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogEntryComponent } from './teachers/teachers-list/dialog/dialog-overview';

@NgModule({
  declarations: [
    AdminPanelComponent,
    TeachersComponent,
    TeachersListComponent,
    TeacherEditComponent,
    DialogEntryComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
>>>>>>> master
  ]
})
export class AdminPanelModule {}
