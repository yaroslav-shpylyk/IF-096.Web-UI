import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DailyScheduleComponent } from './schedule/daily-schedule/daily-schedule.component';
import { MaterialModule } from '../material.module';
import {
  TeachersListComponent,
  ConfirmationDialogComponent
} from './teachers/teachers-list/teachers-list.component';
import {
  DialogEntryComponent,
  DetailsDialogOverviewComponent
} from './teachers/teachers-list/details-dialog/details-dialog-overview';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StudentsListComponent } from './students-list/students-list.component';
import {
  StudentDatailsComponent,
  StudentDetailModalComponent
} from './students-list/student-detail-modal/student-detail-modal.component';
import { MatListModule } from '@angular/material/list';
import { PlatformModule } from '@angular/cdk/platform';
import { GroupsComponent } from './admin-panel/groups/groups.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddModifyGroupComponent } from './admin-panel/groups/add-modify/add-modify.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule, MatIconModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AddStudentComponent } from './students-list/add-student/add-student.component';
import { AddStudentModalComponent } from './students-list/add-student/add-student.component';
import { MatInputModule } from '@angular/material/input';
import {
  EditDialogEntryComponent,
  EditDialogOverviewComponent
} from './teachers/teachers-list/edit-dialog/edit-dialog';
import { FilterPipe } from './teachers/helpers/filter.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { MatMenuModule, MatNativeDateModule } from '@angular/material';
import { SubjectsComponent } from './subjects/subjects.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material';
import { MatCardModule, MatExpansionModule, MatCheckboxModule, MatSlideToggleModule} from '@angular/material';
import { NewYearComponent } from './new-year/new-year.component';
import { ClassFilterPipe } from './new-year/class-filter.pipe';
import { TitlePipe } from './new-year/autotitle.pipe';
import { ModifySubjectsComponent } from './subjects/modify-subjects/modify-subjects.component';
import { TeacherConnectionComponent } from './teacher-connection/teacher-connection.component';
import { SharedModule } from '../shared/shared.module';
import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  declarations: [
    AdminPanelComponent,
    ScheduleComponent,
    DailyScheduleComponent,
    GroupsComponent,
    AddModifyGroupComponent,
    TeachersListComponent,
    DialogEntryComponent,
    StudentsListComponent,
    EditDialogEntryComponent,
    FilterPipe,
    DetailsDialogOverviewComponent,
    EditDialogOverviewComponent,
    StudentDatailsComponent,
    StudentDetailModalComponent,
    DashboardComponent,
    SubjectsComponent,
    NewYearComponent,
    ClassFilterPipe,
    TitlePipe,
    AddStudentModalComponent,
    AddStudentComponent,
    ModifySubjectsComponent,
    TeacherConnectionComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    FormsModule,
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
    MatInputModule,
    MatRadioModule,
    MaterialModule,
    MatSortModule,
    MatCardModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSelectModule,
    SharedModule,
    MatStepperModule
  ],
  entryComponents: [
    AddModifyGroupComponent,
    StudentDetailModalComponent,
    DetailsDialogOverviewComponent,
    EditDialogOverviewComponent,
    ModifySubjectsComponent,
    StudentDetailModalComponent,
    AddStudentComponent,
    ModifySubjectsComponent,
    ConfirmationDialogComponent
  ],
  providers: []
})
export class AdminPanelModule {}
