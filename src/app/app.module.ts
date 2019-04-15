import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { TeachersStorageService } from './services/teachers-storage.service';
import { TeachersService } from './admin-panel/teachers/teachers.service';
import { DialogOverviewExampleDialog } from './admin-panel/teachers/teachers-list/dialog/dialog-overview';
import { TeacherService } from './services/teacher.service';
import { SubjectService } from './services/subject.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    DialogOverviewExampleDialog
  ],
  entryComponents: [DialogOverviewExampleDialog],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    TeachersStorageService,
    TeachersService,
    SubjectService,
    TeacherService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'ua-UA'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
