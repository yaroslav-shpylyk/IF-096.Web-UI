import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TeachersComponent } from './teachers/teachers.component';
import { MaterialModule } from '../material';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TeacherEditComponent } from './teachers/teacher-edit/teacher-edit.component';
import { DialogEntryComponent } from './teachers/teachers-list/dialog/dialog-overview';
import { StudentsListComponent } from './students-list/students-list.component';
import { PlatformModule } from '@angular/cdk/platform';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupsComponent } from './admin-panel/groups/groups.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddModifyGroupComponent } from './admin-panel/groups/add-modify/add-modify.component';
import { MatInputModule, MatDialogModule, MatIconModule, MatSelectModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';




@NgModule({
  declarations: [
    AdminPanelComponent,
    GroupsComponent,
    AddModifyGroupComponent,
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
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatBottomSheetModule,
    MatListModule,
    MatSortModule,
    MatSelectModule,
    PlatformModule,
    FlexLayoutModule,
    MaterialModule
  ],
  entryComponents: [
    AddModifyGroupComponent
  ],
  providers: [GroupsComponent]
})
export class AdminPanelModule {}
