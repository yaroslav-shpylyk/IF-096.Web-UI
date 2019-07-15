import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentBookRoutingModule } from './student-book-routing.module';
import { StudentBookComponent } from './student-book/student-book.component';
import { MaterialModule } from '../material.module';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';
import { HideZeroPipe } from './student-book/hide-zero.pipe';
import { ScoresReportComponent } from './scores-report/scores-report.component';

// For localization pipe
registerLocaleData(localeUk, 'uk-Ua');

@NgModule({
  declarations: [StudentBookComponent, HideZeroPipe, ScoresReportComponent],
  imports: [
    CommonModule,
    StudentBookRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    // MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS - to customize datePicker to UA format
    { provide: MAT_DATE_LOCALE, useValue: 'uk-UA' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: LOCALE_ID, useValue: 'uk-UA' }, // for pipe locale date
  ]
})
export class StudentBookModule {
}
