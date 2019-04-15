import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DailyScheduleComponent } from './schedule/daily-schedule/daily-schedule.component';
import { TeachersComponent } from './teachers/teachers.component';
import { MaterialModule } from '../material.module';
import { TeachersListComponent } from './teachers/teachers-list/teachers-list.component';
import { DialogEntryComponent, DetailsDialogOverviewComponent } from './teachers/teachers-list/details-dialog/details-dialog-overview';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentDatails, StudentDetailModalComponent } from './students-list/student-detail-modal/student-detail-modal.component';
import { MatListModule } from '@angular/material/list';
import { PlatformModule } from '@angular/cdk/platform';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupsComponent } from './admin-panel/groups/groups.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddModifyGroupComponent } from './admin-panel/groups/add-modify/add-modify.component';
import { MatDialogModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSortModule } from '@angular/material/sort';
import { EditDialogEntryComponent, EditDialogOverviewComponent } from './teachers/teachers-list/edit-dialog/edit-dialog';
import { FilterPipe } from './teachers/helpers/filter.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { MatMenuModule } from '@angular/material';
import { SubjectsComponent } from './subjects/subjects.component';
import { ModifySubjectsComponent } from './subjects/modify-subjects/modify-subjects.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    ScheduleComponent,
    DailyScheduleComponent,
    GroupsComponent,
    AddModifyGroupComponent,
    TeachersComponent,
    TeachersListComponent,
    DialogEntryComponent,
    StudentsListComponent,
    EditDialogEntryComponent,
    FilterPipe,
    DetailsDialogOverviewComponent,
    EditDialogOverviewComponent,
    StudentDatails,
    StudentDetailModalComponent,
    DashboardComponent,
    SubjectsComponent,
    ModifySubjectsComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatListModule,
    PlatformModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    ChartsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MaterialModule,
    MatSortModule
  ],
  entryComponents: [
    AddModifyGroupComponent,
    StudentDetailModalComponent,
    DetailsDialogOverviewComponent,
    EditDialogOverviewComponent,
    ModifySubjectsComponent
  ],
  providers: []
})
export class AdminPanelModule { }
